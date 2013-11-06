require(["dojo/parser", "dojo/ready", "dojo/dom", "dojo/dom-construct", "dojo/_base/array", "dijit/registry", "dojo/on", "esri/arcgis/Portal", "esri/config", "esri/lang", "dgrid/Grid", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/request", 'esri/request', 'dojo/json'], function(parser, ready, dom, domconstruct, array, registry, on, Portal, config, lang, Grid, BorderContainer, ContentPane, request, esrirequest, JSON) {
	ready(function() {
		on(registry.byId('proxy'), 'Click', function() {
			console.log('代理获取点击事件');

			var username = dom.byId('uname').value;
			var pwd = dom.byId('pwd').value;
			request.post("proxy.jsp?https://www.arcgis.com/sharing/generateToken", {
				data : {
					username : username,
					password : pwd,
					referer : "localhost",
					f : "json"
				},
				timeout : 5000

			}).then(function(text) {
				console.log("The server returned: ", text);
				var result = JSON.parse(text);
				token = result.token;
				dom.byId('tokenresult').innerHTML = "使用代理方式：" + result.token;
			});
		});
		//通过CORS 来获取
		on(registry.byId('CORS'), 'Click', function() {
			config.defaults.io.corsEnabledServers.push('gisportal.arcgisonline.cn');
			var username = dom.byId('uname').value;
			var pwd = dom.byId('pwd').value;
			var url = 'https://gisportal.arcgisonline.cn/sharing/generateToken';
		esrirequest({
				url : url,
				content : {
					username : username,
					password : pwd,
					referer : "localhost",
					f : "json"
				}
			}, {
				usePost : true
			}).then(function(res) {
				token = res.token;
				dom.byId('tokenresult').innerHTML = "使用CORS方式：" + res.token;
			}, function(err) {

			});
		});
	});
});

