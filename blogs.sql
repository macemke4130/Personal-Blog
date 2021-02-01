use blogs;

create user 'blogsapp'@'localhost' identified by 'root';
GRANT ALL ON blogs.* TO 'blogsapp'@'localhost';

drop table blogs;
create table blogs (
	id int primary key auto_increment,
	title varchar(32) not null,
	content varchar(10000) not null,
	authorid int not null,
	_created timestamp default current_timestamp,
    _updated timestamp default current_timestamp on update current_timestamp
);

drop table authors;
create table authors (
	id int primary key auto_increment,
    name varchar(32) not null,
    email varchar(64) not null,
    _created datetime default current_timestamp
);

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

insert into tags (name) values
("Bikes"), ("Locks"), ("Dance"), ("Coffee"), ("Code"), ("Satan"), ("Tools"), ("Punk Rock");

drop table blogtags;
create table blogtags (
	blogid int not null,
		foreign key(blogid) references blogs(id) on delete cascade,
    tagid int not null,
		foreign key (tagid) references tags(id) on delete cascade
);

drop procedure readOnly;
delimiter //
create procedure readOnly (in x int)
begin
SELECT 
    blogs.*,
    GROUP_CONCAT(tags.name
        SEPARATOR ';;') AS tags,
	GROUP_CONCAT(authors.name
		SEPARATOR ';;') AS writer
FROM
    blogs
        JOIN
    blogtags ON blogtags.blogid = blogs.id
        JOIN
    tags ON tags.id = blogtags.tagid
		JOIN
	authors ON authors.id = blogs.authorid
		
GROUP BY blogs.id having blogs.id = x;
end //
delimiter ;