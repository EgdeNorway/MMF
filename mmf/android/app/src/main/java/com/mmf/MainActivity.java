package com.mmf;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.ReactInstanceManager;

import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import android.os.Bundle;
import android.content.Intent;

import me.digi.sdk.core.DigiMeClient;
import me.digi.sdk.core.entities.CAAccounts;
import me.digi.sdk.core.session.CASession;
import me.digi.sdk.core.SDKException;
import me.digi.sdk.core.SDKListener;
import me.digi.sdk.core.entities.CAFileResponse;
import me.digi.sdk.core.entities.CAFiles;
import me.digi.sdk.core.internal.AuthorizationException;

import com.google.gson.JsonElement;

public class MainActivity extends ReactActivity implements SDKListener {

    private ReactInstanceManager reactInstanceManager;
    private ReactRootView reactRootView;

    @Override
    protected String getMainComponentName() {
        return "mmf";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    };

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        DigiMeClient.getInstance().getAuthManager().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void sessionCreated(CASession session) {
    }

    @Override
    public void sessionCreateFailed(SDKException reason) {
    }

    @Override
    public void authorizeSucceeded(CASession session) {
        DigiMeClient.getInstance().getFileList(null);
    }

    @Override
    public void authorizeDenied(AuthorizationException reason) {
    }

    @Override
    public void authorizeFailedWithWrongRequestCode() {
    }

    @Override
    public void clientRetrievedFileList(CAFiles files) {
        DigiMeClient.getInstance().getAccounts(null);
    }

    @Override
    public void clientFailedOnFileList(SDKException reason) {
    }

    @Override
    public void contentRetrievedForFile(String fileId, CAFileResponse content) {
    }

    @Override
    public void jsonRetrievedForFile(String fileId, JsonElement content) {
    }

    @Override
    public void contentRetrieveFailed(String fileId, SDKException reason) {
    }

    @Override
    public void accountsRetrieved(CAAccounts accounts) {
    }

    @Override
    public void accountsRetrieveFailed(SDKException reason) {
    }

    private void updateCounters() {

    }
}