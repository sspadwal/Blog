import express from 'express';
import cors from 'cors';
import { mongoose } from 'mongoose';
import { User } from './models/User.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs'
import { Post } from './models/Post.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadMiddleware = multer({ dest: 'uploads/' })
const secret = "adefr4409t58590656kdfdkl"
const app = express();



app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'));
mongoose.connect('mongodb://localhost:27017/Blog')


app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);
        const userDoc = await User.create({
            username,
            password: hash_password
        })
        res.json(userDoc)

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json(error)
    }


})


app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    try {

        const userDoc = await User.findOne({ username })
        if (userDoc == null) {
            res
                .status(404)
                .json("user not found")
        }

        else {
            const passOk = await bcrypt.compareSync(password, userDoc.password)

            if (passOk) {
                jwt.sign({ username, _id: userDoc._id }, secret, {}, (err, token) => {

                    if (err) throw err
                    res.cookie('token', token).json({
                        id: userDoc._id,
                        username
                    })
                    res.cookie('token', token).json("ok")

                })
            }
            else {
                // alert("wrong Credentials")
                res
                    .status(400)
                    .json("Wrong Credentials")
            }
        }
    } catch (error) {
        console.log("catch error", error);
    }

})

app.get('/profile', (req, res) => {

    const { token } = req.cookies;
    console.log(token);
    jwt.verify(token, secret, {}, (err, info) => {

        if (err) throw err
        res.json(info);

    })

})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {

    const { originalname, path } = req.file
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)


    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        
        if (err) throw err
        const { title, summary, content } = req.body;
        const PostDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info._id
        })

        res.json(PostDoc);
    })

})


app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        newPath = path + '.' + ext
        fs.renameSync(path, newPath)
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;

        try {
            const postDoc = await Post.findById(id);
            if (!postDoc) {
                return res.status(404).json({ error: 'Post not found' });
            }

            if (postDoc.author.toString() !== info._id.toString()) {
                return res.status(403).json({ error: 'You are not the author of this post' });
            }

            postDoc.title = title;
            postDoc.summary = summary;
            postDoc.content = content;
            if (newPath) {
                postDoc.cover = newPath;
            }
            await postDoc.save();
            res.json(postDoc);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});


app.get('/post', async (req, res) => {
    const post = await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20)
    res.json(post)
})


app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id)
        .populate('author', ['username'])
    res.json(postDoc)

})
app.listen(3000, () => {
    console.log("Listening");
});