use blogs;

create user 'blogsapp'@'localhost' identified by 'root';
GRANT ALL ON blogs.* TO 'blogsapp'@'localhost';

drop table blogs;
create table blogs (
	id int primary key auto_increment,
	title varchar(32) not null,
	content varchar(10000) not null,
	authorid int not null,
	_created datetime default current_timestamp,
    _updated datetime default current_timestamp on update current_timestamp
);
select * from blogs;
update blogs set content = "The World Sucks" where id = 1;
insert into blogs (title, content, authorid) values ("Test One", "<h1>The World Sucks</h1>", 1);

drop table authors;
create table authors (
	id int primary key auto_increment,
    name varchar(32) not null,
    email varchar(64) not null,
    _created datetime default current_timestamp
);
select * from authors;
insert into authors (name, email) values
("Mace", "lucasmace4130@gmail.com"),
("Maria", "ilikedance@gmail.com"),
("Tony", "ipicklocks@gmail.com"),
("Billy", "ifixshocks@gmail.com")
;

drop table tags;
create table tags (
	id int primary key auto_increment,
    name varchar(32) not null,
    _created datetime default current_timestamp
);
select * from tags;
insert into tags (name) values
("Bikes"), ("Locks"), ("Dance"), ("Coffee"), ("Code"), ("Satan"), ("Tools"), ("Punk Rock");

drop table blogtags;
create table blogtags (
	blogid int not null,
		foreign key(blogid) references blogs(id) on delete cascade,
    tagid int not null,
		foreign key (tagid) references tags(id) on delete cascade
);
select * from blogtags;

select blogs.id, blogs.title, blogs.content, blogs._created, blogs._updated, authors.name as writer from blogs inner join authors on blogs.authorid = authors.id where blogs.id = 8;