import * as express from 'express';
import db from './db';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/blogs', async (req, res) => {
    try {
        res.json(await db.blogs.all());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

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

router.get('/api/blogs/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        res.json((await db.blogs.one(id))[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/authors', async (req, res) => {
    try {
        res.json(await db.blogs.authors());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/blogs/authors/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        res.json((await db.blogs.writer(id))[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/tags', async (req, res) => {
    try {
        res.json(await db.blogs.tags());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;