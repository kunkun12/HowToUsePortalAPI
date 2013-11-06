<%@page session="false"%>
<%@page import="java.net.*,java.io.*,javax.net.ssl.HttpsURLConnection,javax.net.ssl.*"%>
<%!String[] serverUrls = {
			//"<url>[,<token>]"
			//For ex. (secured server): "http://myserver.mycompany.com/arcgis/rest/services,ayn2C2iPvqjeqWoXwV6rjmr43kyo23mhIPnXz2CEiMA6rVu0xR0St8gKsd0olv8a"
			//For ex. (non-secured server): "https://gisportal.arcgisonline.cn"
			"https://gisportal.arcgisonline.cn", "https://www.arcgis.com", "http://www.arcgis.com", "https://localhost", "http://localhost" //NOTE - no comma after the last item
	};%>
<%
	class TrustAllTrustManager implements TrustManager, javax.net.ssl.X509TrustManager {

		@Override
		public java.security.cert.X509Certificate[] getAcceptedIssuers() {
			return null;
		}

		public boolean isServerTrusted(java.security.cert.X509Certificate[] certs) {
			return true;
		}

		public boolean isClientTrusted(java.security.cert.X509Certificate[] certs) {
			return true;
		}

		@Override
		public void checkServerTrusted(java.security.cert.X509Certificate[] certs, String authType) throws java.security.cert.CertificateException {

			return;
		}

		@Override
		public void checkClientTrusted(java.security.cert.X509Certificate[] certs, String authType) throws java.security.cert.CertificateException {
			return;
		}
	}
	
	HostnameVerifier hv = new HostnameVerifier() {
		@Override
		public boolean verify(String urlHostName, SSLSession session) {
			return true;
		}
	};
	HttpsURLConnection.setDefaultHostnameVerifier(hv);

	try {
		javax.net.ssl.TrustManager[] trustAllCerts = new javax.net.ssl.TrustManager[1];
		javax.net.ssl.TrustManager tm = new TrustAllTrustManager();
		trustAllCerts[0] = tm;	
		javax.net.ssl.SSLContext sc = javax.net.ssl.SSLContext
				.getInstance("SSL");
		javax.net.ssl.SSLSessionContext sslsc = sc
				.getServerSessionContext();
		sslsc.setSessionTimeout(0);
		sc.init(null, trustAllCerts, null);
		javax.net.ssl.HttpsURLConnection.setDefaultSSLSocketFactory(sc
				.getSocketFactory());
	} catch (Exception e) {
		e.printStackTrace();
	} 

	try {
		String reqUrl = request.getQueryString();
		boolean allowed = false;
		String token = null;
		for (String surl : serverUrls) {
			String[] stokens = surl.split("\\s*,\\s*");
			if (reqUrl.toLowerCase().contains(stokens[0].toLowerCase())) {
				allowed = true;
				if (stokens.length >= 2 && stokens[1].length() > 0)
					token = stokens[1];
				break;
			}
		}
		if (!allowed) {
			response.setStatus(403);
			return;
		}
		if (token != null) {
			reqUrl = reqUrl + (reqUrl.indexOf("?") > -1 ? "&" : "?") + "token=" + token;
		}
		URL url = new URL(reqUrl);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setDoOutput(true);
		con.setRequestMethod(request.getMethod());
		if (request.getContentType() != null) {
			con.setRequestProperty("Content-Type", request.getContentType());
		}
		con.setRequestProperty("Referer", request.getHeader("Referer"));
		int clength = request.getContentLength();
		if (clength > 0) {
			con.setDoInput(true);
			InputStream istream = request.getInputStream();
			OutputStream os = con.getOutputStream();
			final int length = 5000;
			byte[] bytes = new byte[length];
			int bytesRead = 0;
			while ((bytesRead = istream.read(bytes, 0, length)) > 0) {
				os.write(bytes, 0, bytesRead);
			}
		} else {
			con.setRequestMethod("GET");
		}
		out.clear();
		out = pageContext.pushBody();
		OutputStream ostream = response.getOutputStream();
		response.setContentType(con.getContentType());
		InputStream in = con.getInputStream();
		final int length = 5000;
		byte[] bytes = new byte[length];
		int bytesRead = 0;
		while ((bytesRead = in.read(bytes, 0, length)) > 0) {
			ostream.write(bytes, 0, bytesRead);
		}
	} catch (Exception e) {
		e.printStackTrace();
		response.setStatus(500);
	}
%>
