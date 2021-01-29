import * as React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import Moment from 'react-moment';

const OneBlog = (props: OneBlogProps) => {
    const { id } = useParams<{ id: string }>();

    const [theAuthor, setTheAuthor] = useState<string>("");
    const [theTitle, setTheTitle] = useState<string>("");
    const [theBlog, setTheBlog] = useState<string>("");
    const [theTag, setTheTag] = useState<string>("");
    const [theCreatedTime, setTheCreatedTime] = useState<string>("");
    const [theUpdatedTime, setTheUpdatedTime] = useState<string>("");

    const fetchThisBlog = async () => {
        try {
            let r = await fetch("/api/blogs/" + id);
            let thisBlogJson = await r.json();

            // Populates the Inputs with the default values --
            setTheAuthor(thisBlogJson.writer);
            setTheTitle(thisBlogJson.title);
            setTheBlog(thisBlogJson.content);
            setTheCreatedTime(thisBlogJson._created);
            setTheUpdatedTime(thisBlogJson._updated);
        } catch (e) {
            console.log("Error Fetching Single Blog: " + e);
        }
    }

    const fetchThisTag = async () => {
        try {
            let r = await fetch("/api/blogtag/" + id);
            let theTagJson = await r.json();
            

            setTheTag("");
        } catch (e) {
            console.log("Error Fetching This Tag: " + e);
        }
    }

    useEffect(() => {
        fetchThisBlog();
        fetchThisTag();
    }, []);

    return (
        <>
            <div className="container">
                <h1>{theTitle}</h1>
                <p>Written by {theAuthor}</p>
                <p><small>Published </small>{<Moment format="MMMM DD, YYYY H:mm a">{theCreatedTime}</Moment>}</p>
                {theCreatedTime != theUpdatedTime ? <p><small>Updated </small>{<Moment format="MMMM DD, YYYY H:mm a">{theUpdatedTime}</Moment>}</p> : ""}
                <p>{theBlog}</p>
                <p>Filed under {theTag}</p>
                <Link to="/"><button>Home</button></Link>
                <Link to={"/admin/" + id}><button>Admin</button></Link>
            </div>
        </>
    );
};

interface OneBlogProps { }

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

export default OneBlog;