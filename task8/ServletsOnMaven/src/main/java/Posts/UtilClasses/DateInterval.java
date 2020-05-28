package Posts.UtilClasses;

import java.time.LocalDateTime;

public class DateInterval {
    public LocalDateTime left;
    public LocalDateTime right;
    public DateInterval(LocalDateTime left, LocalDateTime right) {
        this.left = left;
        this.right = right;
    }
}
