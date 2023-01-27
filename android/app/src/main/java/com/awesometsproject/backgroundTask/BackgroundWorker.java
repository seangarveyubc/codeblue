package com.awesometsproject.backgroundTask;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

public class BackgroundWorker extends Worker {
    private final Context context;

    public BackgroundWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
        this.context = context;
    }
    @NonNull
    @Override
    public Result doWork() {
        // background work will take place here
        Log.d("TAG", "Background working...");

        Intent service = new Intent(this.context.getApplicationContext(), BackgroundHeadlessTaskService.class);
        Bundle bundle = new Bundle();

        bundle.putString("foo", "bar");
        service.putExtras(bundle);

        this.context.getApplicationContext().startService(service);

        Log.d("TAG", "Background code completed");

        // Indicate whether the work finished successfully with the Result
        return Result.success();
    }
}