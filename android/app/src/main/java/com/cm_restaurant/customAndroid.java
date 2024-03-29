package com.cm_restaurant;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.os.RemoteException;
import android.util.Base64;
import android.util.Log;
import android.content.BroadcastReceiver;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.graphics.Bitmap;
import woyou.aidlservice.jiuiv5.ICallback;
import woyou.aidlservice.jiuiv5.IWoyouService;

/**
 * Created by aiden on 2017-09-12.
 */

public class customAndroid extends ReactContextBaseJavaModule {
    private IWoyouService woyouService;
    private BitmapUtils bitMapUtils;
    // 缺纸异常
    public final static String OUT_OF_PAPER_ACTION = "woyou.aidlservice.jiuv5.OUT_OF_PAPER_ACTION";
    // 打印错误
    public final static String ERROR_ACTION = "woyou.aidlservice.jiuv5.ERROR_ACTION";
    // 可以打印
    public final static String NORMAL_ACTION = "woyou.aidlservice.jiuv5.NORMAL_ACTION";
    // 开盖子
    public final static String COVER_OPEN_ACTION = "woyou.aidlservice.jiuv5.COVER_OPEN_ACTION";
    // 关盖子异常
    public final static String COVER_ERROR_ACTION = "woyou.aidlservice.jiuv5.COVER_ERROR_ACTION";
    // 切刀异常1－卡切刀
    public final static String KNIFE_ERROR_1_ACTION = "woyou.aidlservice.jiuv5.KNIFE_ERROR_ACTION_1";
    // 切刀异常2－切刀修复
    public final static String KNIFE_ERROR_2_ACTION = "woyou.aidlservice.jiuv5.KNIFE_ERROR_ACTION_2";
    // 打印头过热异常
    public final static String OVER_HEATING_ACITON = "woyou.aidlservice.jiuv5.OVER_HEATING_ACITON";
    // 打印机固件开始升级
    public final static String FIRMWARE_UPDATING_ACITON = "woyou.aidlservice.jiuv5.FIRMWARE_UPDATING_ACITON";

