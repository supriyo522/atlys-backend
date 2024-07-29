const Post = require('../models/Post');

// Create a post
exports.createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.userId;

    try {
        const post = new Post({
            content,
            user: userId
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.userId }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(id, { content }, { new: true });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

