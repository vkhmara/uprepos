class User {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}
}

function fullLS() {
	localStorage.setItem("Count of posts on feed", JSON.stringify("10"));
	localStorage.setItem("maxSize", JSON.stringify("41"));
	localStorage.setItem("filterParams", JSON.stringify(null));
	localStorage.setItem("Current user", JSON.stringify(null));
}

class ViewPosts {

	constructor() {
		let filParams = JSON.parse(localStorage.getItem("filterParams"));
		this.filterParams = filParams === null ? null : new FilterParams();
		if (this.filterParams !== null) {
			this.filterParams.fromObject(filParams);
		}
		this.maxSize = parseInt(JSON.parse(localStorage.getItem("maxSize")));
		this.count = parseInt(JSON.parse(localStorage.getItem("Count of posts on feed")));
		let user = JSON.parse(localStorage.getItem("Current user"));
		if (user == null) {
			this.user = null;
		} else {
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
		} else {
			likeButton.innerHTML = `<img src="resources/images/No like.png" width="100%" height="100%">`;
		}
		likeButton.addEventListener("click", async () => {
			if (this.user == null) {
				document.body.appendChild(this.unableLikeWindow);
				return;
			}
			let likesField = likeButton.parentElement;
			let id = likesField.parentElement.getAttribute("id");
			let c;
			await this.takeLike(id, this.user.username).then(data => c = data);
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
			newPost.getElementsByClassName("edit")[0].addEventListener("click", () => {
				this.feed.innerHTML = "";
				this.idToEdit = post.id;
				let fields = this.editPostWindow.getElementsByTagName("textarea");
				fields[0].value = post.description;
				fields[1].value = "";
				post.hashTags.forEach(item => {
					fields[1].value += item + "\n";
				});
				this.feed.appendChild(this.editPostWindow);
			});
			newPost.getElementsByClassName("delete")[0].addEventListener("click", () => {
				this.postToRemove = newPost;
				document.body.appendChild(this.deletePostWindow);
			});
		}

		this.feed.insertBefore(newPost, this.nextPostsButton);
	}

	changeMaxSize() {
		return sendGetRequest("/size?" + this.urlForFilter(this.filterParams))
			.then(data => this.maxSize = parseInt(data))
			.then(() => localStorage.setItem("maxSize", JSON.stringify(this.maxSize)));
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
			.addEventListener("click", () => {
				this.feed.removeChild(this.postToRemove);
				document.body.removeChild(this.deletePostWindow);
				this.count -= 1;
				localStorage.setItem("Count of posts on feed", JSON.stringify(this.count));
				this.maxSize -= 1;
				localStorage.setItem("maxSize", JSON.stringify(this.maxSize));
				sendDeleteRequest("/tweets", this.postToRemove.getAttribute("id"));
				if (this.count === 0) {
					this.feed.appendChild(this.noPostsInscription);
				}
			});
		this.deletePostWindow
			.getElementsByTagName("button")[1]
			.addEventListener("click", () => document.body.removeChild(this.deletePostWindow));
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
		buttons[0].addEventListener("click", async () => {
			let editFields = this.editPostWindow.getElementsByTagName("textarea");
			let tags = editFields[1].value.split(/[\s\n\t\r]/);
			tags = tags.filter(item => item !== "");
			let editInfo = new EditInfo(editFields[0].value, tags);
			let resp = "";
			await sendPostRequest("/edit", {"id": this.idToEdit, "editInfo": editInfo})
				.then(data => resp = data);
			if (resp === "Post was not edited") {
				this.viewErrorWindow("Incorrect data", function () {
					view.feed.innerHTML = "";
					view.feed.appendChild(view.editPostWindow);
				});
				return;
			}
			editFields[0].value = "";
			editFields[1].value = "";
			this.viewMainPage();
		});
		buttons[1].addEventListener("click", () => {
			let editFields = this.editPostWindow.getElementsByTagName("textarea");
			editFields[0].value = "";
			editFields[1].value = "";
			this.viewLastFeed();
			this.feed.removeChild(this.editPostWindow);
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
			.addEventListener("click", () => this.viewMainPage());
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
		this.loginButton.addEventListener("click", () => {
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
<input type="password" size="20" style="width=200px;">
</div>`;
		let loginButtons = document.createElement("div");
		loginButtons.className = "buttons_field";

		let loginWindowOKButton = document.createElement("input");
		loginWindowOKButton.className = "button_OK";
		loginWindowOKButton.setAttribute("type", "submit");
		loginWindowOKButton.setAttribute("value", "OK");
		loginWindowOKButton.addEventListener("click", async () => {
			let fields = this.loginWindow.getElementsByTagName("input");
			let login = fields[0].value;
			let password = fields[1].value;
			if (login === "") {
				this.viewErrorWindow("The login or password field is empty. Try again", function () {
					view.viewWindowToLogin();
				});
				fields[0].value = fields[1].value = "";
				return;
			}
			let realPassword = "";
			await sendGetRequest("/users", "username", login).then(data => realPassword = data);
			if (realPassword !== password) {
				this.viewErrorWindow("Incorrect login or password. Try again", function () {
					view.viewWindowToLogin();
				});
				fields[0].value = fields[1].value = "";
				return;
			} else {
				this.feed.innerHTML = "";
				this.user = new User(login, password);
				localStorage.setItem("Current user", JSON.stringify(this.user));
			}
			fields[0].value = fields[1].value = "";
			this.viewHeader();
			this.viewLastFeed();
		});
		loginButtons.appendChild(loginWindowOKButton);

		let loginWindowCancelButton = document.createElement("input");
		loginWindowCancelButton.className = "button_cancel";
		loginWindowCancelButton.setAttribute("type", "submit");
		loginWindowCancelButton.setAttribute("value", "Cancel");
		loginWindowCancelButton.addEventListener("click", () => {
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
		this.logoutButton.addEventListener("click", () => {
			this.user = null;
			localStorage.setItem("Current user", JSON.stringify(this.user));
			this.viewHeader();
			let postsOfFeed = this.feed.getElementsByClassName("post");
			for (let i = 0; i < postsOfFeed.length; i++) {
				postsOfFeed[i].querySelector(".edit_block").innerHTML = "";
				postsOfFeed[i].getElementsByTagName("img")[0]
					.setAttribute("src", "resources/images/No like.png");
			}
		});
	}

	initMainButton() {
		this.mainButton = document.getElementById("main");
		this.mainButton.addEventListener("click", () => {
			this.filterParams = null;
			localStorage.setItem("filterParams", JSON.stringify(this.filterParams));
			this.changeMaxSize()
				.then(() => this.viewMainFeed());
		});
	}

	initNextPostsButton() {
		this.nextPostsButton = document.createElement("button");
		this.nextPostsButton.className = "next_posts";
		this.nextPostsButton.innerHTML = "next<br>posts";
		this.nextPostsButton.addEventListener("click", () => this.viewNextPosts());
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
		this.publishPostButton.addEventListener("click", () => {
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
		buttons[0].addEventListener("click", async () => {
			let editFields = this.publishPostWindow.getElementsByTagName("textarea");
			let tags = editFields[1].value.split(/[\s\n\t\r]/);
			tags = tags.filter(item => item !== "");
			let newPost = new Post("", this.user.username, new Date(), editFields[0].value, tags);
			let respText = "";
			await sendPostRequest("/tweets", newPost)
				.then(data => respText = data);
			if (respText === "Post was not added.") {
				this.viewErrorWindow("Incorrect data", function () {
					view.viewSearchPostsWindow();
				});
				return;
			}
			editFields[0].value = "";
			editFields[1].value = "";
			this.viewMainPage();
		});
		buttons[1].addEventListener("click", () => {
			let editFields = this.publishPostWindow.getElementsByTagName("textarea");
			this.feed.removeChild(this.publishPostWindow);
			this.viewLastFeed();
			editFields[0].value = "";
			editFields[1].value = "";
		});
	}

	initSearchButton() {
		this.searchButton = document.getElementById("search");
		this.searchButton.addEventListener("click", () => {
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
			.addEventListener("click", () => {
				let fieldsTxtArea = this.searchPostsWindow
					.getElementsByTagName("textarea");
				let tags = fieldsTxtArea[0].value.toString().split(/[\n\r\t\s]/);
				tags = tags.filter(item => item !== "");
				let author = fieldsTxtArea[1].value;
				let fieldsInput = this.searchPostsWindow
					.getElementsByTagName("input");
				if (fieldsInput[0].validity.badInput || fieldsInput[0].validity.badInput
					|| fieldsInput[0].validity.badInput || fieldsInput[0].validity.badInput) {
					this.viewErrorWindow("Incorrect data", function () {
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
					this.viewErrorWindow("Incorrect data", function () {
						view.viewSearchPostsWindow();
					});
					return;
				}
				this.filterParams = filterParams;
				localStorage.setItem("filterParams", JSON.stringify(this.filterParams));
				this.changeMaxSize()
					.then(() => this.viewMainFeed());
			});

		this.searchPostsWindow
			.getElementsByClassName("button_cancel")[0]
			.addEventListener("click", () => {
				this.feed.removeChild(this.searchPostsWindow);
				this.viewMainPage();
			});
	}

	initSignupButton() {
		this.signupButton = document.createElement("button");
		this.signupButton.className = "sign_up";
		this.signupButton.innerHTML = "sign up";
		this.signupButton.addEventListener("click", () => {
			this.feed.innerHTML = "";
			this.signupWindow.getElementsByTagName("h")[0].innerHTML = "Input login (6-20 chars)";
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
		this.signupWindow.querySelector(".button_OK").addEventListener("click", async () => {
			let value = this.signupWindow.getElementsByTagName("input")[0].value;
			switch (this.levelOfSignup) {
				case 0: {
					if (value.length < 6 || value.length > 20) {
						this.viewErrorWindow("Incorrect login", function () {
							view.viewSignupWindow();
						});
					} else {
						let exists;
						await sendGetRequest("/users", "username", value).then(data => exists = JSON.parse(data) !== null);
						if (exists) {
							this.viewErrorWindow("There is a user with the same login", function () {
								view.viewSignupWindow();
							});
						} else {
							this.newUser.username = value;
							this.signupWindow.getElementsByTagName("h")[0].innerHTML = "Input the password (6-20 chars)";
							this.signupWindow.getElementsByTagName("input")[0].setAttribute("type", "password");
							this.levelOfSignup += 1;
						}
					}
					break;
				}
				case 1: {
					if (value.length < 6 || value.length > 20) {
						this.viewErrorWindow("Incorrect password", function () {
							view.viewSignupWindow();
						});
					} else {
						this.newUser.password = value;
						this.signupWindow.getElementsByTagName("h")[0].innerHTML = "Input the password again";
						this.levelOfSignup += 1;
					}
					break;
				}
				case 2: {
					if (this.newUser.password !== value) {
						this.viewErrorWindow("Passwords are not equal", function () {
							view.viewSignupWindow();
						});
					} else {
						await sendPostRequest("/users", this.newUser);
						this.user = new User(this.newUser.username, this.newUser.password);
						localStorage.setItem("Current user", JSON.stringify(this.user));
						this.feed.removeChild(this.signupWindow);
						this.viewHeader();
						this.viewLastFeed();
					}
					break;
				}
				default: {

				}
			}
			this.signupWindow.getElementsByTagName("input")[0].value = "";
		});
		this.signupWindow.querySelector(".button_cancel").addEventListener("click", () => {
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
			.addEventListener("click", () => document.body.removeChild(this.unableLikeWindow));
	}

	async takeLike(idOfPost, username) {
		let c = 0;
		await sendPostRequest("/like", {
			idOfPost: idOfPost,
			username: username
		}).then(data => c = parseInt(data));
		return c;
	}

	urlForFilter(filterParams) {
		return filterParams == null ? `` : `&author=${this.filterParams.author}
			&left=${this.filterParams.dateInterval.left.getTime()}
			&right=${this.filterParams.dateInterval.right.getTime()}
			&hashTags=${this.filterParams.hashTags.reduce((acc, curr) => acc + curr.substring(1) + " ", "")}`;
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

	async viewLastFeed() {
		await this.viewPostsFromInterval(0, this.count);
		if (this.count === this.maxSize) {
			this.feed.removeChild(this.nextPostsButton);
		}
	}

	viewMainPage() {
		this.filterParams = null;
		this.changeMaxSize();
		this.viewMainFeed();
	}

	viewMainFeed() {
		this.feed.innerHTML = "";
		this.count = 0;
		if (this.maxSize === 0) {
			this.feed.appendChild(this.noPostsInscription);
		} else {
			this.feed.appendChild(this.nextPostsButton);
			this.viewNextPosts();
		}
	}

	async viewNextPosts() {
		await this.viewPostsFromInterval(this.count, 10);
		this.count += 10;
		if (this.count >= this.maxSize) {
			this.feed.removeChild(this.nextPostsButton);
			this.count = this.maxSize;
		}
		localStorage.setItem("Count of posts on feed", this.count + "");
	}

	async viewPostsFromInterval(skip, count) {
		let postsToView = [];
		let url = `/tweets/search?skip=${skip}&count=${count}` + this.urlForFilter(this.filterParams);
		await fetch(url).then(resp => resp.json()).then(data => postsToView = data.map(item => new Post().fromJSON(item)));

		if (this.feed.querySelector(".next_posts") == null) {
			this.feed.appendChild(this.nextPostsButton);
		}
		postsToView.forEach(item => this.addPostToFeed(item));
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
		this.feed.innerHTML = "";
		this.feed.appendChild(this.loginWindow);
	}
}
let view = new ViewPosts();
