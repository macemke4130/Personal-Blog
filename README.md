Your Personal Blog
The purpose of this lab is to make a your own personal blog .. full stack! You'll use everything you've learned from the Database lectures to make a schema, connect it to your Express server, write REST API Endpoints to get your data, and display it all using React. Let's crush it!

Steps
Database
Create a new database named blogs.
Create the following tables:
Blogs (
   id
   title
   content
   authorid
   _created
) 

Authors (
   id
   name
   email
   _created
)

Tags (
   id
   name
   _created
) 

BlogTags (
   blogid 
   tagid
)
Create a stored procedure named spBlogTags to pull back the tag of a blog.
Must have one parameter: blogid
Hint: You only need to join BlogTags and Tags
Create a new user with privileges for your Blogs database
Express API
Install mysql and its typings into your project
Make sure your project runs via npm run dev and going to localhost:3000/
Set up your database config, and don't forget to include it in your .gitignore!
Use your config object to connect to your mysql database.
Write your DB queries and REST API Endpoints to:
GET all Blogs
GET one Blog
POST a new Blog, with at least one tag
Hint: Your blog insert will result in an id response from mysql, use that to insert your blog id and tag id into your blogtags table!
PUT to edit a Blog
DELETE to delete a blog
GET all Blogtags for a blogid
React Frontend
Create a component to display all Blogs
Create a component to show one Blog
Add a button that links to another component to edit this Blog
The Edit Blog component should allow you to save any edits to your Blog, or delete that Blog
Create a component to add a new Blog post
Hint: Use a select element with options to handle adding a tag to your new Blog post
The all Blogs component should display previews of the blog posts that a user can click on, which would navigate to the single Blog component that would display all the information of the Blog post. Don't forget to use your blog tags at least on the single Blog component!