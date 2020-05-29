package UtilClasses;

import java.util.ArrayList;
import java.util.List;

public class EditInfo {
    public String description;
    public List<String> hashTags;

    public EditInfo(String description, List<String> hashTags) {
        this.description =description;
        this.hashTags = new ArrayList<>();
        this.hashTags.addAll(hashTags);
    }

    public boolean validate() {
        return !description.isEmpty() &&
                hashTags.stream()
                .allMatch(hashTag -> !hashTag.isEmpty() && hashTag.charAt(0) == '#');
    }
}
