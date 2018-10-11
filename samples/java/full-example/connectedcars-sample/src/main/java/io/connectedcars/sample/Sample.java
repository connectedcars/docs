package io.connectedcars.sample;

import io.connectedcars.api.ConnectedCarsApi;

public class Sample {
    public static void main(String[] args) {
        try {
            ConnectedCarsApi CCApi = Config.getCCApi();
            String result = CCApi.call("query Viewer { viewer { id email firstname } }");
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
