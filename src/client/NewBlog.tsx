import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import Modal, { MB, ModalProps } from "./Modal";


const NewBlog = (props: NewBlogProps) => {
    const [allAuthors, setAllAuthros] = useState<Array<A>>([]);
    const [allTags, setAllTags] = useState<Array<T>>([]);

    const [theAuthor, setTheAuthor] = useState<number>(0);
    const [theTitle, setTheTitle] = useState<string>("");
    const [theBlog, setTheBlog] = useState<string>("");
    const [theTag, setTheTag] = useState<number>(0);

    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [modalBtns, setModalBtns] = useState<MB>({ close: true, home: false });

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

    const verify = () => {
        if (theAuthor === 0) {
            setModalDisplay(true);
            setModalMessage("Please select an Author.");
            setModalBtns({ home: false, close: true, destroy: false });
        } else if (theTitle === "" || theTitle === " ") {
            setModalDisplay(true);
            setModalMessage("Please enter a Title.");
            setModalBtns({ home: false, close: true, destroy: false });
        } else if (theBlog === "" || theBlog === " ") {
            setModalDisplay(true);
            setModalMessage("Please enter a Blog.");
            setModalBtns({ home: false, close: true, destroy: false });
        } else if (theTag === 0) {
            setModalDisplay(true);
            setModalMessage("Please select a tag.");
            setModalBtns({ home: false, close: true, destroy: false });
        } else {
            postNewBlog();
        }
    };

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

            setModalDisplay(true);
            setModalMessage("New Blog Posted!");
            setModalBtns({ home: true, close: false, destroy: false });
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

    const closeModal = () => {
        setModalDisplay(false);
    }

    useEffect(() => {
        fetchAllAuthors();
        fetchAllTags();
    }, []);

    return (
        <>
            <h1>New Blog Post</h1>
            <div className="container d-flex flex-column align-items-center justify-content-center">
                <div className="col-8 d-flex flex-column align-items-center justify-content-center full-width">
                    <select id="authors" onChange={handleAuthorChange} value={theAuthor} className="full-width m-3">
                        <option value="0" disabled>-- Select Author --</option>
                        {allAuthors?.map(author => (
                            <option key={author.id} value={author.id}>{author.name}</option>
                        ))}
                    </select>
                    <label className="sr-only">Blog Title</label><input type="text" className="full-width" placeholder="Blog Title" onChange={handleTitleChange}></input>
                </div>
                <div className="p-3 full-width">
                    <label className="sr-only">Blog Content</label><textarea placeholder="Blog Content" onChange={handleBlogChange}></textarea>
                </div>
                <div className="d-flex justify-content-around justify-content-center full-width">
                    <select id="tags" onChange={handleTagChange} value={theTag} className="width-50">
                        <option value="0" disabled>-- Select a Tag --</option>
                        {allTags?.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>

                    <button onClick={verify}>Post Blog</button>
                    <Link to="/"><button>Cancel</button></Link>
                </div>
            </div>
            <Modal display={modalDisplay} btns={modalBtns} displayFunction={closeModal}>{modalMessage}</Modal>
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

interface BT { // BT is for Blog Tag --
    blogId: number,
    tagId: number
}

export default NewBlog;