package Posts.UtilClasses;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import net.dongliu.gson.GsonJava8TypeAdapterFactory;

public class JSONDecorator {
    private static Gson gson = new GsonBuilder().registerTypeAdapterFactory(new GsonJava8TypeAdapterFactory()).create();

    private JSONDecorator() {}

    public static Gson getGson() {
        return gson;
    }

    public static String toJson(Object element) {
        return gson.toJson(element);
    }

    public static String toJson(JsonElement element) {
        return gson.toJson(element);
    }

}

