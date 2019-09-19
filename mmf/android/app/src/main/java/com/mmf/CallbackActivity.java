package com.mmf;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.List;
import java.util.Locale;

import me.digi.sdk.core.entities.CAAccounts;
import me.digi.sdk.core.session.CASession;
import me.digi.sdk.core.DigiMeAuthorizationManager;
import me.digi.sdk.core.DigiMeClient;
import me.digi.sdk.core.SDKCallback;
import me.digi.sdk.core.SDKException;
import me.digi.sdk.core.SDKResponse;
import me.digi.sdk.core.entities.CAFileResponse;
import me.digi.sdk.core.entities.CAFiles;

/**
 * Created by GITBACIT team May 2019 for Egde Consulting AS
 */
public class CallbackActivity extends AppCompatActivity {

    private static final String TAG = "DemoCallbackActivity";
    private SDKCallback<CASession> cb;
    private DigiMeAuthorizationManager authManager;
    private TextView statusText;
    private TextView accountInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_callback);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        this.cb = new SDKCallback<CASession>() {
            @Override
            public void succeeded(SDKResponse<CASession> result) {
                writeStatus("Session authorized!");
                requestFileList();
            }

            @Override
            public void failed(SDKException exception) {
                writeStatus("Authorization failed!");
                Log.d(TAG, exception.getMessage());
            }
        };

        final Button startButton = findViewById(R.id.start_button);
        startButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startButton.setVisibility(View.GONE);
                DigiMeClient.getInstance().authorize(CallbackActivity.this, cb);
            }
        });

        statusText = findViewById(R.id.callback_status);
        accountInfo = findViewById(R.id.account_info);

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (authManager != null) {
            authManager.onActivityResult(requestCode, resultCode, data);
        }
    }

    public void requestFileList() {
        DigiMeClient.getInstance().getFileList(new SDKCallback<CAFiles>() {
            @Override
            public void succeeded(SDKResponse<CAFiles> result) {
                requestAccounts();
                CAFiles files = result.body;
                getFileContent(files.fileIds);
            }

            @Override
            public void failed(SDKException exception)  {
                writeStatus("Failed to fetch list" + exception.getMessage());

            }
        });
    }

    public void getFileContent(List<String> fileIds) {
        for (final String fileId : fileIds) {
            DigiMeClient.getInstance().getFileContent(fileId, new SDKCallback<CAFileResponse>() {
                @Override
                public void succeeded(SDKResponse<CAFileResponse> result) {
                    writeStatus("Content retrieved");
                    Log.d(TAG, "Content for file " + fileId + ": " + result.body.fileContent);
                }

                @Override
                public void failed(SDKException exception) {
                    Log.d(TAG, "Failed to retrieve file content for file: " + fileId + "; Reason: " + exception);
                }
            });
        }
    }

    public void requestAccounts() {
        accountInfo.setText(R.string.fetch_accounts);
        DigiMeClient.getInstance().getAccounts(new SDKCallback<CAAccounts>() {
            @Override
            public void succeeded(SDKResponse<CAAccounts> result) {
                accountInfo.setText(String.format(Locale.getDefault(),"Returning data for %d accounts: %s", result.body.accounts.size(), result.body.getAllServiceNames()));
            }

            @Override
            public void failed(SDKException exception) {
                Log.d(TAG, "Failed to retrieve account details for session. Reason: " + exception);
                accountInfo.setText(R.string.account_fail);
            }
        });
    }

    private void writeStatus(String status) {
        statusText.setText(status);
        Log.d(TAG, status);
    }

}