use mydb;
select username, count(username) as "count of posts" from posts
where createdAt between "2020-03-01 00:00:00" and "2020-03-01 23:59:59"
group by username;