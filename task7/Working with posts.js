(function(){
class Post {
	constructor(id, avatar, author, createdAt, description, hashTags=[], photoLink="", likes = []) {
		this.id = id;
		this.avatar = avatar;
		this.author = author;
		this.createdAt = createdAt;
		this.description = description;
		this.photoLink = photoLink;
		this.hashTags = hashTags;
		this.likes=likes;
		this.countOfLikes=this.likes.length;
	}

	output() {
		document.write('ID:' + this.id +
		 '<br \/>author:' + this.author +
		 '<br \/>Created at:' + this.createdAt+'<br \/>'+
		 'Description:\"' + this.description+'\"<br \/><br \/>');
	}
}

let posts = [
new Post("1",  "Ava.jpg", "incredible2",  new Date('2020-06-24T22:47:41'), "Hello"),
new Post("2",  "Ava.jpg", "incredible6",  new Date('2020-09-22T06:18:04'), "Hello"),
new Post("3",  "Ava.jpg", "incredible12", new Date('2020-02-08T01:05:05'), "Hello"),
new Post("4",  "Ava.jpg", "incredible20", new Date('2020-01-14T14:55:11'), "Hello"),
new Post("5",  "Ava.jpg", "incredible30", new Date('2020-05-09T14:24:51'), "Hello"),
new Post("6",  "Ava.jpg", "incredible42", new Date('2020-12-28T20:21:22'), "Hello"),
new Post("7",  "Ava.jpg", "incredible3",  new Date('2020-10-26T11:06:47'), "Hello"),
new Post("8",  "Ava.jpg", "incredible19", new Date('2020-07-13T19:47:52'), "Hello, it's me."),
new Post("9",  "Ava.jpg", "incredible37", new Date('2020-10-29T02:51:23'), "Hello"),
new Post("10", "Ava.jpg", "incredible4",  new Date('2020-05-08T07:21:44'), "Hello"),
new Post("11", "Ava.jpg", "incredible26", new Date('2020-10-17T22:44:47'), "Hello"),
new Post("12", "Ava.jpg", "incredible50", new Date('2020-11-09T21:23:19'), "Hello"),
new Post("13", "Ava.jpg", "incredible23", new Date('2020-01-16T14:35:16'), "Hello"),
new Post("14", "Ava.jpg", "incredible51", new Date('2020-05-09T14:40:46'), "Hello"),
new Post("15", "Ava.jpg", "incredible28", new Date('2020-11-02T02:45:26'), "Hello"),
new Post("16", "Ava.jpg", "incredible7",  new Date('2020-09-05T21:06:50'), "Hello"),
new Post("17", "Ava.jpg", "incredible41", new Date('2020-01-03T12:23:09'), "Hello"),
new Post("18", "Ava.jpg", "incredible24", new Date('2020-05-12T08:46:20'), "Hello"),
new Post("19", "Ava.jpg", "incredible9",  new Date('2020-06-14T02:39:24'), "Hello"),
new Post("20", "Ava.jpg", "incredible49", new Date('2020-06-20T18:38:58'), "Hello"),
new Post("21", "Ava.jpg", "incredible4",  new Date('2020-08-16T00:27:58'), "Hello182", ["#hello"]),
new Post("22", "Ava.jpg", "incredible4",  new Date('2020-10-13T00:22:08'), "Hello707", ["#hello"]),
new Post("23", "Ava.jpg", "incredible4",  new Date('2020-11-10T11:57:09'), "Hello46"),
new Post("24", "Ava.jpg", "incredible4",  new Date('2020-12-07T10:14:22'), "Hello111"),
new Post("25", "Ava.jpg", "incredible4",  new Date('2020-12-15T02:38:40'), "Hello481"),
new Post("26", "Ava.jpg", "incredible4",  new Date('2020-01-05T17:41:38'), "Hello211"),
new Post("27", "Ava.jpg", "incredible4",  new Date('2020-06-07T13:53:03'), "Hello154", ["#hello", "#hai"]),
new Post("28", "Ava.jpg", "incredible4",  new Date('2020-01-23T12:15:11'), "Hello564"),
new Post("29", "Ava.jpg", "incredible4",  new Date('2020-07-05T20:30:55'), "Hello931"),
new Post("30", "Ava.jpg", "incredible4",  new Date('2020-04-25T00:08:16'), "Hello990"),
new Post("31", "Ava.jpg", "incredible5",  new Date('2020-07-10T09:20:03'), "Hello633"),
new Post("32", "Ava.jpg", "incredible5",  new Date('2020-09-27T18:55:54'), "Hello468"),
new Post("33", "Ava.jpg", "incredible5",  new Date('2020-12-27T12:39:01'), "Hello530", ["#hai"]),
new Post("34", "Ava.jpg", "incredible5",  new Date('2020-12-20T18:54:23'), "Hello927", ["#ni hao"]),
new Post("35", "Ava.jpg", "incredible5",  new Date('2020-07-19T11:25:13'), "Hello549"),
new Post("36", "Ava.jpg", "incredible5",  new Date('2020-10-26T20:03:24'), "Hello616"),
new Post("37", "Ava.jpg", "incredible5",  new Date('2020-12-23T17:20:30'), "Hello682"),
new Post("38", "Ava.jpg", "incredible5",  new Date('2020-07-28T00:46:26'), "Hello208"),
new Post("39", "Ava.jpg", "incredible5",  new Date('2020-10-22T02:59:26'), "Hello940"),
new Post("40", "Ava.jpg", "incredible5",  new Date('2020-03-15T21:40:13'), "Hello999")
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
	if (arrayPosts.length == 0) {
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
		this._count = this._posts.length;
	}

	get posts() {
		return this._posts;
	}

	set posts(arr) {
		this._posts = arr;
	}

	get count() {
		return this._count;
	}

	set count(count) {
		this._count = count;
	}

	_liesInInterval(date, dateInterval) {
		return dateInterval == null || dateInterval.left <= date && date <= dateInterval.right;
	}

	get liesInInterval() {
		return this._liesInInterval;
	}

	_hasAnyTag(hashTagsOfPost, hashTags) {
		return hashTagsOfPost.some(hashTagOfPost=>(hashTags.includes(hashTagOfPost)));
	}

	get hasAnyTag() {
		return this._hasAnyTag;
	}

	_compDates(x, y) {
		return x.createdAt - y.createdAt;
	}

	get compDates() {
		return this._compDates;
	}

	_isTag(str) {
		return str[0] == '#';
	}

	get isTag() {
		return this._isTag;
	}

	_isString(obj) {
		return typeof obj == 'string';
	}

	get isString() {
		return this._isString;
	}

  _rightDate(date) {
		return date.getHours() >= 0 && date.getHours() <= 23 &&
		 date.getMinutes() >= 0 && date.getMinutes() <= 59 &&
		 	 date.getSeconds() >= 0 && date.getSeconds() <= 59;
	}

	get rightDate() {
		return this._rightDate;
	}

	_getPostsByFilter(filterConfig) {
		return this.posts.filter(element=>
			(filterConfig.author == "" || element.author == filterConfig.author) &&
			((filterConfig.dateInterval == null) || this.liesInInterval(element.createdAt, filterConfig.dateInterval)) &&
			 ((filterConfig.hashTags == []) || this.hasAnyTag(element.hashTags, filterConfig.hashTags))
			 );
	}

	get getPostsByFilter() {
		return this._getPostsByFilter;
	}

	getPosts(filterConfig, skip=0, top=10) {
		if (skip < 0 || top <= 0) {
			return [];
		}
		let postsByFilter = this.getPostsByFilter(filterConfig).sort(this.compDates);
		return postsByFilter.slice(skip, skip + top);
	}

	getPost(ID) {
		return this.posts.find(item=>item.id == ID);
	}

	validatePost(somePost) {
		return this.isString(somePost.description)&&
		 somePost.description.length > 0 && somePost.description.length < 200 &&
		 this.isString(somePost.author) && somePost.author.length > 0 &&
		 somePost.hashTags.every(this.isTag) &&
		 somePost.hashTags.every(this.isString) && somePost.likes.every(this.isString) &&
		 somePost.createdAt instanceof Date && this.rightDate(somePost.createdAt);
	}

	addPost(somePost) {
		if (!this.validatePost(somePost)) {
			return false;
		}
		this.posts.push(somePost);
		this.count += 1;
		return true;
	}

	editPost(ID, edit) {
		let index = this.posts.findIndex(item=>item.id==ID);
		if (index==-1) {
			return false;
		}
		let edPost = this.posts[index];
		if (edit.description != "") {
			edPost.description = edit.description;
		}
		if (edit.hashTags.length != 0) {
			edPost.hashTags = edit.hashTags;
		}
		if (edit.photoLink != "") {
			edPost.photoLink = edit.photoLink;
		}
		if (!this.validatePost(edPost)) {
			return false;
		}
		this.posts[index] = edPost;
		return true;
	}

	removePost(ID) {
		let index = this.posts.findIndex(item=>item.id==ID);
		if (index == -1) {
			return false;
		}
		this.posts.splice(index, 1);
		this.count -= 1;
		return true;
	}

	addAll(arrayPosts) {
		let invalidPosts = [];
		arrayPosts.forEach(item => {
			if (!this.addPost(item)) {
				invalidPosts.push(item);
			}
		});
		return invalidPosts;
	}

}

allPosts = new PostContainer(posts);

printLengthOfArray(posts);
printSpace();
document.write("The testing of function removePost()<br\/>");

document.write(allPosts.removePost("12") + '<br\/>');
printLengthOfArray(posts);
printSpace();

document.write(allPosts.removePost("12") + '<br\/>');
printLengthOfArray(posts);
printSpace();
printSpace();

document.write("The testing of function getPost()");
printSpace();

let testPost = allPosts.getPost("15");
if (testPost != null) {
	testPost.output();
}
else {
	document.write('No such post');
}

testPost = allPosts.getPost("105");
if (testPost != null) {
	testPost.output();
}
else {
	document.write('No such post');
}
printSpace();
printSpace();

document.write("The testing of function getPosts()");
printSpace();

let postsOfAuthor = allPosts.getPosts(new FilterParams("", null, ["#hello"]));
outputAllPosts(postsOfAuthor);
printSpace();

postsOfAuthor = allPosts.getPosts(new FilterParams("incredible5",
	new DateInterval(new Date(2020, 11, 25), new Date(2020, 11, 28)),
	 ["#hai", "#ni hao"]));
outputAllPosts(postsOfAuthor);
printSpace();

postsOfAuthor = allPosts.getPosts(new FilterParams("lol", null, ["#hello"]));
outputAllPosts(postsOfAuthor);
printSpace();
printSpace();

document.write("The testing of function addPost()");
printSpace();

document.write(allPosts.addPost(
	new Post("231", "Ava.jpg", "NewUser", new Date('2020-03-23T16:21:40'), 'I am new user')));
printSpace();
printLengthOfArray(posts);
printSpace();
allPosts.getPost("231").output();
document.write(allPosts.addPost(
	new Post("231", "Ava.jpg", "Lalla", new Date('2029-03-23T16:21:40'), 'New text')));

printSpace();
printLengthOfArray(posts);
printSpace();
document.write("The testing of function editPost()");
printSpace();
allPosts.getPost("23").output();
document.write(allPosts.editPost("23", new EditInfo("haha")));
printSpace();
allPosts.getPost("23").output();
printSpace();
printSpace();

document.write("The testing of function addAll()");
printSpace();

outputAllPosts(allPosts.addAll([
	new Post("211", "Ava.jpg", "Iam", new Date('2020-03-23T16:21:40'), 'I am new user'),
	new Post("149", "Ava.jpg", "Ami", new Date('2020-03-33T76:61:40'), 'I am new user'),
	new Post("93", "Ava.jpg", "", new Date('2020-03-23T16:21:40'), 'I am new user')
]));


})();
