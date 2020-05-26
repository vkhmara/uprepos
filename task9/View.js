(function() {
	class Post {
    constructor(id, author, createdAt, description, hashTags=[], photoLink="", likes = []) {
        this.id = id;
        this.author = author;
        this.createdAt = createdAt;
        this.description = description;
        this.hashTags = hashTags;
        this.photoLink = photoLink;
        this.likes=likes;
    }

    output() {
        document.write('ID:' + this.id +
            '<br \/>author:' + this.author +
            '<br \/>Created at:' + this.createdAt+'<br \/>'+
            'Description:\"' + this.description+'\"<br \/><br \/>');
    }

    takeLike(authorOfLike) {
        let index = this.likes.indexOf(authorOfLike);
        if (index === -1) {
            this.likes.push(authorOfLike);
        }
        else {
            this.likes.splice(index, 1);
        }
    }

    countOfLikes() {
        return this.likes.length;
    }

}

let posts = [
    new Post("1", "incredible2",  new Date('2020-06-24T22:47:41'), "Hello"),
    new Post("2", "incredible6",  new Date('2020-09-22T06:18:04'), "Hello"),
    new Post("3", "incredible12", new Date('2020-02-08T01:05:05'), "Hello"),
    new Post("4", "incredible20", new Date('2020-01-14T14:55:11'), "Hello"),
    new Post("5", "incredible30", new Date('2020-05-09T14:24:51'), "Hello"),
    new Post("6", "incredible42", new Date('2020-12-28T20:21:22'), "Helloo", [], "avatarko_anonim.jpg"),
    new Post("7", "incredible3",  new Date('2020-10-26T11:06:47'), "Hello"),
    new Post("8", "incredible19", new Date('2020-07-13T19:47:52'), "Hello, it's me."),
    new Post("9", "incredible37", new Date('2020-10-29T02:51:23'), "Hello"),
    new Post("10", "incredible4",  new Date('2020-05-08T07:21:44'), "Hello"),
    new Post("11", "incredible26", new Date('2020-10-17T22:44:47'), "Hello"),
    new Post("12", "incredible50", new Date('2020-11-09T21:23:19'), "Hello"),
    new Post("13", "incredible23", new Date('2020-01-16T14:35:16'), "Hello"),
    new Post("14", "incredible51", new Date('2020-05-09T14:40:46'), "Hello"),
    new Post("15", "incredible28", new Date('2020-11-02T02:45:26'), "Hello"),
    new Post("16", "incredible7",  new Date('2020-09-05T21:06:50'), "Hello"),
    new Post("17", "incredible41", new Date('2020-01-03T12:23:09'), "Hello"),
    new Post("18", "incredible24", new Date('2020-05-12T08:46:20'), "Hello"),
    new Post("19", "incredible9",  new Date('2020-06-14T02:39:24'), "Hello"),
    new Post("20", "incredible49", new Date('2020-06-20T18:38:58'), "Hello"),
    new Post("21", "incredible4",  new Date('2020-08-16T00:27:58'), "Hello182", ["#hello"]),
    new Post("22", "incredible4",  new Date('2020-10-13T00:22:08'), "Hello707", ["#hello"]),
    new Post("23", "incredible4",  new Date('2020-11-10T11:57:09'), "Hello46"),
    new Post("24", "incredible4",  new Date('2020-12-07T10:14:22'), "Hello111"),
    new Post("25", "incredible4",  new Date('2020-12-15T02:38:40'), "Hello481"),
    new Post("26", "incredible4",  new Date('2020-01-05T17:41:38'), "Hello211"),
    new Post("27", "incredible4",  new Date('2020-06-07T13:53:03'), "Hello154", ["#hello", "#hai"]),
    new Post("28", "incredible4",  new Date('2020-01-23T12:15:11'), "Hello564"),
    new Post("29", "incredible4",  new Date('2020-07-05T20:30:55'), "Hello931"),
    new Post("30", "incredible4",  new Date('2020-04-25T00:08:16'), "Hello990"),
    new Post("31", "incredible5",  new Date('2020-07-10T09:20:03'), "Hello633"),
    new Post("32", "incredible5",  new Date('2020-09-27T18:55:54'), "Hello468"),
    new Post("33", "incredible5",  new Date('2020-12-27T12:39:01'), "Hello530", ["#hai"]),
    new Post("34", "incredible5",  new Date('2020-12-20T18:54:23'), "Hello927", ["#ni hao"]),
    new Post("35", "incredible5",  new Date('2020-07-19T11:25:13'), "Hello549"),
    new Post("36", "incredible5",  new Date('2020-10-26T04:03:24'), "Hello616"),
    new Post("37", "incredible5",  new Date('2020-12-23T17:20:30'), "Hello682"),
    new Post("38", "incredible5",  new Date('2020-07-28T00:46:26'), "Hello208"),
    new Post("39", "incredible5",  new Date('2020-10-22T02:59:26'), "Hello940"),
    new Post("40", "incredible5",  new Date('2020-03-15T21:40:13'), "Hello999")
];

class EditInfo{
    constructor(description, hashTags = [], photoLink="") {
        this.description = description;
        this.hashTags = hashTags;
        this.photoLink = photoLink;
    }
}

class DateInterval {
    constructor (left, right) {
        this.left = left;
        this.right = right;
    }
}

class FilterParams {
    constructor (author, dateInterval=null, hashTags=[]) {
        this.author = author;
        this.dateInterval = dateInterval;
        this.hashTags = hashTags;
    }
}

function printSpace() {
    document.write('<br\/>');
}

function outputAllPosts(arrayPosts) {

    if (arrayPosts.length === 0) {
        document.write("No any posts");
    }

    else {
        arrayPosts.forEach(p=>p.output());
    }
}

function printLengthOfArray(arr) {
    document.write('The length of posts ' + arr.length + '<br\/>');
}

class PostContainer {

    constructor(posts) {
        this._posts = posts;
    }

    get posts() {
        return this._posts;
    }

    set posts(arr) {
        this._posts = arr;
    }

    static liesInInterval(date, dateInterval) {
        return dateInterval == null || dateInterval.left <= date && date <= dateInterval.right;
    }

    static hasAnyTag(hashTagsOfPost, hashTags) {
        return hashTagsOfPost.some(hashTagOfPost => (hashTags.includes(hashTagOfPost)));
    }

    static compDates(x, y) {
        return y.createdAt - x.createdAt;
    }

    static isTag(str) {
        return str[0] === '#';
    }

    static isString(obj) {
        return typeof obj == 'string';
    }

    static rightDate(date) {
        return date.getHours() >= 0 && date.getHours() <= 23 &&
            date.getMinutes() >= 0 && date.getMinutes() <= 59 &&
            date.getSeconds() >= 0 && date.getSeconds() <= 59;
    }

    copyPost(post) {
        let copy = new Post();
        Object.assign(copy, post);
        return copy;
    }

    getPostsByFilter(filterConfig) {
        if (filterConfig == null) {
            return posts;
        }
        return this.posts.filter(element =>
            (!filterConfig.author || element.author === filterConfig.author) &&
            (!filterConfig.dateInterval || PostContainer.liesInInterval(element.createdAt, filterConfig.dateInterval)) &&
            (!filterConfig.hashTags || PostContainer.hasAnyTag(element.hashTags, filterConfig.hashTags))
        );
    }

    getPostsByFilterFromInterval(filterConfig, skip = 0, count = 10) {
        if (skip < 0 || count <= 0) {
            return [];
        }
        let postsByFilter = this.getPostsByFilter(filterConfig).sort(PostContainer.compDates);
        return postsByFilter.slice(skip, skip + count);
    }

    getPostsFromInterval(skip = 0, count = 10) {
        return this.getPostsByFilterFromInterval(null, skip, count);
    }

    getPost(ID) {
        return this.posts.find(item => item.id === ID);
    }

    static validatePost(somePost) {
        return PostContainer.isString(somePost.description) &&
            somePost.description.length > 0 && somePost.description.length < 200 &&
            PostContainer.isString(somePost.author) && somePost.author.length > 0 &&
            somePost.hashTags.every(PostContainer.isTag) &&
            somePost.hashTags.every(PostContainer.isString) && somePost.likes.every(PostContainer.isString) &&
            somePost.createdAt instanceof Date && this.rightDate(somePost.createdAt);
    }

    addPost(somePost) {
        if (!PostContainer.validatePost(somePost)) {
            return false;
        }
        this.posts.push(this.copyPost(somePost));
        return true;
    }

    editPost(ID, edit) {
        let index = this.posts.findIndex(item => item.id === ID);

        if (index === -1) {
            return false;
        }

        let edPost = this.copyPost(this.posts[index]);

        if (edit.description) {
            edPost.description = edit.description;
        }

        if (edit.hashTags && edit.hashTags.length) {
            edPost.hashTags = edit.hashTags;
        }

        if (edit.photoLink) {
            edPost.photoLink = edit.photoLink;
        }
				

        if (!this.validatePost(edPost)) {
            return false;
        }

        this.posts[index] = edPost;
        return true;
    }

    removePost(ID) {
        let index = this.posts.findIndex(item => item.id === ID);

        if (index === -1) {
            return false;
        }

        this.posts.splice(index, 1);
        return true;
    }

    addAll(arrayPosts) {
        return arrayPosts.reduce((acc, curr) => {
            if (!this.addPost(curr)) {
                acc.push(curr)
            }
            return acc;
        }, []);
    }

    takeLike(ID, authorOfLike) {
        this.getPost(ID).takeLike(authorOfLike);
    }

    size() {
        return this.posts.length;
    }

}

class User {
    constructor(username, photoLink) {
        this.username = username;
        this.photoLink = photoLink;
    }
}

let postContainer = new PostContainer(posts);

class ViewPosts {

    constructor(posts, user = null) {
        this.posts = posts;
        this.count = 0;
        this.user = user;
    }

    changeCollection(posts) {
        this.posts = posts;
        this.feed.innerHTML = "";
    }

    changeUser(user = null) {
        this.user = user;
        this.viewHeader();
        this.viewMainPage();
    }

    viewHeader() {
        if (this.user == null) {
            this.leftBlock.innerHTML = `
			<button class="Main">
				Main
			</button>

			<button class="search_post">
				search post
			</button>`;
            this.rightBlock.innerHTML = `
			<button class="login">
				log in
			</button>
			<div style="font-size:20px;padding:3px;margin-left:5px;">
				or
			</div>
			<button class="sign_up">
				sign up
			</button>`;
        } else {
            this.leftBlock.innerHTML = `
			<button class="Main">
				Main
			</button>

			<button class="search_post">
				search post
			</button>

			<button class="publish_post">
				publish post
			</button>`;
            this.rightBlock.innerHTML = `
			<img src="${this.user.photoLink}" class="profile_photo">

			<span class="profile_name">
				${this.user.username}
			</span>

			<button class="logout">
				log out
			</button>`;
        }
    }

    initElems() {
        this.feed = document.getElementById("feed");

        this.header = document.getElementById("header");

        this.leftBlock = document.getElementById("left_block");

        this.rightBlock = document.getElementById("right_block");

        this.nextPostsButton = document.createElement("button");
        this.nextPostsButton.className = "next_posts";
        this.nextPostsButton.innerHTML = "next<br>posts";

        this.noPostsInscription = document.createElement("div");
        this.noPostsInscription.innerHTML = "No such posts";
    }

    static getDateForPost(date) {
        let str = "";
        let num = date.getDate();
        if (num < 10) {
            str += "0";
        }
        str += num + ".";
        num = date.getMonth();
        if (num < 9) {
            str += "0";
        }
        str += (num + 1) + ".";
        return str + date.getFullYear();
    }

    static getTimeForPost(date) {
        let str = "";
        let num = date.getHours();
        if (num < 9) {
            str += "0";
        }
        str += num + ":";
        num = date.getMinutes();
        if (num < 9) {
            str += "0";
        }
        return str + date.getMinutes();
    }

    static hashTagsInNewLines(hashTags) {
        if (hashTags.length != 0) {
            return hashTags.reduce((acc, curr) => acc + curr + "<br>");
        }
        return "";
    }

    addPostToFeed(post, feed) {

        let newPost = document.createElement("div");
        let date = post.createdAt;
        newPost.className = "post";
        newPost.setAttribute("id", post.id);
        newPost.innerHTML = `
   <div class="header_post">

     <div class="user_of_post">

       <img src="avatarko_anonim.jpg" class="avatar">

       <div class="username">
         ${post.author}
       </div>
     </div>

     <div class="date_and_time">
         <div class="date">
           ${ViewPosts.getDateForPost(date)}
         </div>

         <div class="time">
           ${ViewPosts.getTimeForPost(date)}
         </div>
      </div>

			<div class="edit_block">
			</div>

   </div>

   <div class="text_of_post" id="text_of_post">
     ${post.description}
   </div>

   <div class="tags">
     ${ViewPosts.hashTagsInNewLines(post.hashTags)}
   </div>

   <div class="likes">

     <div class="count_of_likes">
       ${post.countOfLikes()}
     </div>

     <button class="imglike">
       <img src="like.png" width="100%" height="100%">
     </button>
   </div>`;
        if (this.user != null && this.user.username === post.author) {
            newPost.querySelector(".edit_block").innerHTML = `
		 <div class="edit">
			 <button class="button_of_edit_block">
				 Edit
			 </button>
		 </div>

		 <div class="delete">
			 <button class="button_of_edit_block">
				 Delete
			 </button>
		 </div>`;
        }
        if (post.photoLink != "") {
            let photo = document.createElement("img");
            photo.setAttribute("src", `${post.photoLink}`);
            photo.className = "img_of_post";
            newPost.querySelector(".text_of_post").appendChild(photo);
        }

        this.feed.insertBefore(newPost, this.nextPostsButton);
    }

    changePost(id, edit) {
        if (!this.posts.editPost(id, edit)) {
            return;
        }
        let post = document.getElementById(id);

        if (post != null) {
            post.querySelector(".tags").innerHTML
                = ViewPosts.hashTagsInNewLines(edit.hashTags);
            post.querySelector(".text_of_post").innerHTML = edit.description;
        }
    }

    removePost(id) {
        this.posts.removePost(id);
        let post = document.getElementById(id);
        if (post != null) {
            post.remove();
            this.count -= 1;
        }
    }

    viewNextPosts() {
        let postsToView = postContainer.getPostsFromInterval(this.count, 10);
        postsToView.forEach(item => this.addPostToFeed(item, this.feed));
        this.count += 10;
        if (this.count >= this.posts.size()) {
            this.feed.removeChild(this.nextPostsButton);
        }
    }

    viewMainPage() {
        this.feed.innerHTML = "";
        this.count = 0;
        if (this.posts.length === 0) {
            this.feed.appendChild(this.noPostsInscription);
        } else {
            this.feed.appendChild(this.nextPostsButton);
            this.viewNextPosts();
        }
    }
}

view = new ViewPosts(postContainer, new User("incredible5", "ava.jpg"));
view.initElems();
view.viewMainPage();
}
)();
