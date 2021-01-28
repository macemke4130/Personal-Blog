import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Moment from 'react-moment';
import { isConstructorDeclaration } from 'typescript';

const Admin = (props: AdminProps) => {
    const { id } = useParams<{ id: string }>();
    const [allAuthors, setAllAuthros] = useState<Array<A>>([]);
    const [allTags, setAllTags] = useState<Array<T>>([]);

    const [theAuthor, setTheAuthor] = useState<number>(0);
    const [theTitle, setTheTitle] = useState<string>("");
    const [theBlog, setTheBlog] = useState<string>("");
    const [theTag, setTheTag] = useState<number>(0);

    const fetchAllAuthors = async () => {
        try {
            let r = await fetch("/api/authors/");
            let allAuthorsJson = await r.json();
            setAllAuthros(allAuthorsJson);
        } catch (e) {
            console.log("Error Fetching All Athors: " + e);
        }
    };

    const fetchAllTags = async () => {
        try {
            let r = await fetch("/api/tags");
            let allTagsJson = await r.json();
            setAllTags(allTagsJson);
        } catch (e) {
            console.log("Error Fetching All Tags: " + e);
        }
    }

    const postNewBlog = async () => {
        try {
            let blogObject: B = {
                authorid: theAuthor,
                title: theTitle,
                content: theBlog
            }

            let myMethod = {
                method: 'POST',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(blogObject)
            }
            let r = await fetch("/api/blogs/new/", myMethod);
            let newId = await r.json();
            let insertId: number = newId.insertId;
            await postBlogTag(insertId);
        } catch (e) {
            console.log("Error Posting New Blog: " + e);
        }
    }

    const postBlogTag = async (newId: number) => {
        try {
            let blogTagObject: BT = {
                blogId: newId,
                tagId: theTag
            }
            let myMethod = {
                method: 'POST',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(blogTagObject)
            }
            let r = await fetch("/api/blogtags/", myMethod);
        } catch (e) {
            console.log("Error Posting Blog Tag: " + e);
        }
    }

    const fetchThisBlog = async () => {
        try {
            let r = await fetch("/api/blogs/" + id);
            let thisBlogJson = await r.json();
            setTheAuthor(thisBlogJson.authorid);
            setTheTitle(thisBlogJson.title);
            setTheBlog(thisBlogJson.content);
        } catch (e) {
            console.log("Error Fetching Single Blog: " + e);
        }
    }

    const fetchThisTag = async () => {
        try {
            let r = await fetch("/api/blogtag/" + id);
            let theTagJson = await r.json();
            setTheTag(theTagJson.tagid);
        } catch (e) {
            console.log("Error Fetching This Tag: " + e);
        }
    }

    const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheAuthor(Number(e.target.value));
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheTitle(e.target.value);
    }

    const handleBlogChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTheBlog(e.target.value);
    }

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheTag(Number(e.target.value));
    }

    const showState = () => {
        console.log("The Author: " + theAuthor);
        console.log("The Title: " + theTitle);
        console.log("The Blog Text: " + theBlog);
        console.log("The Blog Tag: " + theTag);
    }

    useEffect(() => {
        fetchThisBlog();
        fetchThisTag();
        fetchAllAuthors();
        fetchAllTags();
    }, []);

    return (
        <>
            <h1>Admin</h1>
            <div className="container">
                <select id="authors" onChange={handleAuthorChange} value={theAuthor} >
                    <option value="0" disabled>-- Select an Author --</option>
                    {allAuthors?.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
                <label className="sr-only">Blog Title: </label><input type="text" onChange={handleTitleChange} value={theTitle}></input>
                <label className="sr-only">Chirp:</label><textarea onChange={handleBlogChange} value={theBlog}></textarea>
                <select id="tags" onChange={handleTagChange} value={theTag} >
                    <option value="0" disabled>-- Select a Tag --</option>
                    {allTags?.map(tag => (
                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                </select>
                <button onClick={postNewBlog}>Post Blog</button>
            </div>
        </>
    );
};

interface AdminProps { }

interface A { // A is for Author --
    id: number,
    name: string
}

interface B { // B is for Blog --
    authorid: number,
    title: string,
    content: string
}

interface T { // T is for Tag --
    id: number,
    name: string
}

interface BT { // BT is for Blog Tag --
    blogId: number,
    tagId: number
}

export default Admin;