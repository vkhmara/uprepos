(function(){
class post {
	constructor(id, avatar, author, createdAt, description, hashTags=[], photoLink="") {
		this.id = id;
		this.avatar = avatar;
		this.author = author;
		this.createdAt = createdAt;
		this.description = description;
		this.photoLink = photoLink;
		this.hashTags = hashTags;
		this.likes=[];
		this.countOfLikes=0;
	}

	output() {
		document.write('ID:' + this.id +
		 '<br \/>author:' + this.author +
		 '<br \/>Created at:' + this.createdAt+'<br \/>'+
		 'Description:\"' + this.description+'\"<br \/><br \/>');
	}
}
var posts = [
new post("1",  "Ava.jpg", "incredible2",  new Date('2020-06-24T22:47:41'), "Hello"),
new post("2",  "Ava.jpg", "incredible6",  new Date('2020-09-22T06:18:04'), "Hello"),
new post("3",  "Ava.jpg", "incredible12", new Date('2020-02-08T01:05:05'), "Hello"),
new post("4",  "Ava.jpg", "incredible20", new Date('2020-01-14T14:55:11'), "Hello"),
new post("5",  "Ava.jpg", "incredible30", new Date('2020-05-09T14:24:51'), "Hello"),
new post("6",  "Ava.jpg", "incredible42", new Date('2020-12-28T20:21:22'), "Hello"),
new post("7",  "Ava.jpg", "incredible3",  new Date('2020-10-26T11:06:47'), "Hello"),
new post("8",  "Ava.jpg", "incredible19", new Date('2020-07-13T19:47:52'), "Hello, it's me."),
new post("9",  "Ava.jpg", "incredible37", new Date('2020-10-29T02:51:23'), "Hello"),
new post("10", "Ava.jpg", "incredible4",  new Date('2020-05-08T07:21:44'), "Hello"),
new post("11", "Ava.jpg", "incredible26", new Date('2020-10-17T22:44:47'), "Hello"),
new post("12", "Ava.jpg", "incredible50", new Date('2020-11-09T21:23:19'), "Hello"),
new post("13", "Ava.jpg", "incredible23", new Date('2020-01-16T14:35:16'), "Hello"),
new post("14", "Ava.jpg", "incredible51", new Date('2020-05-09T14:40:46'), "Hello"),
new post("15", "Ava.jpg", "incredible28", new Date('2020-11-02T02:45:26'), "Hello"),
new post("16", "Ava.jpg", "incredible7",  new Date('2020-09-05T21:06:50'), "Hello"),
new post("17", "Ava.jpg", "incredible41", new Date('2020-01-03T12:23:09'), "Hello"),
new post("18", "Ava.jpg", "incredible24", new Date('2020-05-12T08:46:20'), "Hello"),
new post("19", "Ava.jpg", "incredible9",  new Date('2020-06-14T02:39:24'), "Hello"),
new post("20", "Ava.jpg", "incredible49", new Date('2020-06-20T18:38:58'), "Hello"),
new post("21", "Ava.jpg", "incredible4",  new Date('2020-08-16T00:27:58'), "Hello182", ["#hello"]),
new post("22", "Ava.jpg", "incredible4",  new Date('2020-10-13T00:22:08'), "Hello707", ["#hello"]),
new post("23", "Ava.jpg", "incredible4",  new Date('2020-11-10T11:57:09'), "Hello46"),
new post("24", "Ava.jpg", "incredible4",  new Date('2020-12-07T10:14:22'), "Hello111"),
new post("25", "Ava.jpg", "incredible4",  new Date('2020-12-15T02:38:40'), "Hello481"),
new post("26", "Ava.jpg", "incredible4",  new Date('2020-01-05T17:41:38'), "Hello211"),
new post("27", "Ava.jpg", "incredible4",  new Date('2020-06-07T13:53:03'), "Hello154", ["#hello", "#hai"]),
new post("28", "Ava.jpg", "incredible4",  new Date('2020-01-23T12:15:11'), "Hello564"),
new post("29", "Ava.jpg", "incredible4",  new Date('2020-07-05T20:30:55'), "Hello931"),
new post("30", "Ava.jpg", "incredible4",  new Date('2020-04-25T00:08:16'), "Hello990"),
new post("31", "Ava.jpg", "incredible5",  new Date('2020-07-10T09:20:03'), "Hello633"),
new post("32", "Ava.jpg", "incredible5",  new Date('2020-09-27T18:55:54'), "Hello468"),
new post("33", "Ava.jpg", "incredible5",  new Date('2020-12-27T12:39:01'), "Hello530", ["#hai"]),
new post("34", "Ava.jpg", "incredible5",  new Date('2020-12-20T18:54:23'), "Hello927", ["#ni hao"]),
new post("35", "Ava.jpg", "incredible5",  new Date('2020-07-19T11:25:13'), "Hello549"),
new post("36", "Ava.jpg", "incredible5",  new Date('2020-10-26T40:03:24'), "Hello616"),
new post("37", "Ava.jpg", "incredible5",  new Date('2020-12-23T17:20:30'), "Hello682"),
new post("38", "Ava.jpg", "incredible5",  new Date('2020-07-28T00:46:26'), "Hello208"),
new post("39", "Ava.jpg", "incredible5",  new Date('2020-10-22T02:59:26'), "Hello940"),
new post("40", "Ava.jpg", "incredible5",  new Date('2020-03-15T21:40:13'), "Hello999")
];


class editInfo{
	constructor(description, hashTags = [], photoLink="") {
		this.description = description;
		this.hashTags = hashTags;
		this.photoLink = photoLink;
	}
}

class filterParams {
	constructor (author, date, hashTags=[]) {
		this.author = author;
		this.date = date;
		this.hashTags = hashTags;
	}
}

function inOneDay(date1, date2) {
	return date1.getFullYear() == date2.getFullYear()
		 && date1.getMonth() == date2.getMonth()
		 && date1.getDate() == date2.getDate();
}

function hasAnyTag(hashTagsOfPost, hashTags) {
	return hashTagsOfPost.some(hashTagOfPost=>(hashTags.some(hashTag=>hashTag==hashTagOfPost)));
}

function getPostsByFilter(filterConfig) {
	return posts.filter(element=>
		(element.author == filterConfig.author) &&
		((filterConfig.date == null) || inOneDay(element.createdAt, filterConfig.date)) &&
		 ((filterConfig.hashTags == []) || hasAnyTag(element.hashTags, filterConfig.hashTags))
		 );
}

function compDates(x, y) {
	return x.createdAt < y.createdAt ? -1 : x.createdAt > y.createdAt ? 1 : 0;
}

function getPosts(filterConfig, skip=0, top=10) {
	if (skip < 0 || top <= 0) {
		return [];
	}
	let postsByFilter = getPostsByFilter(filterConfig).sort(compDates);
	return postsByFilter.slice(skip, skip + top);
}

function getPost(ID) {
	return posts.find(function(item, index, array) {
		return item.id == ID;
	});
}

function validatePost(somePost) {
	return somePost.description.length > 0 && somePost.description.length < 200 &&
	 somePost.author.length > 0;
}

function addPost(somePost) {
	if (!validatePost(somePost)) {
		return false;
	}
	posts.push(somePost);
	return true;
}

function editPost(ID, edit) {
	let edPost = getPost(ID);
	if (edPost==undefined) {
		return false;
	}
	if (!validatePost(edPost)) {
		return false;
	}
	let index = posts.indexOf(edPost);
	edPost.description = edit.description;
	edPost.hashTags = edit.hashTags;
	edPost.photoLink = edit.photoLink;
	if (!validatePost(edPost)) {
		return false;
	}
	posts[index] = edPost;
	return true;
}

function removePost(ID) {
	let edPost = getPost(ID);
	if (edPost == undefined) {
		return false;
	}
	let index = posts.indexOf(edPost);
	posts.splice(index, 1);
	return true;
}

function printLengthOfArray(arr) {
	document.write('The length of posts ' + arr.length + '<br\/>');
}

function outputAllPosts(arrayPosts) {
	if (arrayPosts.length == 0) {
		document.write("No any posts");
	}
	else {
		arrayPosts.forEach(p=>p.output());
	}
}

function printSpace() {
	document.write('<br\/>');
}

printLengthOfArray(posts);
printSpace();
document.write("The testing of function removePost()<br\/>");

document.write(removePost(12) + '<br\/>');
printLengthOfArray(posts);
printSpace();

document.write(removePost(12) + '<br\/>');
printLengthOfArray(posts);
printSpace();
printSpace();

document.write("The testing of function getPost()");
printSpace();

let testPost = getPost(15);
if (testPost != null) {
	testPost.output();
}
else {
	document.write('No such post');
}

testPost = getPost(105);
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


let postsOfAuthor = getPosts(new filterParams("incredible4", new Date(2020,5,7), ["#hello"]));
outputAllPosts(postsOfAuthor);
printSpace();

postsOfAuthor = getPosts(new filterParams("incredible5", null, ["#hai", "#ni hao"]));
outputAllPosts(postsOfAuthor);
printSpace();

postsOfAuthor = getPosts(new filterParams("lol", null, ["#hello"]));
outputAllPosts(postsOfAuthor);
printSpace();
printSpace();

document.write("The testing of function addPost()");
printSpace();

document.write(addPost(
	new post("231", "Ava.jpg", "NewUser", new Date('2020-03-23T16:21:40'), 'I am new user')));
printSpace();
printLengthOfArray(posts);
printSpace();
getPost("231").output();
document.write(addPost(
	new post("231", "Ava.jpg", "Lalla", new Date('2029-03-23T16:21:40'), 'New text')));

printSpace();
printLengthOfArray(posts);
printSpace();
document.write("The testing of function editPost()");
printSpace();
getPost("23").output();
document.write(editPost("23", new editInfo("haha")));
printSpace();
getPost("23").output();
printSpace();
}
)();