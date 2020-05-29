use mydb;
select username from users
where username in (
select username from posts
where datediff(createdAt, now())=0
 group by username
 having count(username) > 3
);