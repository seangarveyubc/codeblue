package com.awesometsproject;

import android.os.Bundle;
import android.util.Log;

import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;

import com.awesometsproject.backgroundTask.BackgroundWorker;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import java.util.concurrent.TimeUnit;

public class MainActivity extends ReactActivity {
  private PeriodicWorkRequest request;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  @Override
  protected void onStart(){
    super.onStart();
    Log.d("TAG", "MainActivity on start called");
    //request = new PeriodicWorkRequest.Builder(BackgroundWorker.class, 8, TimeUnit.SECONDS).build();
    //WorkManager.getInstance(getApplicationContext()).enqueue(request);
    WorkManager.getInstance(getApplicationContext()).cancelUniqueWork("testWork");
  }


  @Override
  public void onStop() {
    Log.d("TAG", "MainActivity on stop called");
    request = new PeriodicWorkRequest.Builder(BackgroundWorker.class, 5, TimeUnit.SECONDS).build();
    WorkManager.getInstance(getApplicationContext()).enqueueUniquePeriodicWork("testWork", ExistingPeriodicWorkPolicy.REPLACE, request);
    super.onStop();
  }
  
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "CodeBlue";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }
}
