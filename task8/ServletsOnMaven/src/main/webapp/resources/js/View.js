class Post {
	constructor(id, author, createdAt, description, hashTags = [], likes = []) {
		this.id = id;
		this.author = author;
		this.createdAt = createdAt;
		this.description = description;
		this.hashTags = hashTags;
		this.likes = likes;
	}

	takeLike(idOfAuthorOfLike) {
		let index = this.likes.indexOf(idOfAuthorOfLike);
		if (index === -1) {
			this.likes.push(idOfAuthorOfLike);
			return 1;
		} else {
			this.likes.splice(index, 1);
			return -1;
		}
	}

	hasLike(idOfUser) {
	    return this.likes.indexOf(idOfUser) !== -1;
    }

	countOfLikes() {
		return this.likes.length;
	}
}

class EditInfo{
	constructor(description, hashTags = []) {
		this.description = description;
		this.hashTags = hashTags;
	}
}

class DateInterval {
	constructor (left, right) {
		this.left = left;
		this.right = right;
	}
}

class FilterParams {
	constructor (author, dateInterval, hashTags=[]) {
		this.author = author;
		this.dateInterval = dateInterval;
		this.hashTags = hashTags;
	}

	validate() {
		return (this.hashTags.length === 0 || this.hashTags.every(item => item !== "" && item[0]==='#'))
			&& !isNaN(this.dateInterval.left) && !isNaN(this.dateInterval.right);
	}
}

class PostContainer {

    constructor(posts = []) {
        this._posts = posts;
    }

    get posts() {
        return this._posts;
    }

    set posts(arr) {
        this._posts = arr;
    }

    liesInInterval(date, dateInterval) {
        return dateInterval == null || (dateInterval.left <= date && date <= dateInterval.right);
    }

    hasAnyTag(hashTagsOfPost, hashTags) {
        return hashTags.length === 0
            || hashTagsOfPost.some(hashTagOfPost => hashTags.includes(hashTagOfPost));
    }

    compDates(x, y) {
        return y.createdAt - x.createdAt;
    }

    isTag(str) {
        return str[0] === '#';
    }

    isString(obj) {
        return typeof obj == 'string';
    }

