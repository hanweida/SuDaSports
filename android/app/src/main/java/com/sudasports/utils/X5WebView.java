package com.sudasports.utils;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.os.Build;
import android.util.AttributeSet;
import android.view.View;
import android.widget.TextView;

import com.tencent.smtt.export.external.interfaces.WebResourceRequest;
import com.tencent.smtt.export.external.interfaces.WebResourceResponse;
import com.tencent.smtt.sdk.QbSdk;
import com.tencent.smtt.sdk.WebSettings;
import com.tencent.smtt.sdk.WebSettings.LayoutAlgorithm;
import com.tencent.smtt.sdk.WebView;
import com.tencent.smtt.sdk.WebViewClient;

public class X5WebView extends WebView {

	public String mHomeUrl = "http://nba.tmiaoo.com";
	public void setUrl(String url){
		System.out.println("setUrl success");
		mHomeUrl = url;
	}

	TextView title;
	private WebViewClient client = new WebViewClient() {

		@Override
		public WebResourceResponse shouldInterceptRequest(WebView webView, WebResourceRequest webResourceRequest) {

			if(webResourceRequest.getUrl().getHost().contains("mm.jgchq.com") || webResourceRequest.getUrl().getHost().matches("sy.(.*).com")){
				System.out.println("shouldInterceptRequest" + webResourceRequest.getUrl().getHost());
				return new WebResourceResponse();
			}
			return super.shouldInterceptRequest(webView, webResourceRequest);
		}

		@Override
		public boolean shouldOverrideUrlLoading(WebView view, String url) {
			if(url.contains("mm.jgchq.com")){
				System.out.println("shouldOverrideUrlLoading" + url);
			}
			view.loadUrl("javascript:alert("+url+");");
			return false;
		}

		@Override
		public void onPageFinished(WebView view, String url) {
			super.onPageFinished(view, url);
			System.out.println("shouldOverrideUrlLoading" + url);
			view.loadUrl("javascript:alert('aaaaa');");
			// mTestHandler.sendEmptyMessage(MSG_OPEN_TEST_URL);
			//mTestHandler.sendEmptyMessageDelayed(MSG_OPEN_TEST_URL, 5000);// 5s?
				/* mWebView.showLog("test Log"); */
		}


	};

	@SuppressLint("SetJavaScriptEnabled")
	public X5WebView(Context arg0, AttributeSet arg1) {
		super(arg0, arg1);
		this.setWebViewClient(client);
		// this.setWebChromeClient(chromeClient);
		// WebStorage webStorage = WebStorage.getInstance();
		initWebViewSettings();
		this.getView().setClickable(true);
	}

	private void initWebViewSettings() {
		WebSettings webSetting = this.getSettings();
		webSetting.setJavaScriptEnabled(true);
		webSetting.setJavaScriptCanOpenWindowsAutomatically(true);
		webSetting.setAllowFileAccess(true);
		webSetting.setLayoutAlgorithm(LayoutAlgorithm.NARROW_COLUMNS);
		webSetting.setSupportZoom(true);
		webSetting.setBuiltInZoomControls(true);
		webSetting.setUseWideViewPort(true);
		webSetting.setSupportMultipleWindows(true);
		webSetting.setLoadWithOverviewMode(true);
		webSetting.setAppCacheEnabled(true);
		webSetting.setDatabaseEnabled(true);
		webSetting.setDomStorageEnabled(true);
		webSetting.setGeolocationEnabled(true);
		webSetting.setAppCacheMaxSize(Long.MAX_VALUE);
		//webSetting.setPageCacheCapacity(IX5WebSettings.DEFAULT_CACHE_CAPACITY);
		webSetting.setPluginState(WebSettings.PluginState.ON_DEMAND);
		webSetting.setRenderPriority(WebSettings.RenderPriority.HIGH);
		webSetting.setCacheMode(WebSettings.LOAD_DEFAULT);
	}

//	@Override
//	protected boolean drawChild(Canvas canvas, View child, long drawingTime) {
//		boolean ret = super.drawChild(canvas, child, drawingTime);
//		canvas.save();
//		Paint paint = new Paint();
//		paint.setColor(0x7fff0000);
//		paint.setTextSize(24.f);
//		paint.setAntiAlias(true);
//		if (getX5WebViewExtension() != null) {
//			canvas.drawText(this.getContext().getPackageName() + "-pid:"
//					+ android.os.Process.myPid(), 10, 50, paint);
//			canvas.drawText(
//					"X5  Core:" + QbSdk.getTbsVersion(this.getContext()), 10,
//					100, paint);
//		} else {
//			canvas.drawText(this.getContext().getPackageName() + "-pid:"
//					+ android.os.Process.myPid(), 10, 50, paint);
//			canvas.drawText("Sys Core", 10, 100, paint);
//		}
//		canvas.drawText(Build.MANUFACTURER, 10, 150, paint);
//		canvas.drawText(Build.MODEL, 10, 200, paint);
//		canvas.restore();
//		return ret;
//	}
	@Override
	public void setWebViewClient(WebViewClient webViewClient) {
		super.setWebViewClient(webViewClient);
	}

	@SuppressLint("SetJavaScriptEnabled")
	public X5WebView(Context arg0) {
		super(arg0);
		this.setWebViewClient(client);
		// this.setWebChromeClient(chromeClient);
		// WebStorage webStorage = WebStorage.getInstance();
		initWebViewSettings();
		this.getView().setClickable(true);
		setBackgroundColor(85621);
		this.loadUrl(mHomeUrl);
	}
}
