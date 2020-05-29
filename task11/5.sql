use mydb;
select username from users
where username in (
select username from posts
 group by username
 having count(username) > 3
 );