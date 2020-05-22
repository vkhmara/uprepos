package Posts;

import java.time.LocalDateTime;
import java.util.*;

public class PostsContainer {

    private static HashMap<String, Post> posts = new HashMap<>();

    private PostsContainer() {}

    static class DateInterval {
        LocalDateTime left;
        LocalDateTime right;
    }

    static class FilterParams {
        String author;
        DateInterval dateInterval;
        List<String> hashTags;
    }

    static class EditInfo {
        String description;
        List<String> hashTags;
    }

    public static int size() {
        return posts.size();
    }

//    public static String fill() {
//        StringBuilder str = new StringBuilder();
//        str.append("[\n");
//        str.append(new Post("1", "incredible2", LocalDateTime.parse("2020-06-24T22:47:41"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("2", "incredible6", LocalDateTime.parse("2020-09-22T06:18:04"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("3", "incredible12", LocalDateTime.parse("2020-02-08T01:05:05"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("4", "incredible20", LocalDateTime.parse("2020-01-14T14:55:11"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("5", "incredible30", LocalDateTime.parse("2020-05-09T14:24:51"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("6", "incredible42", LocalDateTime.parse("2020-12-28T20:21:22"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("7", "incredible3", LocalDateTime.parse("2020-10-26T11:06:47"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("8", "incredible19", LocalDateTime.parse("2020-07-13T19:47:52"), "Hello, it's me.", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("9", "incredible37", LocalDateTime.parse("2020-10-29T02:51:23"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("10", "incredible4", LocalDateTime.parse("2020-05-08T07:21:44"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("11", "incredible26", LocalDateTime.parse("2020-10-17T22:44:47"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("12", "incredible50", LocalDateTime.parse("2020-11-09T21:23:19"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("13", "incredible23", LocalDateTime.parse("2020-01-16T14:35:16"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("14", "incredible51", LocalDateTime.parse("2020-05-09T14:40:46"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("15", "incredible28", LocalDateTime.parse("2020-11-02T02:45:26"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("16", "incredible7", LocalDateTime.parse("2020-09-05T21:06:50"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("17", "incredible41", LocalDateTime.parse("2020-01-03T12:23:09"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("18", "incredible24", LocalDateTime.parse("2020-05-12T08:46:20"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("19", "incredible9", LocalDateTime.parse("2020-06-14T02:39:24"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("20", "incredible49", LocalDateTime.parse("2020-06-20T18:38:58"), "Hello", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("21", "incredible4", LocalDateTime.parse("2020-08-16T00:27:58"), "Hello182", new ArrayList<>(Collections.singleton("#hello")), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("22", "incredible4", LocalDateTime.parse("2020-10-13T00:22:08"), "Hello707", Arrays.asList("#hello"), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("23", "incredible4", LocalDateTime.parse("2020-11-10T11:57:09"), "Hello46", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("24", "incredible4", LocalDateTime.parse("2020-12-07T10:14:22"), "Hello111", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("25", "incredible4", LocalDateTime.parse("2020-12-15T02:38:40"), "Hello481", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("26", "incredible4", LocalDateTime.parse("2020-01-05T17:41:38"), "Hello211", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("27", "incredible4", LocalDateTime.parse("2020-06-07T13:53:03"), "Hello154", Arrays.asList("#hello", "hai"), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("28", "incredible4", LocalDateTime.parse("2020-01-23T12:15:11"), "Hello564", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("29", "incredible4", LocalDateTime.parse("2020-07-05T20:30:55"), "Hello931", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("30", "incredible4", LocalDateTime.parse("2020-04-25T00:08:16"), "Hello990", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("31", "incredible5", LocalDateTime.parse("2020-07-10T09:20:03"), "Hello633", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("32", "incredible5", LocalDateTime.parse("2020-09-27T18:55:54"), "Hello468", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("33", "incredible5", LocalDateTime.parse("2020-12-27T12:39:01"), "Hello530", Arrays.asList("#hai"), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("34", "incredible5", LocalDateTime.parse("2020-12-20T18:54:23"), "Hello927", Arrays.asList("#ni hao"), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("35", "incredible5", LocalDateTime.parse("2020-07-19T11:25:13"), "Hello549", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("36", "incredible5", LocalDateTime.parse("2020-10-26T04:03:24"), "Hello616", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("37", "incredible5", LocalDateTime.parse("2020-12-23T17:20:30"), "Hello682", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("38", "incredible5", LocalDateTime.parse("2020-07-28T00:46:26"), "Hello208", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("39", "incredible5", LocalDateTime.parse("2020-10-22T02:59:26"), "Hello940", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("\n,");
//        str.append(new Post("40", "incredible5", LocalDateTime.parse("2020-03-15T21:40:13"), "Hello999", new ArrayList<>(), new ArrayList<>(), "").toJson());
//        str.append("]");
//        return str.toString();
//    }

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

    public static List<Post> getPosts(FilterParams filterParams, Integer skip, Integer top) {
        if (skip == null) {
            skip = 0;
        }
        if (top == null) {
            top = 10;
        }
        List<Post> filteredPosts = new ArrayList<>();
        if (skip < 0 || top <= 0) {
            return filteredPosts;
        }
        filteredPosts = getPostsByFilter(filterParams);
        filteredPosts.sort(PostsContainer::compDatesOfPosts);
        return filteredPosts.subList(skip, skip + top);
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

        post = edPost;
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

    public static boolean takeLike(String id, String authorOfLike) {
        Post post = getPostByID(id);
        if (post == null) {
            return false;
        }
        post.takeLike(authorOfLike);
        return true;
    }

}
