import { Query } from './index';

const all = async () => Query("select blogs.id, blogs.title, blogs.content, blogs._created, authors.name as writer from blogs inner join authors on blogs.authorid = authors.id order by id desc");
const one = async (id: number) => Query("Select * from blogs where id = ?", [id]);
const authors = async () => Query("Select id, name from authors");
const tags = async () => Query("Select id, name from tags");
const writer = async (id: number) => Query("Select name from authors where id = ?", [id]);
const newBlog = async (authorid: number, title: string, content: string, ) => Query("Insert into blogs (authorid, title, content) values (?, ?, ?)", [authorid, title, content]);

export default {
    all,
    one,
    authors,
    writer,
    tags,
    newBlog
}