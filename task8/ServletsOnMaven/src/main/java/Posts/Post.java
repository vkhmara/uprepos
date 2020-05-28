package Posts;

import Posts.UtilClasses.JSONDecorator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Post {

    private String id;
    private String author;
    private LocalDateTime createdAt;
    private String description;
    private List<String> hashTags = new ArrayList<>();
    private List<String> likes = new ArrayList<>();

    public Post(String id, String author, LocalDateTime createdAt, String description,
                List<String> hashTags, List<String> likes) {
        this.setId(id);
        this.setAuthor(author);
        this.setCreatedAt(createdAt);
        this.setDescription(description);
        this.setHashTags(hashTags);
        this.setLikes(likes);
    }

    public Post(Post post) {
        this.setId(post.id);
        this.setAuthor(post.author);
        this.setCreatedAt(post.createdAt);
        this.setDescription(post.description);
        this.setHashTags(post.hashTags);
        this.setLikes(post.likes);
    }

    public boolean validatePost() {
        return id != null && author != null && createdAt != null && description != null
                 && description.length() > 0 && description.length() < 200 && author.length() > 0
                && hashTags.stream().allMatch(item -> (item.length() != 0 && item.charAt(0) == '#'));
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public void setHashTags(List<String> hashTags) {
        if (hashTags != null) {
            this.hashTags.addAll(hashTags);
        }
    }

    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        if (likes != null) {
            this.likes.addAll(likes);
        }
    }

    @Override
    public String toString() {
        return "Post{" +
                "id='" + id + '\'' +
                ", author='" + author + '\'' +
                ", createdAt=" + createdAt +
                ", description='" + description + '\'' +
                ", hashTags=" + hashTags +
                ", likes=" + likes + '\'' +
                '}';
    }

    public String toJson() {
        return JSONDecorator.getGson().toJson(this);
    }

    public int takeLike(String authorOfLike) {
        if (getLikes().contains(authorOfLike)) {
            getLikes().remove(authorOfLike);
            return -1;
        }
        else {
            getLikes().add(authorOfLike);
            return 1;
        }
    }
}
