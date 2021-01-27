use blogs;

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

drop table authors;
create table authors (
	id int primary key auto_increment,
    name varchar(32) not null,
    email varchar(64) not null,
    _created datetime default current_timestamp
);
select * from authors;

drop table tags;
create table tags (
	id int primary key auto_increment,
    name varchar(32) not null,
    _created datetime default current_timestamp
);
select * from tags;

drop table blogtags;
create table blogtags (
	blogid int not null,
		foreign key(blogid) references blogs(id) on delete cascade,
    tagid int not null,
		foreign key (tagid) references tags(id) on delete cascade
);
select * from blogtags;