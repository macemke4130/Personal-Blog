import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Moment from 'react-moment';

const NewBlog = (props: NewBlogProps) => {
    const [allAuthors, setAllAuthros] = useState<Array<A>>([]);
    
    let theAuthor: number | null = null;

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
        theAuthor = Number(e.target.value);
        console.log(theAuthor);
    }

    useEffect(() => {
        fetchAllAuthors();
    }, []);

    return (
        <>
            <h1>New Blog Post</h1>
            <div className="container">
                <select id="authors" onChange={handleAuthorChange} value="null">
                    <option value="null" disabled>-- Select an Author --</option>
                    {allAuthors?.map(author => (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    ))}
                </select>
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