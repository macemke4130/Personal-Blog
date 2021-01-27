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

router.get('/api/tags', async (req, res) => {
    try {
        res.json(await db.blogs.tags());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;