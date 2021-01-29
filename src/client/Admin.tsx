import * as React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import Moment from 'react-moment';

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

    const submitEdit = async () => {
        submitTagEdit();
        try {
            let blogObject: B = {
                authorid: theAuthor,
                title: theTitle,
                content: theBlog
            }

            let myMethod = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(blogObject)
            }
            let r = await fetch("/api/blogs/update/" + id, myMethod)
                .then((res) => {
                    if (res.ok) {
                        console.log("Call Modal.");
                    }
                });
        } catch (e) {
            console.log("Error Updating Blog: " + e);
        }
    }

    const submitTagEdit = async () => {
        try {
            let blogTagObject: BT = {
                blogId: Number(id),
                tagId: theTag
            }
            let myMethod = {
                method: 'PUT',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(blogTagObject)
            }
            let r = await fetch("/api/blogtags/update/" + id, myMethod);
        } catch (e) {
            console.log("Error Updating Blog Tag: " + e);
        }
    }

    const fetchThisBlog = async () => {
        try {
            let r = await fetch("/api/blogs/" + id);
            let thisBlogJson = await r.json();

            // Populates the Inputs with the default values --
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

            // Populates the Tags <select> with the default value --
            setTheTag(theTagJson.tagid);
        } catch (e) {
            console.log("Error Fetching This Tag: " + e);
        }
    }

    const destroyBlogCatch = () => {
        destroyBlogConfirm();
    }

    const destroyBlogConfirm = async () => {
        try {
            let myMethod = { method: 'DELETE' };
            let r = await fetch("/api/blogs/delete/" + id, myMethod);
            console.log("Deleted?");
        } catch (e) {
            console.log("Error Destorying Blog: " + e);
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
                <Link to="/"><button>Cancel Edit</button></Link>
                <button onClick={submitEdit}>Submit Blog Edit</button>
                <button onClick={destroyBlogCatch}>Delete Blog</button>
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