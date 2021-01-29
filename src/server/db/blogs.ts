import { Query } from './index';

const all = async () => Query("select blogs.id, blogs.title, blogs.content, blogs._created, authors.name as writer from blogs inner join authors on blogs.authorid = authors.id order by id desc");
const one = async (id: number) => Query("Select * from blogs where id = ?", [id]);
const authors = async () => Query("Select id, name from authors");
const tags = async () => Query("Select id, name from tags");
const writer = async (id: number) => Query("Select name from authors where id = ?", [id]);
const newBlog = async (authorid: number, title: string, content: string, ) => Query("Insert into blogs (authorid, title, content) values (?, ?, ?)", [authorid, title, content]);
const blogTag = async (blogid: number, tagid: number) => Query("Insert into blogtags (blogid, tagid) values (?, ?)", [blogid, tagid]);
const destroyBlog = async (id: number) => Query("Delete from blogs where id = ?", [id]);
const theTag = async (id: number) => Query("Select tagid from blogtags where blogid = ?", [id]);
const updateBlog = async (id: number, authorid: number, title: string, content: string) => Query("Update blogs set authorid = ?, title = ?, content = ? where id = ?", [authorid, title, content, id]);
const updateBlogTag = async (id: number, tagId: number) => Query("Update blogtags set tagid = ? where blogid = ?", [tagId, id]);

export default {
    all,
    one,
    authors,
    writer,
    tags,
    newBlog,
    blogTag,
    destroyBlog,
    theTag,
    updateBlog,
    updateBlogTag
}