    rightDate(date) {
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
            return this.posts;
        }
        return this.posts.filter(element =>
            (!filterConfig.author || element.author === filterConfig.author) &&
            (!filterConfig.dateInterval || this.liesInInterval(element.createdAt, filterConfig.dateInterval)) &&
            (!filterConfig.hashTags || this.hasAnyTag(element.hashTags, filterConfig.hashTags))
        );
    }

    getPostsByFilterFromInterval(filterConfig, skip = 0, count = 10) {
        if (skip < 0 || count <= 0) {
            return [];
        }
        let postsByFilter = this.getPostsByFilter(filterConfig).sort(this.compDates);
        return postsByFilter.slice(skip, skip + count);
    }

    getPostsFromInterval(skip = 0, count = 10) {
        return this.getPostsByFilterFromInterval(null, skip, count);
    }

    getPost(ID) {
        return this.posts.find(item => item.id === ID);
    }

    validatePost(somePost) {
        return this.isString(somePost.description) &&
            somePost.description.trim().length > 0 && somePost.description.length < 200 &&
            this.isString(somePost.author) && somePost.author.length > 0 &&
            somePost.hashTags.every(this.isTag) &&
            somePost.hashTags.every(this.isString) && somePost.likes.every(this.isString) &&
            somePost.createdAt instanceof Date && this.rightDate(somePost.createdAt);
    }

    addPost(somePost) {
        if (!this.validatePost(somePost)) {
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
            edPost.description = edit.description.trim();
        }

        if (edit.hashTags) {
            edPost.hashTags = [];
            edit.hashTags.forEach(item => edPost.hashTags.push(item));
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

    takeLike(ID, idOfAuthorOfLike) {
        return this.getPost(ID).takeLike(idOfAuthorOfLike);
    }

    size() {
        return this.posts.length;
    }
}

class User {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	copyUser(user) {
		this.username = user.username;
		this.password = user.password;
	}
}

/*(function fullingStorage() {
	postsArray.forEach(item => {
		idsOfPosts.push(item.id);
		localStorage.setItem("Post with id=" + item.id, JSON.stringify(item));
	});
	localStorage.setItem("IDs of posts", JSON.stringify(idsOfPosts));
	postsArray.forEach(x=>{
		if (!users.has(x.author)) {
			users.set(x.author, new User(x.author, x.author));
		}
	});
	localStorage.setItem("Users", JSON.stringify(Array.from(users)));
	localStorage.setItem("Current user", JSON.stringify(null));
	localStorage.setItem("Count of posts in feed", "10");
	localStorage.setItem("IDs of current feed", JSON.stringify(idsOfPosts));
})();*/

let users = new Map();
let idsOfPosts = [];
let postsArray = [];
let idsOfCurrentFeed = [];

function loadPostFromStorage(id) {
	let post = JSON.parse(localStorage.getItem("Post with id=" + id));
	return new Post(post.id, post.author, new Date(post.createdAt), post.description, post.hashTags, post.likes)
}

(function loadInfoFromStorage() {
	idsOfPosts = JSON.parse(localStorage.getItem("IDs of posts"));
	idsOfCurrentFeed = JSON.parse(localStorage.getItem("IDs of current feed"));
	idsOfPosts.forEach(id => postsArray.push(loadPostFromStorage(id)));
	JSON.parse(localStorage.getItem("Users")).forEach(item => users.set(item[0], new User(item[1].username, item[1].password)));
})();

let allPosts = new PostContainer(postsArray);

class ViewPosts {

	constructor() {
		this.posts = new PostContainer();
		idsOfCurrentFeed.forEach(id => {
			this.posts.addPost(allPosts.getPost(id));
		});
		this.count = parseInt(JSON.parse(localStorage.getItem("Count of posts in feed")));
		let user = JSON.parse(localStorage.getItem("Current user"));
		if (user == null) {
			this.user = null;
		}
		else {
			this.user = new User(user.username, user.password);
		}
		this.newUser = new User(null, null);
		this.initElems();
		this.viewHeader();
		this.viewLastFeed();
	}

	addPostToFeed(post) {

		let newPost = document.createElement("div");
		let date = post.createdAt;
		newPost.className = "post";
		newPost.setAttribute("id", post.id);
		newPost.innerHTML = `
   <div class="header_post">

     <div class="user_of_post">

       <div class="username">
         ${post.author}
       </div>
     </div>

     <div class="date_and_time">
         <div class="date">
           ${this.getDateForPost(date)}
         </div>

         <div class="time">
           ${this.getTimeForPost(date)}
         </div>
      </div>

			<div class="edit_block">
			</div>

   </div>

   <textarea class="text_of_post" id="text_of_post" readonly style="resize:none;outline: none">${post.description}
   </textarea>

   <div class="tags">
     ${this.hashTagsInNewLines(post.hashTags)}
   </div>

   <div class="likes">

     <div class="count_of_likes">
       ${post.countOfLikes()}
     </div>
   </div>`;

		let likeButton = document.createElement("button");
		likeButton.className = "imglike";
		if (this.user !== null && post.hasLike(this.user.username)) {
            likeButton.innerHTML = `<img src="resources/images/Like.jpg" width="100%" height="100%">`;
        }
		else {
		    likeButton.innerHTML=`<img src="resources/images/No like.png" width="100%" height="100%">`;
        }
		likeButton.addEventListener("click", ()=>{
			if (this.user == null) {
				document.body.appendChild(this.unableLikeWindow);
				return;
			}
			let likesField = likeButton.parentElement;
			let id = likesField.parentElement.getAttribute("id");
			let c = this.takeLike(id, this.user.username);
			let countOfLikesField = likesField.getElementsByClassName("count_of_likes")[0];
			countOfLikesField.innerHTML = parseInt(countOfLikesField.innerHTML) + c + "";
			if (c === 1) {
			    likeButton.getElementsByTagName("img")[0].setAttribute("src", "resources/images/Like.jpg");
            } else {
			    likeButton.getElementsByTagName("img")[0].setAttribute("src", "resources/images/No like.png");
            }
		});
		newPost.getElementsByClassName("likes")[0].appendChild(likeButton);

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
			newPost.getElementsByClassName("edit")[0].addEventListener("click", ()=>{
				this.feed.innerHTML = "";
				this.idToEdit = post.id;
				let fields = this.editPostWindow.getElementsByTagName("textarea");
				fields[0].value = post.description;
				fields[1].value = "";
				post.hashTags.forEach(item=> {
					fields[1].value += item + "\n";
				});
				this.feed.appendChild(this.editPostWindow);
			});
			newPost.getElementsByClassName("delete")[0].addEventListener("click", ()=>{
				this.postToRemove = newPost;
				document.body.appendChild(this.deletePostWindow);
			});
		}

		this.feed.insertBefore(newPost, this.nextPostsButton);
	}

	changeContainer(arrayOfPosts) {
		this.posts.posts = arrayOfPosts;
		idsOfCurrentFeed = [];
		arrayOfPosts.forEach(post=>idsOfCurrentFeed.push(post.id));
		localStorage.setItem("IDs of current feed", JSON.stringify(idsOfCurrentFeed));
	}

	getDateForPost(date) {
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

	getTimeForPost(date) {
		let str = "";
		let num = date.getHours();
		if (num <= 9) {
			str += "0";
		}
		str += num + ":";
		num = date.getMinutes();
		if (num <= 9) {
			str += "0";
		}
		return str + date.getMinutes();
	}

	hashTagsInNewLines(hashTags) {
		if (hashTags.length !== 0) {
			return hashTags.reduce((acc, curr) => acc + curr + "<br>", "");
		}
		return "";
	}

    initDeletePostWindow() {
        this.deletePostWindow = document.createElement("div");
        this.deletePostWindow.className = "delete_post_window";
        this.deletePostWindow.innerHTML = `
<div class="header_of_window">Warning</div>
<div class="info_delete_post">
Are you sure?
</div>
<div class="buttons_field">
<button class="button_yes">
YES
</button>
<button class="button_no">
NO
</button>
</div>`;
        this.deletePostWindow
            .getElementsByTagName("button")[0]
            .addEventListener("click", ()=>{
                this.feed.removeChild(this.postToRemove);
                document.body.removeChild(this.deletePostWindow);
                this.count -= 1;
                let id = this.postToRemove.getAttribute("id");
                this.posts.removePost(id);
                allPosts.removePost(id);
                if (this.count === 0) {
                    this.feed.appendChild(this.noPostsInscription);
                }
                localStorage.removeItem("Post with id=" + id);
                idsOfCurrentFeed = idsOfCurrentFeed.filter(item=>item !== id);
                localStorage.setItem("IDs of current feed", JSON.stringify(idsOfCurrentFeed));
                idsOfPosts = idsOfPosts.filter(item=>item !== id);
                localStorage.setItem("IDs of posts", JSON.stringify(idsOfPosts));
            });
        this.deletePostWindow
            .getElementsByTagName("button")[1]
            .addEventListener("click", ()=>document.body.removeChild(this.deletePostWindow));
    }

	initEditPostWindow() {
		this.editPostWindow = document.createElement("div");
		this.editPostWindow.className = "edit_post_window";
		this.editPostWindow.innerHTML = `
<div class="header_of_window">Edit post</div>
<div class="info_window">
Edit the description
<textarea style="width:170px;">

</textarea>
Edit the hashTags
<textarea style="width:170px;">

</textarea>
</div>
<div class="buttons_field">
<input class="button_OK" type="submit" value="OK">
<input class="button_cancel" type="submit" value="Cancel">
</div>`;
		let buttons = this.editPostWindow.getElementsByTagName("input");
		buttons[0].addEventListener("click", ()=> {
			let editFields = this.editPostWindow.getElementsByTagName("textarea");
			let tags = editFields[1].value.split(/[\s\n\t\r]/);
			tags = tags.filter(item=>item !== "");
			let editInfo = new EditInfo(editFields[0].value, tags);
			if (!allPosts.editPost(this.idToEdit, editInfo)) {
				this.viewErrorWindow("Incorrect data");
				return;
			}
			localStorage.setItem("Post with id=" + this.idToEdit, JSON.stringify(allPosts.getPost(this.idToEdit)));
			editFields[0].value = "";
			editFields[1].value = "";
			this.viewMainPage();
		});
		buttons[1].addEventListener("click", ()=> {
			let editFields = this.editPostWindow.getElementsByTagName("textarea");
			editFields[0].value = "";
			editFields[1].value = "";
			this.viewLastFeed();
		});
	}

    initElems() {
        this.initFrame();
        this.initMainButton();
        this.initSearchButton();
        this.initPublishPostButton();
        this.initLoginButton();
        this.initLogoutButton();
        this.initSignupButton();
        this.initNextPostsButton();
        this.initNoPostsInscription();
        this.initLoginWindow();
        this.initErrorWindow();
        this.initUnableLikeWindow();
        this.initDeletePostWindow();
        this.initSignupWindow();
        this.initSearchPostsWindow();
        this.initPublishPostWindow();
        this.initEditPostWindow();
    }

	initErrorWindow() {
		this.errorWindow = document.createElement("div");
		this.errorWindow.className = "error_window";
		this.errorWindow.innerHTML = `
<div class="header_of_window">Error</div>
<div class="info_error_window">

</div>
<div class="buttons_field">
<button class="main_button_of_error">
Main
</button>
<button class="back_button">
Back
</button>
</div>`;
		this.errorWindow
			.getElementsByTagName("button")[0]
			.addEventListener("click", ()=>this.viewMainPage());
	}

	initFrame() {
		this.feed = document.getElementById("feed");

		this.leftBlock = document.getElementById("left_block");

		this.rightBlock = document.getElementById("right_block");
	}

	initLoginButton() {
		this.loginButton = document.createElement("button");
		this.loginButton.className = "login";
		this.loginButton.innerHTML = "log in";
		this.loginButton.addEventListener("click", ()=>{
			this.viewWindowToLogin();
		});
	}

	initLoginWindow() {
		this.loginWindow = document.createElement("div");
		this.loginWindow.className = "login_window";
		this.loginWindow.innerHTML = `
<div class="header_of_window">Authorization</div>
<div class="info_window">
Input the login
<input type="text" size="20" style="width=200px;">
Input the password
<input type="text" size="20" style="width=200px;">
</div>`;
		let loginButtons = document.createElement("div");
		loginButtons.className = "buttons_field";

		let loginWindowOKButton = document.createElement("input");
		loginWindowOKButton.className = "button_OK";
		loginWindowOKButton.setAttribute("type", "submit");
		loginWindowOKButton.setAttribute("value", "OK");
		loginWindowOKButton.addEventListener("click", ()=>{
			let fields = this.loginWindow.getElementsByTagName("input");
			let login = fields[0].value;
			let password = fields[1].value;
			let user = users.get(login);
			if (user === undefined) {
				this.viewErrorWindow("No such login. Try again");
				fields[0].value = "";
				fields[1].value = "";
				return;
			}
			else if (user.password !== password) {
				this.viewErrorWindow("Incorrect password. Try again");
				fields[0].value = "";
				fields[1].value = "";
				return;
			} else {
				this.feed.innerHTML = "";
				this.user = user;
				localStorage.setItem("Current user", JSON.stringify(this.user));
			}
			fields[0].value = "";
			fields[1].value = "";
			this.viewHeader();
			this.viewLastFeed();
		});
		loginButtons.appendChild(loginWindowOKButton);

		let loginWindowCancelButton = document.createElement("input");
		loginWindowCancelButton.className = "button_cancel";
		loginWindowCancelButton.setAttribute("type", "submit");
		loginWindowCancelButton.setAttribute("value", "Cancel");
		loginWindowCancelButton.addEventListener("click", ()=>{
			this.feed.innerHTML = "";
			this.viewLastFeed();
		});
		loginButtons.appendChild(loginWindowCancelButton);

		this.loginWindow.appendChild(loginButtons);
	}

	initLogoutButton() {
		this.logoutButton = document.createElement("button");
		this.logoutButton.className = "logout";
		this.logoutButton.innerHTML = "log out";
		this.logoutButton.addEventListener("click", ()=>{
			this.user = null;
			localStorage.setItem("Current user", JSON.stringify(this.user));
			this.viewHeader();
			let postsOfFeed = this.feed.getElementsByClassName("post");
			for (let i = 0; i < postsOfFeed.length; i++) {
				postsOfFeed[i].querySelector(".edit_block").innerHTML = "";
				postsOfFeed[i].getElementsByTagName("img")[0].setAttribute("src", "resources/images/No like.png");
			}
		});
	}

	initMainButton() {
		this.mainButton = document.getElementById("main");
		this.mainButton.addEventListener("click", ()=>this.viewMainPage());
	}

	initNextPostsButton() {
		this.nextPostsButton = document.createElement("button");
		this.nextPostsButton.className = "next_posts";
		this.nextPostsButton.innerHTML = "next<br>posts";
		this.nextPostsButton.addEventListener("click", ()=>this.viewNextPosts());
	}

	initNoPostsInscription() {
		this.noPostsInscription = document.createElement("div");
		this.noPostsInscription.innerHTML = "No any posts";
		this.noPostsInscription.className = "no_posts_window";
	}

	initPublishPostButton() {
		this.publishPostButton = document.createElement("button");
		this.publishPostButton.className = "publish_post";
		this.publishPostButton.innerHTML = "publish post";
		this.publishPostButton.addEventListener("click", ()=>{
			this.feed.innerHTML = "";
			this.feed.appendChild(this.publishPostWindow);
		});
	}

	initPublishPostWindow() {
		this.publishPostWindow = document.createElement("div");
		this.publishPostWindow.className = "publish_post_window";
		this.publishPostWindow.innerHTML = `
<div class="header_of_window">Adding post</div>
<div class="info_window">
Input the description
<textarea style="width=200px;">

</textarea>
Input the hashTags
<textarea style="width=200px;">

</textarea>
</div>
<div class="buttons_field">
<input class="button_OK" type="submit" value="OK">
<input class="button_cancel" type="submit" value="Cancel">
</div>`;

		let buttons = this.publishPostWindow.getElementsByTagName("input");
		buttons[0].addEventListener("click", ()=> {
			let editFields = this.publishPostWindow.getElementsByTagName("textarea");
			let tags = editFields[1].value.split(/[\s\n\t\r]/);
			tags = tags.filter(item=>item !== "");
			let newPost = new Post(parseInt(idsOfPosts[idsOfPosts.length - 1]) + 1 + "", this.user.username, new Date(), editFields[0].value, tags);
			if (!allPosts.addPost(newPost)) {
				this.viewErrorWindow("Incorrect data");
				return;
			}
			this.posts.addPost(newPost);
			idsOfPosts.push(newPost.id);
			localStorage.setItem("IDs of posts", JSON.stringify(idsOfPosts));
			localStorage.setItem("Post with id=" + newPost.id, JSON.stringify(newPost));
			editFields[0].value = "";
			editFields[1].value = "";
			this.viewMainPage();
		});
		buttons[1].addEventListener("click", ()=> {
			let editFields = this.publishPostWindow.getElementsByTagName("textarea");
			this.feed.removeChild(this.publishPostWindow);
			this.viewLastFeed();
			editFields[0].value = "";
			editFields[1].value = "";
		});
	}

	initSearchButton() {
		this.searchButton = document.getElementById("search");
		this.searchButton.addEventListener("click", ()=>{
			this.feed.innerHTML = "";
			this.feed.appendChild(this.searchPostsWindow);
		});
	}

	initSearchPostsWindow() {
		this.searchPostsWindow = document.createElement("div");
		this.searchPostsWindow.className = "search_post_window";
		this.searchPostsWindow.innerHTML = `
<div class="header_of_window">Search posts</div>
<div class="info_window">
Input tags
<textarea  style="width=200px;"></textarea>
Input author
<textarea style="width=200px;"></textarea>
Input the interval:
<div>From
<input type="date">
<input type="time">
</div>
<div>To
<input type="date">
<input type="time">
</div>
<div class="buttons_field">
<input class="button_OK" type="submit" value="OK">
<input class="button_cancel" type="submit" value="Cancel">
</div>
</div>`;
		this.searchPostsWindow
			.getElementsByClassName("button_OK")[0]
			.addEventListener("click", ()=>{
				let fieldsTxtArea = this.searchPostsWindow
					.getElementsByTagName("textarea");
				let tags = fieldsTxtArea[0].value.toString().split(/[\n\r\t\s]/);
				tags = tags.filter(item => item !== "");
				let author = fieldsTxtArea[1].value;
				let fieldsInput = this.searchPostsWindow
					.getElementsByTagName("input");
				if (fieldsInput[0].validity.badInput || fieldsInput[0].validity.badInput
					|| fieldsInput[0].validity.badInput||fieldsInput[0].validity.badInput) {
					this.viewErrorWindow("Incorrect data", function(){
						view.viewSearchPostsWindow();
					});
					return;
				}
				let startDate = fieldsInput[0].value + "T" + fieldsInput[1].value;
				if (startDate === "T") {
					startDate = "1970-01-01T00:00:00";
				}
				let endDate = fieldsInput[2].value + "T" + fieldsInput[3].value;
				if (endDate === "T") {
					endDate = new Date().toString();
				}
				let filterParams = new FilterParams(author, new DateInterval(new Date(startDate), new Date(endDate)), tags);
				if (!filterParams.validate()) {
					this.viewErrorWindow("Incorrect data", function(){
					    view.viewSearchPostsWindow();
                    });
					return;
				}
				this.changeContainer(allPosts.getPostsByFilter(filterParams));
				this.viewMainFeed();
			});

		this.searchPostsWindow
			.getElementsByClassName("button_cancel")[0]
			.addEventListener("click", ()=> {
				this.feed.removeChild(this.searchPostsWindow);
				this.viewMainPage();
			});
	}

	initSignupButton() {
		this.signupButton = document.createElement("button");
		this.signupButton.className = "sign_up";
		this.signupButton.innerHTML = "sign up";
		this.signupButton.addEventListener("click", () =>{
			this.feed.innerHTML = "";
			this.signupWindow.getElementsByTagName("h")[0].innerHTML="Input login (6-20 chars)";
			this.levelOfSignup = 0;
			this.feed.appendChild(this.signupWindow);
		});
	}

	initSignupWindow() {
		this.signupWindow = document.createElement("div");
		this.signupWindow.className = "sign_up_window";
		this.signupWindow.innerHTML = `
<div class="header_of_window">Registration</div>
<div class="info_window">
<h></h>
<input type="text" size="20" style="width=200px;">
</div>
<div class="buttons_field">
<input class="button_OK" type="submit" value="OK">
<input class="button_cancel" type="submit" value="Cancel">
</div>`;
		this.signupWindow.querySelector(".button_OK").addEventListener("click", ()=>{
			let value = this.signupWindow.getElementsByTagName("input")[0].value;
			switch (this.levelOfSignup) {
				case 0: {
					if (value.length < 6 || value.length > 20) {
						this.viewErrorWindow("Incorrect login", function(){view.viewSignupWindow();});
					} else if (users.has(value)) {
						this.viewErrorWindow("There is a user with the same login", function(){view.viewSignupWindow();});
					} else {
						this.newUser.username = value;
						this.signupWindow.getElementsByTagName("h")[0].innerHTML = "Input the password (6-20 chars)";
						this.levelOfSignup += 1;
					}
					break;
				}
				case 1: {
					if (value.length < 6 || value.length > 20) {
						this.viewErrorWindow("Incorrect password", function(){view.viewSignupWindow();});
					} else {
						this.newUser.password = value;
						this.signupWindow.getElementsByTagName("h")[0].innerHTML = "Input the password again";
						this.levelOfSignup += 1;
					}
					break;
				}
				case 2: {
					if (this.newUser.password !== value) {
						this.viewErrorWindow("Passwords are not equal", function(){view.viewSignupWindow();});
					} else {
						users.set(this.newUser.username, this.newUser);
						localStorage.setItem("Users", JSON.stringify(Array.from(users)));
						this.feed.removeChild(this.signupWindow);
						this.user = new User(this.newUser.username, this.newUser.password);
						localStorage.setItem("Current user", JSON.stringify(this.user));
						this.viewHeader();
						this.viewLastFeed();
						this.levelOfSignup = -1;
					}
					break;
				}
				default:{

				}
			}
			this.signupWindow.getElementsByTagName("input")[0].value = "";
		});
		this.signupWindow.querySelector(".button_cancel").addEventListener("click", ()=>{
			this.feed.innerHTML = "";
			this.viewLastFeed();
		});
	}

	initUnableLikeWindow() {
		this.unableLikeWindow = document.createElement("div");
		this.unableLikeWindow.className = "enable_like_window";
		this.unableLikeWindow.innerHTML = `
<div class="header_of_window">Error</div>
<div class="info_enable_like">
You are not authorized
</div>
<div class="buttons_field">
<button class="OK_button_enable_like">
OK
</button>
</div>`;
		this.unableLikeWindow
			.getElementsByTagName("button")[0]
			.addEventListener("click", ()=>document.body.removeChild(this.unableLikeWindow));
	}

	takeLike(idOfPost, nameOfUser) {
		let post = allPosts.getPost(idOfPost);
		let c = post.takeLike(nameOfUser);
		localStorage.setItem("Post with id=" + idOfPost, JSON.stringify(post));
		return c;
	}

	viewErrorWindow(errorText, func) {
		this.errorWindow.getElementsByClassName("info_error_window")[0].innerHTML = errorText;
		this.feed.innerHTML = "";
		this.errorWindow.getElementsByTagName("button")[1].addEventListener("click", func);
		this.feed.appendChild(this.errorWindow);
	}

	viewHeader() {
		this.leftBlock.innerHTML = "";
		this.leftBlock.appendChild(this.mainButton);
		this.leftBlock.appendChild(this.searchButton);
		this.rightBlock.innerHTML = "";
		if (this.user == null) {
			let orInscr = document.createElement("h");
			orInscr.innerHTML = "or";
			this.rightBlock.appendChild(this.loginButton);
			this.rightBlock.appendChild(orInscr);
			this.rightBlock.appendChild(this.signupButton);
		} else {
			this.leftBlock.appendChild(this.publishPostButton);
			this.rightBlock.innerHTML = `
				<span class="profile_name">
					${this.user.username}
				</span>`;
			this.rightBlock.appendChild(this.logoutButton);
		}
	}

	viewLastFeed() {
		this.viewPostsFromInterval(0, this.count);
	}

	viewMainPage() {
	    this.changeContainer(postsArray);
		this.viewMainFeed();
	}

	viewMainFeed() {
        this.feed.innerHTML = "";
        this.count = 0;
        if (this.posts.size() === 0) {
            this.feed.appendChild(this.noPostsInscription);
        } else {
            this.feed.appendChild(this.nextPostsButton);
            this.viewNextPosts();
        }
    }

	viewNextPosts() {
		let postsToView = this.posts.getPostsFromInterval(this.count, 10);
		postsToView.forEach(item => this.addPostToFeed(item, this.feed));
		this.count += 10;
		if (this.count >= this.posts.size()) {
			this.feed.removeChild(this.nextPostsButton);
			this.count = this.posts.size();
		}
		localStorage.setItem("Count of posts in feed", this.count + "");
	}

	viewPostsFromInterval(skip, count) {
		let postsToView = this.posts.getPostsFromInterval(skip, count);
		if (this.feed.querySelector(".next_posts") == null) {
			this.feed.appendChild(this.nextPostsButton);
		}
		postsToView.forEach(item => this.addPostToFeed(item));
		if (this.count >= this.posts.size()) {
			this.feed.removeChild(this.nextPostsButton);
		}
	}

	viewSearchPostsWindow() {
	    this.feed.innerHTML = "";
	    this.feed.appendChild(this.searchPostsWindow);
    }

    viewSignupWindow() {
		this.feed.innerHTML = "";
		this.feed.appendChild(this.signupWindow);
	}

	viewWindowToLogin() {
		this.feed.innerHTML="";
		this.feed.appendChild(this.loginWindow);
	}
}

view = new ViewPosts();
