import { Query } from './index';

const all = async () => Query("select blogs.id, blogs.title, blogs.content, blogs._created, authors.name as writer from blogs inner join authors on blogs.authorid = authors.id");
const one = async (id: number) => Query("Select * from blogs where id = ?", [id]);
const authors = async () => Query("Select id, name from authors");
const tags = async () => Query("Select id, name from tags");
const writer = async (id: number) => Query("Select name from authors where id = ?", [id]);
const newBlog = async (title: string, content: string, authorid: number, ) => Query("Insert into blogs (title, content, authorid) values (?, ?, ?)", [title, content, authorid]);

export default {
    all,
    one,
    authors,
    writer,
    tags,
    newBlog
}