    private ServiceConnection connService =  new ServiceConnection() {
        @Override
        public void onServiceDisconnected(ComponentName name) {
            Log.i(TAG,"Service disconnected: " + name);
            woyouService = null;
        }

        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            Log.i(TAG,"Service connected: " +name);
            woyouService = IWoyouService.Stub.asInterface(service);
        }
    };
    private static final String TAG = "SunmiInnerPrinterModule";

    public customAndroid(ReactApplicationContext reactContext) {
        super(reactContext);

        Intent intent = new Intent();
        intent.setPackage("woyou.aidlservice.jiuiv5");
        intent.setAction("woyou.aidlservice.jiuiv5.IWoyouService");
        reactContext.startService(intent);
        reactContext.bindService(intent, connService, Context.BIND_AUTO_CREATE);
        bitMapUtils = new BitmapUtils(reactContext);

        IntentFilter mFilter = new IntentFilter();
        mFilter.addAction(OUT_OF_PAPER_ACTION);
        mFilter.addAction(ERROR_ACTION);
        mFilter.addAction(NORMAL_ACTION);
        mFilter.addAction(COVER_OPEN_ACTION);
        mFilter.addAction(COVER_ERROR_ACTION);
        mFilter.addAction(KNIFE_ERROR_1_ACTION);
        mFilter.addAction(KNIFE_ERROR_2_ACTION);
        mFilter.addAction(OVER_HEATING_ACITON);
        mFilter.addAction(FIRMWARE_UPDATING_ACITON);

        getReactApplicationContext().registerReceiver(receiver, mFilter);

        Log.d("PrinterReceiver", "------------ init ");
    }


      private PrinterReceiver receiver = new PrinterReceiver();
    @Override
    public String getName() {
        return "customAndroid";
    }

    @ReactMethod
    public void setFontSize(float fontsize, final Promise p) {
        final IWoyouService ss = woyouService;
        final float fs = fontsize;
        ThreadPoolManager.getInstance().executeTask(new Runnable() {
            @Override
            public void run() {
                try {
                    ss.setFontSize(fs, new ICallback.Stub() {
                        @Override
                        public void onRunResult(boolean isSuccess) {
                            if (isSuccess) {
                                p.resolve(null);
                            } else {
                                p.reject("0", isSuccess + "");
                            }
                        }

                        @Override
                        public void onReturnString(String result) {
                            p.resolve(result);
                        }

                        @Override
                        public void onRaiseException(int code, String msg) {
                            p.reject("" + code, msg);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG, "ERROR: " + e.getMessage());
                    p.reject("" + 0, e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void printerInit(final Promise p) {
        final IWoyouService printerService = woyouService;
        ThreadPoolManager.getInstance().executeTask(new Runnable() {
            @Override
            public void run() {
                try {
                    printerService.printerInit(new ICallback.Stub() {
                        @Override
                        public void onRunResult(boolean isSuccess) {
                            if (isSuccess) {
                                p.resolve(null);
                            } else {
                                p.reject("0", isSuccess + "");
                            }
                        }

                        @Override
                        public void onReturnString(String result) {
                            p.resolve(result);
                        }

                        @Override
                        public void onRaiseException(int code, String msg) {
                            p.reject("" + code, msg);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG, "ERROR: " + e.getMessage());
                    p.reject("" + 0, e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void printTextWithFont(String text, String typeface, float fontsize, final Promise p) {
        final IWoyouService ss = woyouService;
        final String txt = text;
        final String tf = typeface;
        final float fs = fontsize;
        ThreadPoolManager.getInstance().executeTask(new Runnable() {
            @Override
            public void run() {
                try {
                    ss.printTextWithFont(txt, tf, fs, new ICallback.Stub() {
                        @Override
                        public void onRunResult(boolean isSuccess) {
                            if (isSuccess) {
                                p.resolve(null);
                            } else {
                                p.reject("0", isSuccess + "");
                            }
                        }

                        @Override
                        public void onReturnString(String result) {
                            p.resolve(result);
                        }

                        @Override
                        public void onRaiseException(int code, String msg) {
                            p.reject("" + code, msg);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG, "ERROR: " + e.getMessage());
                    p.reject("" + 0, e.getMessage());
                }
            }
        });
    }




    @ReactMethod                                                            //rn方法 简单打印text
    public void printOriginalText(String text,final Promise p){
        final IWoyouService ss = woyouService;
        final String txt = text;
        ThreadPoolManager.getInstance().executeTask(new Runnable(){
            @Override
            public void run() {
                try {
                    ss.printOriginalText(txt,new ICallback.Stub(){
                        @Override
                        public void onRunResult(boolean isSuccess){
                            if(isSuccess){
                                p.resolve(null);
                            }else{
                                p.reject("0",isSuccess+"");
                            }
                        }
                        @Override
                        public void onReturnString(String result){
                            p.resolve(result);
                        }
                        @Override
                        public void  onRaiseException(int code, String msg){
                            p.reject(""+code,msg);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG,"ERROR: " + e.getMessage());
                    p.reject(""+0,e.getMessage());
                }
            }
        });
    }
    @ReactMethod
    public void printQr(String data, int modulesize, int errorlevel) {
        final IWoyouService ss = woyouService;


        try {
            ss.setAlignment(1, null);
            ss.printQRCode(data, modulesize, errorlevel, null);
            ss.lineWrap(3, null);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void lineWrap(int n,final Promise p){                //走纸n行
        final IWoyouService ss = woyouService;
        final int count  = n;
        ThreadPoolManager.getInstance().executeTask(new Runnable(){
            @Override
            public void run() {
                try {
                    ss.lineWrap(count,new ICallback.Stub(){
                        @Override
                        public void onRunResult(boolean isSuccess){
                            if(isSuccess){
                                p.resolve(null);
                            }else{
                                p.reject("0",isSuccess+"");
                            }
                        }
                        @Override
                        public void onReturnString(String result){
                            p.resolve(result);
                        }
                        @Override
                        public void  onRaiseException(int code, String msg){
                            p.reject(""+code,msg);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG,"ERROR: " + e.getMessage());
                    p.reject(""+0,e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void printColumnsText(final String[] colsTextArr, final int[] colsWidthArr, final int[] colsAlign, final Promise p){                //走纸n行
        final IWoyouService ss = woyouService;

        ThreadPoolManager.getInstance().executeTask(new Runnable(){
            @Override
            public void run() {
                try {
                    ss.printColumnsText(colsTextArr, colsWidthArr, colsAlign,new ICallback.Stub(){
                        @Override
                        public void onRunResult(boolean isSuccess){
                            if(isSuccess){
                                p.resolve(null);
                            }else{
                                p.reject("0",isSuccess+"");
                            }
                        }
                        @Override
                        public void onReturnString(String result){
                            p.resolve(result);
                        }
                        @Override
                        public void  onRaiseException(int code, String msg){
                            p.reject(""+code,msg);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG,"ERROR: " + e.getMessage());
                    p.reject(""+0,e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void printLine(String item0, String item1, String item2, int width0,int width1,int width2,int align0, int align1, int align2)
    {
        TableItem item = new TableItem();
        String[] itemTitle={item0,item1,item2};
        item.setText(itemTitle);
        int[] align={align0,align1,align2};
        item.setAlign(align);
        int[] width={width0,width1,width2};
        item.setWidth(width);
        printTable(item);
    }
    public void printTps(String item0, String item2, int width0,int width2,int align0, int align2)
    {
        TableItem item = new TableItem();
        String[] itemTitle={item0,item2};
        item.setText(itemTitle);
        int[] align={align0,align2};
        item.setAlign(align);
        int[] width={width0,width2};
        item.setWidth(width);
        printTable(item);
    }

    public void printTable(TableItem tableItem) {


        try {

            Log.i("kaltin", "printTable: "+tableItem.getText()[0]+tableItem.getText()[1]+tableItem.getText()[2]);
            Log.i("printing",tableItem.getText()[0]);
            woyouService.printColumnsText(tableItem.getText(), tableItem.getWidth(), tableItem.getAlign(), null);

            woyouService.lineWrap(1, null);
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void printBitmap(String data,int width,int height,final Promise p){              //打印bitmap，data为图片encode后编码
        try{
            Log.d("data", data);
            final IWoyouService ss = woyouService;
            byte[] decoded = Base64.decode(data, Base64.DEFAULT);


            final Bitmap bitMap = bitMapUtils.decodeBitmap(decoded,width,height);
            ThreadPoolManager.getInstance().executeTask(new Runnable(){
                @Override
                public void run() {
                    try {
                        ss.printBitmap(bitMap,new ICallback.Stub(){
                            @Override
                            public void onRunResult(boolean isSuccess){
                                if(isSuccess){
                                    p.resolve(null);
                                }else{
                                    p.reject("0",isSuccess+"");
                                }
                            }
                            @Override
                            public void onReturnString(String result){
                                p.resolve(result);
                            }
                            @Override
                            public void  onRaiseException(int code, String msg){
                                p.reject(""+code,msg);
                            }
                        });
                    } catch (Exception e) {
                        e.printStackTrace();
                        Log.i(TAG,"ERROR: " + e.getMessage());
                        p.reject(""+0,e.getMessage());
                    }
                }
            });
        }catch(Exception e){
            e.printStackTrace();
            Log.i(TAG,"ERROR: " + e.getMessage());
        }
    }

    public class PrinterReceiver extends BroadcastReceiver {
        public PrinterReceiver() {
        }

        @Override
        public void onReceive(Context context, Intent data) {
            String action = data.getAction();
            String type = "PrinterStatus";
            Log.d("PrinterReceiver", action);
            getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(type, action);
        }
    }
}
