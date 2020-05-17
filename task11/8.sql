use mydb;
select name from users
where idOfUser in (
select idOfUser from posts
where datediff(createdAt, now())=0
 group by idOfUser
 having count(idOfUser) > 3
);