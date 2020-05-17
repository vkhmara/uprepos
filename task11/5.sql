use mydb;
select name from users
where idOfUser in (
select idOfUser from posts
 group by idOfUser
 having count(idOfUser) > 3
 );