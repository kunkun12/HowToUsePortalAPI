package com.esrichina.MarketPlace.Logic;
import java.io.*;
import java.net.*;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.UUID;

import javax.net.ssl.*;

import org.json.JSONException;
import org.json.JSONObject;

public class AgsPortalLogic {

	/**
	 * @param args
	 */
	private static class TrustAnyTrustManager implements X509TrustManager {

		public void checkClientTrusted(X509Certificate[] chain, String authType)
				throws CertificateException {
		}

		public void checkServerTrusted(X509Certificate[] chain, String authType)
				throws CertificateException {
		}

		public X509Certificate[] getAcceptedIssuers() {
			return new X509Certificate[] {};
		}
	}

	private static class TrustAnyHostnameVerifier implements HostnameVerifier {
		public boolean verify(String hostname, SSLSession session) {
			return true;
		}
	}

	public static String GetToken(String PortalUrl, String username,
			String password) {
		// "username=arcgis&password=arcgis123&client=requestip&f=json"
		// portal190182.arcgiscloud.com
		String conntentdata = "username=" + username + "&password=" + password
				+ "&client=requestip&expiration=10080&f=json";
		return httsRequest("https://" + PortalUrl
				+ "/arcgis/sharing/generateToken", conntentdata);
	}

	public static String GetUserName(String PortalUrl, String token) {
		String contentdata = "token=" + token + "&f=json";
		String requesturl = "https://" + PortalUrl
				+ "/arcgis/sharing/community/self";
		String jsonstring = httsRequest(requesturl, contentdata);		
		System.out.println(jsonstring);
		String returnstring = "";
		try {
			JSONObject jsonobject = new JSONObject(jsonstring);
		if(	jsonobject.has("username")){
			returnstring = jsonobject.getString("username");
		}			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			returnstring = "";
			e.printStackTrace();
			return returnstring;
		}
		return returnstring;
	}
	public static String httsRequest(String url, String contentdata) {
		String str_return = "";
		SSLContext sc = null;
		try {
			sc = SSLContext.getInstance("SSL");
		} catch (NoSuchAlgorithmException e) {

			e.printStackTrace();
		}
		try {
			sc.init(null, new TrustManager[] { new TrustAnyTrustManager() },
					new java.security.SecureRandom());
		} catch (KeyManagementException e) {

			e.printStackTrace();
		}
		URL console = null;
		try {
			console = new URL(url);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		HttpsURLConnection conn;
		try {
			conn = (HttpsURLConnection) console.openConnection();
			conn.setRequestMethod("POST");
			conn.setSSLSocketFactory(sc.getSocketFactory());
			conn.setHostnameVerifier(new TrustAnyHostnameVerifier());
			conn.setRequestProperty("Accept", "application/json");
			conn.setDoInput(true);
			conn.setDoOutput(true);
			// contentdata="username=arcgis&password=arcgis123&client=requestip&f=json"
			String inpputs = contentdata;
			OutputStream os = conn.getOutputStream();
			os.write(inpputs.getBytes());
			os.close();
			conn.connect();
			InputStream is = conn.getInputStream();
			// // DataInputStream indata = new DataInputStream(is);
			BufferedReader reader = new BufferedReader(
					new InputStreamReader(is));
			String ret = "";
			while (ret != null) {
				ret = reader.readLine();
				if (ret != null && !ret.trim().equals("")) {
					str_return = str_return + ret;
				}
			}
			is.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return str_return;
	}

	public static String Signup(String PortalUrl,String username, String password, String email) {
		String contentdata = "username=" + username + "&password=" + password
				+ "&email=" + email + "&fullname=" + username+"&securityQuestionIdx=1&securityAnswer=1&client=requestip&f=pjson";		
		String requesturl = "https://" + PortalUrl
				+ "/arcgis/sharing/community/signup";
		String Result=httsRequest(requesturl,contentdata);

		
		return Result;
	}

	public static void main(String[] args) throws Exception {

		// JSONObject jsonobject = new
		// JSONObject(GetToken("arcgis","arcgis123"));
		// System.out.println("token的值为："+jsonobject.getString("token"));

		Signup("portal190182.arcgiscloud.com","dubaokun1","dubaokun1","dubaokun@163.com");
//		System.out
//				.println(GetUserName(
//						"portal190182.arcgiscloud.com",
//						"VZeqSqBIJlQBr5gqMUGCJ8-016PaCQRp-yTUeDRw-VIzNTaz8l_5uEpdHTI6OJzqQ0EJLL-I7h2RVOjB83-RYqnmv6Ugmu-9aljoiz0gtNs."));
	}

}
