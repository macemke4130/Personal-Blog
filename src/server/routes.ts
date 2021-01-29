import * as express from 'express';
import db from './db';

const router = express.Router();

// Get All Blogs --
router.get('/api/blogs', async (req, res) => {
    try {
        res.json(await db.blogs.all());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Post to the Blogs table --
router.post('/api/blogs/new', async (req, res) => {
    try {
        let authorid: number = Number(req.body.authorid);
        let title: string = req.body.title;
        let content: string = req.body.content;
        
        res.json(await db.blogs.newBlog(authorid, title, content));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Post to the BlogTags table --
router.post('/api/blogtags', async (req, res) => {
    try {
        let blogId: number = Number(req.body.blogId);
        let tagId: number = req.body.tagId;
        
        res.json(await db.blogs.blogTag(blogId, tagId));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get One Blog Post --
router.get('/api/blogs/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        res.json((await db.blogs.one(id))[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get All Authors --
router.get('/api/authors', async (req, res) => {
    try {
        res.json(await db.blogs.authors());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get One Author --
router.get('/api/blogs/authors/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        res.json((await db.blogs.writer(id))[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get One BlogTag --
router.get('/api/blogtag/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        res.json((await db.blogs.theTag(id))[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get All Tags --
router.get('/api/tags', async (req, res) => {
    try {
        res.json(await db.blogs.tags());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Delete One Blog Post --
router.delete('/api/blogs/delete/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        res.json(await db.blogs.destroyBlog(id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Edit One Blog Post --
router.put('/api/blogs/update/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    let authroid: number = Number(req.body.authorid);
    let title: string = req.body.title;
    let content: string = req.body.content;
    try {
        res.json(await db.blogs.updateBlog(id, authroid, title, content));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Edit One BlogTag --
router.put('/api/blogtags/update/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    let tagId: number = Number(req.body.tagId);
    try {
        res.json(await db.blogs.updateBlogTag(id, tagId));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;