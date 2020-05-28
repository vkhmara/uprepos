class Post {
    fromJSON(post) {
        this.id = post.id;
        this.author = post.author;
        this.createdAt = new Date(post.createdAt);
        this.description = post.description;
        this.hashTags = post.hashTags;
        this.likes = post.likes;
        return this;
    }

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

    fromObj(obj) {
        this.description = obj.description;
        this.hashTags = [];
        obj.hashTags.forEach(item => this.hashTags.push(item));
        return this;
    }
}

class DateInterval {
    constructor (left, right) {
        this.left = left;
        this.right = right;
    }
    fromObj(obj) {
        this.left = obj.left;
        this.right = obj.right;
        return this;
    }
}

class FilterParams {
    constructor (author, dateInterval, hashTags=[]) {
        this.author = author;
        this.dateInterval = dateInterval;
        this.hashTags = hashTags;
    }

    fromObject(obj) {
        this.author = obj.author;
        this.dateInterval = new DateInterval();
        this.dateInterval.left = new Date(obj.dateInterval.left);
        this.dateInterval.right = new Date(obj.dateInterval.right);
        this.hashTags = [];
        obj.hashTags.forEach(item => this.hashTags.push(item));
        return this;
    }

    validate() {
        return (this.hashTags.length === 0 || this.hashTags.every(item => item !== "" && item[0]==='#'))
            && !isNaN(this.dateInterval.left) && !isNaN(this.dateInterval.right);
    }
}
