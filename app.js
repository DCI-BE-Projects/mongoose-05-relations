import express from "express";
import User from './models/user.js';
import Post from './models/post.js';

const app = express();
app.use(express.json());

// get all users
// curl http://localhost:4000/users
app.get('/users', async (_, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
})

// Get user by id
// curl http://localhost:4000/users/65ddecedd5443dc5d0538bbf?include=posts
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = User.findById(id);

        if (req.query.include === 'posts') {
            query.populate('posts');
        }

        // Execute the query
        const user = await query.exec();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Soemthing went wrong!' });
    }
})

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const query = Post.find();

        if (req.query.include === 'owner') {
            query.populate('owner');
        }

        // Execute the query
        const posts = await query.exec();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
})

export default app;