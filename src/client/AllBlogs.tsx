import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Moment from 'react-moment';

const AllBlogs = (props: AllBlogsProps) => {
    const [greeting, setGreeting] = useState<string>("Cool Blogs Dot Com");
    const [allBlogs, setAllBlogs] = useState<Array<B>>([]);
    const [empty, setEmpty] = useState<boolean>(false);

    const fetchAllBlogs = async () => {
        try {
            let r = await fetch("/api/blogs/");
            let allBlogsJson = await r.json();
            setAllBlogs(allBlogsJson);
            if (allBlogsJson.length === 0){
                setEmpty(true);
            }
        } catch (e) {
            console.log("Error Fetching All Blogs: " + e);
        }
    };

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    if (empty === true) {
        return (
            <>
                <h1>{greeting}</h1>
                <div className="container">
                    <div className="col-8">
                        <div className="card shadow m-3 p-3">
                            <h2>No Blogs!</h2>
                            <p>Post a new blog!</p>
                            <p><Link to="/new/"><button>New Blog</button></Link></p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <h1>{greeting}</h1>
                <Link to="/new/"><button>New Blog</button></Link>
                <div className="container">
                    {allBlogs?.map(blog => (
                        <div key={blog.id} className="col-8">
                            <div className="card shadow m-3 p-3">
                                <Link to={"/blogpost/" + blog.id}><h2>{blog.title}</h2></Link>
                                <small>Written by: {blog.writer}</small>
                                <p>{blog.content}</p>
                                <small>Published <Moment format="MMMM DD, YYYY H:mm">{blog._created}</Moment></small>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
};

interface AllBlogsProps { }

interface B {
    id: number,
    title: string,
    content: string,
    writer: string,
    _created: string
}

export default AllBlogs;