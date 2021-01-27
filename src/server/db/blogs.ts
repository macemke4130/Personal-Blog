import { Query } from './index';

const all = async () => Query("Select * from blogs");
const one = async (id: number) => Query("Select * from blogs where id = ?", [id]);
const authors = async () => Query("Select id, name from authors");
const tags = async () => Query("Select id, name from tags");

export default {
    all,
    one,
    authors,
    tags
}