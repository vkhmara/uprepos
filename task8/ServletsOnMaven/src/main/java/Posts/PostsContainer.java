package Posts;

import Posts.UtilClasses.DateInterval;
import Posts.UtilClasses.EditInfo;
import Posts.UtilClasses.FilterParams;

import java.time.LocalDateTime;
import java.util.*;

public class PostsContainer {

    private static HashMap<String, Post> posts = new HashMap<>();

    private PostsContainer() {}

    public static int size() {
        return posts.size();
    }

    public static Post getPostByID(String id) {
        return posts.get(id);
    }

    public static boolean addPost(Post post) {
        if (getPostByID(post.getId()) == null && post.validatePost()) {
            posts.put(post.getId(), copyPost(post));
            return true;
        }
        return false;
    }

    public static boolean liesInInterval(LocalDateTime date, DateInterval dateInterval) {
        return dateInterval == null || dateInterval.left.isBefore(date) && date.isBefore(dateInterval.right);
    }

    public static boolean hasAnyTag(List<String> hashTagsOfPost, List<String> hashTags) {
        for (String hashTag : hashTagsOfPost) {
            if (hashTags.contains(hashTag)) {
                return true;
            }
        }
        return false;
    }

    public static int compDatesOfPosts(Post x, Post y) {
        return x.getCreatedAt().isBefore(y.getCreatedAt()) ? 1 : y.getCreatedAt().isBefore(x.getCreatedAt()) ? -1 : 0;
    }

    public static Post copyPost(Post post) {
        return new Post(post);
    }

    public static List<Post> getPostsByFilter(FilterParams filterParams) {
        List<Post> filteredPosts = new ArrayList<>();
        if (filterParams == null) {
            posts.forEach((key, value)->filteredPosts.add(value));
        }
        else {
            posts.forEach((key, element) -> {
                if ((filterParams.author.equals("") || element.getAuthor().equals(filterParams.author)) &&
                        (liesInInterval(element.getCreatedAt(), filterParams.dateInterval)) &&
                        (filterParams.hashTags.isEmpty() || hasAnyTag(element.getHashTags(), filterParams.hashTags))) {
                    filteredPosts.add(element);
                }
            });
        }
        return filteredPosts;
    }

    public static List<Post> getPostsFromInterval(FilterParams filterParams, Integer skipParam, Integer countParam) {
        int skip, count;
        if (skipParam == null) {
            skip = 0;
        } else {
            skip = skipParam;
        }
        if (countParam == null) {
            count = 10;
        } else {
            count = countParam;
        }
        List<Post> filteredPosts = new ArrayList<>();
        if (count <= 0) {
            return filteredPosts;
        }
        filteredPosts = getPostsByFilter(filterParams);
        filteredPosts.sort(PostsContainer::compDatesOfPosts);
        if (skip >= filteredPosts.size()) {
            return new ArrayList<>();
        }
        return filteredPosts.subList(Math.min(skip, filteredPosts.size() - 1), Math.min(skip + count, filteredPosts.size()));
    }

    public static boolean editPost(String id, EditInfo edit) {
        Post post = getPostByID(id);
        if (post == null) {
            return false;
        }

        Post edPost = copyPost(post);

        if (!edit.description.equals("")) {
            edPost.setDescription(edit.description);
        }

        if (!edit.hashTags.isEmpty()) {
            edPost.setHashTags(edit.hashTags);
        }

        if (!edPost.validatePost()) {
            return false;
        }

        posts.put(id, edPost);
        return true;
    }

    public static boolean removePost(String id) {
        Post post = getPostByID(id);
        if (post == null) {
            return false;
        }
        posts.remove(post.getId(), post);
        return true;
    }

    public static void addAll(List<Post> postsCont) {
        postsCont.forEach(PostsContainer::addPost);
    }

    public static int takeLike(String id, String authorOfLike) {
        Post post = getPostByID(id);
        if (post == null) {
            return 0;
        }
        return post.takeLike(authorOfLike);
    }

}
