dojo.require("esri.map");
dojo.require("esri.layers.graphics");
dojo.require("esri.layers.agstiled");
dojo.require("esri.renderer");
dojo.require("esri.graphic");

//定义点的符号
var pointsym = {
	"type" : "esriPMS",
	//"url":"http://www.esrichina-bj.cn/images/index_02.png",
	"imageData" : "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",
	"contentType" : "image/png",
	"color" : null,
	"width" : 40,
	"height" :40,
	"angle" : 0,
	"xoffset" : 0,
	"yoffset" : 0
}
//定义渲染器为简单渲染。
var Pointdrawinfo = {
	"renderer" : {
		"type" : "simple",
		"symbol" : pointsym
	},
	"fixedSymbols" : true
};
var WebMap = {
  "operationalLayers": [{
    "id": "testlayer",
    "title": "点图层",
    "featureCollection": {
      "layers": [{
        "layerDefinition": {
          "geometryType": "esriGeometryPoint",
          "objectIdField": "__OBJECTID",
          "type": "Feature Layer",
          "typeIdField": "",
          "drawingInfo": Pointdrawinfo,
          "fields": [
            {
              "name": "__OBJECTID",
              "alias": "__OBJECTID",
              "type": "esriFieldTypeOID",
              "editable": false,
              "nullable": false,
              "domain": null
            },
            {
              "name": "Name",
              "alias": "Name",
              "type": "esriFieldTypeString",
              "length": 255,
              "editable": true,
              "nullable": true,
              "domain": null
            },
            {
              "name": "X",
              "alias": "X",
              "type": "esriFieldTypeDouble",
              "editable": true,
              "nullable": true,
              "domain": null
            },
            {
              "name": "Y",
              "alias": "Y",
              "type": "esriFieldTypeDouble",
              "editable": true,
              "nullable": true,
              "domain": null
            }
          ],
          "types": [],
          "capabilities": "Query,Editing",
          "name": "oasis",
          "templates": [{
            "description": "",
            "name": "New Feature",
            "prototype": {
              "geometry": null,
              "symbol": null,
              "attributes": {
                "Name": null,
                "X": null,
                "Y": null
              },
              "infoTemplate": null
            }
          }]
        },
        "featureSet": {
          "features": [],
          "geometryType": "esriGeometryPoint"
        },
        "nextObjectId": 1,
        "popupInfo": {
          "title": "{Name}",
          "fieldInfos": [
            {
              "fieldName": "__OBJECTID",
              "label": "__OBJECTID",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Name",
              "label": "Name",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "HikeIn",
              "label": "Hike in required?",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "X",
              "label": "X",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            },
            {
              "fieldName": "Y",
              "label": "Y",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },
              "stringFieldOption": "textbox"
            }
          ],
          "description": null,
          "showAttachments": false,
          "mediaInfos": []
        }
      }],
      "showLegend": true
    },
    "visibility": true,
    "opacity": 1
  }],
  "baseMap": {
    "baseMapLayers": [{
      "id": "捷泰底图",
      "opacity": 1,
      "visibility": true,
      "url": "http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer"
    }],
    "title": "chinaMap"
  },
  "version": "1.5"
};

var ii = 0;
function init() {
	map = new esri.Map("map", {
		sliderStyle : "large",
		extent : new esri.geometry.Extent({
			"xmin" : 6026906.806227975,
			"ymin" : 2528136.440627491,
			"xmax" : 20115779.859747916,
			"ymax" : 5942731.368181977,
			"spatialReference" : {
				"wkid" : 102100
			}
		})
	});
	var basemapurl = "http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer";
	var basemaplayer = new esri.layers.ArcGISTiledMapServiceLayer(basemapurl, {
		showAttribution : true
	});
	var graphicsLayer1 = new esri.layers.GraphicsLayer();
	var smrenderer = new esri.renderer.SimpleRenderer({
		"type" : "simple",
		"symbol" : pointsym,
		"label" : "",
		"description" : ""
	});
	graphicsLayer1.setRenderer(smrenderer);
	map.addLayer(basemaplayer);
	map.addLayer(graphicsLayer1);
	dojo.connect(map, "onClick", function(e) {
		var pt = new esri.Graphic(e.mapPoint);
		console.log(pt);
		WebMap.operationalLayers[0].featureCollection.layers[0].featureSet.features.push({
              "geometry": {
                "x": pt.geometry.x,
                "y": pt.geometry.y,
                "spatialReference": {"wkid": 102100}
              },
              "attributes": {
                "Name": "小猫"+ii,
                "X": pt.geometry.x,
                "Y": pt.geometry.y,
                "__OBJECTID": ii++
              }
            });
		graphicsLayer1.add(pt);

	});
	dojo.connect(dijit.byId('creatWebMap'), "onClick", function(evt) {
		esri.config.defaults.io.corsEnabledServers.push('gisportal.arcgisonline.cn');
		console.log('创建webMap之前首先要登陆..');
		esri.request({
			url : 'https://gisportal.arcgisonline.cn/sharing/generateToken',
			content : {
				username : 'esri001',
				password : '1',
				referer : "localhost",
				f : "json"
			}
		}, {
			usePost : true
		}).then(function(res) {
			var mytoken = res.token;
			esri.request({
				url : 'https://gisportal.arcgisonline.cn/sharing/content/users/esri001/addItem',
				content : {
					token : mytoken,
					item : 'cat',
					title : "cat",
					type : 'Web Map',
					tags : "web, mapping, application",
					f : "json",
					extent:"44.4727,23.1942,149.4141,46.0986",//必须在WGS84下
					text : dojo.toJson(WebMap)
				}
			}).then(function(res) {
				console.log(res);
				if(res.success)
				{
					alert("保存成功:");
				}
                 
			},function(err){
				alert(dojo.toJson(err));
			});
		})
	});
}

dojo.ready(init);
