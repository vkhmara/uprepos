package Posts.UtilClasses;

import java.util.ArrayList;
import java.util.List;

public class FilterParams {
    public String author;
    public DateInterval dateInterval;
    public List<String> hashTags;
    public FilterParams(String author, DateInterval dateInterval, List<String> hashTags) {
        this.author = author;
        this.dateInterval = dateInterval;
        this.hashTags = new ArrayList<>(hashTags);
    }
}
