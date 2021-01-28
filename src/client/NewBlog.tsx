import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Moment from 'react-moment';

const NewBlog = (props: NewBlogProps) => {
    const [allAuthors, setAllAuthros] = useState<Array<A>>([]);
    const [allTags, setAllTags] = useState<Array<T>>([]);

    const [theTag, setTheTag] = useState<number>(0);
    const [theAuthor, setTheAuthor] = useState<number>(0);
    const [theTitle, setTheTitle] = useState<string>("Blog Title");
    const [theBlog, setTheBlog] = useState<string>("Blog Content");

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
        try {
            let r = await fetch("/api/blogs/new/", myMethod);
            let newId = await r.json();
            let insertId = newId.insertId;
            console.log(insertId);
        } catch (e) {
            console.log("Error Posting New Blog: " + e);
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
    }

    useEffect(() => {
        fetchAllAuthors();
        fetchAllTags();
    }, []);

    return (
        <>
            <h1>New Blog Post</h1>
            <div className="container">
                <select id="authors" onChange={handleAuthorChange} value={theAuthor} >
                    <option value="0" disabled>-- Select an Author --</option>
                    {allAuthors?.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
                <label className="sr-only">Blog Title: </label><input type="text" placeholder={theTitle} onChange={handleTitleChange}></input>
                <label className="sr-only">Chirp:</label><textarea placeholder={theBlog} onChange={handleBlogChange}></textarea>
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

interface NewBlogProps { }

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

export default NewBlog;