package com.cm_restaurant;
/**
 * Created by aiden on 2017-09-14.
 */

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 线程管理类
 *
 * @author lenovo
 *
 */
public class ThreadPoolManager {
    private ExecutorService service;

    private ThreadPoolManager() {
        int num = Runtime.getRuntime().availableProcessors() * 20;
        service = Executors.newFixedThreadPool(num);
    }

    private static final ThreadPoolManager manager = new ThreadPoolManager();

    public static ThreadPoolManager getInstance() {
        return manager;
    }

    public void executeTask(Runnable runnable) {
        service.execute(runnable);
    }

}
