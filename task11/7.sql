use mydb;
select datediff(now(), min(createdAt)) as "Days from first post" from posts;