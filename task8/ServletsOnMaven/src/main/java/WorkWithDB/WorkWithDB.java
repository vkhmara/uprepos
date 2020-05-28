package WorkWithDB;

import Posts.Post;
import UtilClasses.EditInfo;
import UtilClasses.FilterParams;
import UtilClasses.User;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


public class WorkWithDB{


    public static String getPassword(String username, DataSource dataSource) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement statementToGetPassword = conn.prepareStatement(
                    "select password from users where username = ? ");
            statementToGetPassword.setString(1, username);
            ResultSet result = statementToGetPassword.executeQuery();
            if (result.next()) {
                return result.getString(1);
            }
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void addUser(User user, DataSource dataSource) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement statementToAddUser = conn.prepareStatement(
                    "insert users values (?, ?) ");
            statementToAddUser.setString(1, user.username);
            statementToAddUser.setString(2, user.password);
            statementToAddUser.executeUpdate();
        }
        catch(SQLException e) {
            e.printStackTrace();
        }
    }

    public static int takeLike(String idOfPost, String username, DataSource dataSource) {
        try(Connection conn = dataSource.getConnection()) {

            PreparedStatement statementToGetInfoOfLike = conn.prepareStatement(
                    "select * from likes where idOfPost = ? and username = ?;");
            statementToGetInfoOfLike.setString(1, idOfPost);
            statementToGetInfoOfLike.setString(2, username);
            ResultSet result = statementToGetInfoOfLike.executeQuery();
            if (result.next()) {
                PreparedStatement statementToDeleteLike = conn.prepareStatement(
                        "delete from likes where idOfPost = ? and username = ?");
                statementToDeleteLike.setString(1, idOfPost);
                statementToDeleteLike.setString(2, username);
                statementToDeleteLike.executeUpdate();
                return -1;
            } else {
                PreparedStatement statementToInsertLike = conn.prepareStatement(
                        "insert likes(idOfPost, username) value (?, ?)");
                statementToInsertLike.setString(1, idOfPost);
                statementToInsertLike.setString(2, username);
                statementToInsertLike.executeUpdate();
                return 1;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }

    public static Post getPostById(String id, DataSource dataSource) {
        try (Connection conn = dataSource.getConnection()) {

            PreparedStatement statementToGetPostById = conn.prepareStatement(
                    "select * from posts where idOfPost=?"
            );
            statementToGetPostById.setString(1, id);
            ResultSet result = statementToGetPostById.executeQuery();
            if (!result.next()) {
                return null;
            }
            Post post = new Post(id,
                    result.getString("username"),
                    LocalDateTime.parse(result.getString("createdAt").replace(' ', 'T')),
                    result.getString("description"),
                    new ArrayList<>(),
                    new ArrayList<>());

            PreparedStatement statementToGetLikes = conn.prepareStatement(
                    "select username from likes where idOfPost = ?");
            statementToGetLikes.setString(1, id);
            result = statementToGetLikes.executeQuery();
            while (result.next()) {
                post.getLikes().add(result.getString("username"));
            }

            PreparedStatement statementToGetHashTags = conn.prepareStatement(
                    "select hashTag from hashtags where idOfPost = ?");
            statementToGetHashTags.setString(1, id);
            result = statementToGetHashTags.executeQuery();
            while (result.next()) {
                post.getHashTags().add(result.getString("hashTag"));
            }
            return post;

        } catch(SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String getLastId(DataSource dataSource) {
        try (Connection conn = dataSource.getConnection()) {
            ResultSet result = conn.prepareStatement("SELECT * FROM posts ORDER BY idOfPost DESC LIMIT 1;")
                    .executeQuery();
            result.next();
            return result.getString(1);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "0";
    }

    public static void addPost(Post post, DataSource dataSource) {
        int id = Integer.parseInt(getLastId(dataSource));
        post.setId(id + 1 + "");
        try (Connection conn = dataSource.getConnection()) {

            PreparedStatement statementToInsertPost = conn.prepareStatement(
                    "insert posts values (?, ?, ?, ?)");
            PreparedStatement statementToInsertHashTag = conn.prepareStatement(
                    "insert hashtags(hashTag, idOfPost) values (?, ?)");
            PreparedStatement statementToInsertAuthorsOfLike = conn.prepareStatement(
                    "insert likes(username, idOfPost) values (?, ?)");

            statementToInsertPost.setString(1, post.getId());
            statementToInsertPost.setString(2, post.getAuthor());
            statementToInsertPost.setString(3, post.getDescription());
            statementToInsertPost.setString(4, post.getCreatedAt().toString());
            statementToInsertPost.executeUpdate();

            post.getHashTags().forEach(hashTag -> {
                try {
                    statementToInsertHashTag.setString(1, hashTag);
                    statementToInsertHashTag.setString(2, post.getId());
                    statementToInsertHashTag.executeUpdate();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            });

            post.getLikes().forEach(authorOfLike -> {
                try {
                    statementToInsertAuthorsOfLike.setString(1, authorOfLike);
                    statementToInsertHashTag.setString(2, post.getId());
                    statementToInsertHashTag.executeUpdate();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            });

        }
        catch(SQLException e) {
            e.printStackTrace();
        }
    }

    public static void deletePost(String id, DataSource dataSource) {
        try (Connection conn = dataSource.getConnection()) {

            PreparedStatement statementToDeleteLikes = conn.prepareStatement(
                    "delete from likes where idOfPost = ?");
            statementToDeleteLikes.setString(1, id);
            statementToDeleteLikes.executeUpdate();

            PreparedStatement statementToDeleteHashTags = conn.prepareStatement(
                    "delete from hashTags where idOfPost = ?");
            statementToDeleteHashTags.setString(1, id);
            statementToDeleteHashTags.executeUpdate();

            PreparedStatement statementToDeletePost = conn.prepareStatement(
                    "delete from posts where idOfPost = ?");
            statementToDeletePost.setString(1, id);
            statementToDeletePost.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void editPost(String id, EditInfo editInfo, DataSource dataSource) {
        try (Connection conn = dataSource.getConnection()) {

            PreparedStatement statementToEditDescription = conn.prepareStatement(
                    "update posts set description = ? where idOfPost = ?");
            statementToEditDescription.setString(1, editInfo.description);
            statementToEditDescription.setString(2, id);
            statementToEditDescription.executeUpdate();

            PreparedStatement statementToInsertHashTag = conn.prepareStatement(
                    "insert hashtags(hashTag, idOfPost) values (?, ?)");
            statementToInsertHashTag.setString(2, id);

            PreparedStatement statementToFindAllHashTagsOnPost = conn.prepareStatement(
                    "select hashtag from hashtags where idOfPost = ?",
                    ResultSet.TYPE_SCROLL_SENSITIVE,
                    ResultSet.CONCUR_UPDATABLE);
            statementToFindAllHashTagsOnPost.setString(1, id);
            ResultSet resultSet = statementToFindAllHashTagsOnPost.executeQuery();

            editInfo.hashTags.forEach(hashTag -> {
                boolean has = false;
                try {
                    resultSet.beforeFirst();
                    while (resultSet.next()) {
                        if (resultSet.getString(1).equals(hashTag)) {
                            has = true;
                            break;
                        }
                    }
                    if (!has) {
                        statementToInsertHashTag.setString(1, hashTag);
                        statementToInsertHashTag.executeUpdate();
                    }

                } catch (SQLException e) {
                    e.printStackTrace();
                }

            });

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static StringBuilder getQueryFromFilter(FilterParams filterParams) {
        StringBuilder queryForFilter = new StringBuilder("select idOfPost from posts where createdAt between\"" +
                filterParams.dateInterval.left + "\" and \"" + filterParams.dateInterval.right + "\"");
        if (!filterParams.author.isEmpty()) {
            queryForFilter.append(" and username = ").append(filterParams.author);
        }
        if (!filterParams.hashTags.isEmpty()) {
            queryForFilter.append(" and idOfPost in (select idOfPost from hashtags where hashtag = ")
                    .append(filterParams.hashTags.get(0));
            if (filterParams.hashTags.size() > 1) {
                queryForFilter.append(" and hashtag = ")
                        .append(filterParams.hashTags.get(0));
            }
            queryForFilter.append(")");
        }
        return queryForFilter;
    }

    public static List<Post> getPostsFromInterval(FilterParams filterParams, int skip, int count, DataSource dataSource) {
        List<Post> posts = new ArrayList<>();
        try (Connection conn = dataSource.getConnection()) {

            PreparedStatement statementForFilter;
            StringBuilder queryForFilter = getQueryFromFilter(filterParams);
            queryForFilter.append(" order by createdAt desc limit ").append(skip).append(", ").append(count);
            statementForFilter = conn.prepareStatement(queryForFilter.toString());
            ResultSet result = statementForFilter.executeQuery();
            while (result.next()) {
                posts.add(getPostById(result.getString("idOfPost"), dataSource));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return posts;
    }

    public static int size(FilterParams filterParams, DataSource dataSource) {
        try (Connection conn = dataSource.getConnection()) {

            PreparedStatement statementForFilter;
            StringBuilder queryForFilter = getQueryFromFilter(filterParams);
            queryForFilter.insert(7, "count(");
            queryForFilter.insert(21,')');

            statementForFilter = conn.prepareStatement(queryForFilter.toString());
            ResultSet result = statementForFilter.executeQuery();
            result.next();
            return result.getInt(1);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return 0;
    }
}

//try (Connection conn = dataSource.getConnection()) {
//
//        }
//        catch (SQLException e) {
//        e.printStackTrace();
//        }