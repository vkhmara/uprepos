use mydb;
select * from posts
where idOfUser = "6" and position("hello" in description) <> 0;