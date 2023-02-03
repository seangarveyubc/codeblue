package com.awesometsproject.backgroundTask;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class BackgroundModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "BackgroundTask";
    private static ReactApplicationContext reactContext;

    public BackgroundModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void startService() {
        this.reactContext.startService(new Intent(this.reactContext, BackgroundService.class));
    }
}