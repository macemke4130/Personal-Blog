import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const AllBlogs = (props: AllBlogsProps) => {
	const [greeting, setGreeting] = useState<string>('All Blogs');

	return (
		<h1>{greeting}</h1>
	);
};

interface AllBlogsProps { }

export default AllBlogs;