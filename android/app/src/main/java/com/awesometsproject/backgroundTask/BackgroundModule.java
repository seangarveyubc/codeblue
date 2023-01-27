package com.awesometsproject.backgroundTask;

import android.content.Context;
import android.util.Log;

import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.TimeUnit;

import javax.annotation.Nonnull;

public class BackgroundModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "BackgroundWorkManager";

    private Context mContext;
    private PeriodicWorkRequest workRequest;

    BackgroundModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        workRequest = new PeriodicWorkRequest.Builder(BackgroundWorker.class, 5, TimeUnit.SECONDS).build();
    }

    @ReactMethod
    public void startBackgroundWork() {
        Log.d("TAG", "Start background service");
        //WorkManager.getInstance(mContext).enqueueUniquePeriodicWork("testWork", ExistingPeriodicWorkPolicy.REPLACE, workRequest);
    }

    @ReactMethod
    public void stopBackgroundWork() {
        WorkManager.getInstance(mContext).cancelUniqueWork("testWork");
    }

    @Nonnull
    @Override
    public String getName() {
        return MODULE_NAME;
    }
}