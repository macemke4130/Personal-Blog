import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Moment from 'react-moment';

const NewBlog = (props: NewBlogProps) => {
    const [allAuthors, setAllAuthros] = useState<Array<A>>([]);
    const [theAuthor, setTheAuthor] = useState<number>(0);
    const [theTitle, setTheTitle] = useState<string | null>("Blog Title");
    const [theBlog, setTheBlog] = useState<string | null>("Blog Content");
    
    const fetchAllAuthors = async () => {
        try {
            let r = await fetch("/api/authors/");
            let allAuthorsJson = await r.json();
            setAllAuthros(allAuthorsJson);
        } catch (e) {
            console.log("Error Fetching All Athors: " + e);
        }
    };
    const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheAuthor(Number(e.target.value));
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheTitle(e.target.value); 
    }

    const handleBlogChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTheBlog(e.target.value);
    }

    const showState = () => {
        console.log("The Author: " + theAuthor);
        console.log("The Title: " + theTitle);
        console.log("The Blog Text: " + theBlog);
    }

    useEffect(() => {
        fetchAllAuthors();
    }, []);

    return (
        <>
            <h1>New Blog Post</h1>
            <div className="container">
                <select id="authors" onChange={handleAuthorChange} >
                    <option value="0">-- Select an Author --</option>
                    {allAuthors?.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
                <label className="sr-only">Blog Title: </label><input type="text" placeholder={theTitle} onChange={handleTitleChange}></input>
                <label className="sr-only">Chirp:</label><textarea placeholder={theBlog} onChange={handleBlogChange}></textarea>
                <button onClick={showState}>Show State</button>
            </div>
        </>
    );
};

interface NewBlogProps { }

interface A {
    id: number,
    name: string
}

export default NewBlog;