var a={
  "operationalLayers": [{
    "id": "csv_1429",
    "title": "Oasis Sites",
    "featureCollection": {
      "layers": [{
        "layerDefinition": {
          "geometryType": "esriGeometryPoint",
          "objectIdField": "__OBJECTID",
          "type": "Feature Layer",
          "typeIdField": "",
          "drawingInfo": {
            "renderer": {
              "type": "simple",
              "symbol": {
                "angle": 0,
                "xoffset": 0,
                "yoffset": 0,
                "type": "esriPMS",
                "imageData": "iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAMNJREFUSIntlcENwyAMRZ+lSMyQFcI8rJA50jWyQuahKzCDT+6h0EuL1BA1iip8Qg/Ex99fYuCkGv5bKK0EcB40YgSE7bnTxsa58LeOnMd0QhwGXkxB3L0w0IDxPaMqpBFxjLMuaSVmRjurWIcRDHxaiWZuEbRcEhpZpSNhE9O81GiMN5E0ZRt2M0iVjshek8UkTQfZy8JqGHYP/rJhODD4T6wehtbB9zD0MPQwlOphaAxD/uPLK7Z8MB5gFet+WKcJPQDx29XkRhqr/AAAAABJRU5ErkJggg==",
                "contentType": "image/png",
                "width": 24,
                "height": 24
              }
            },
            "fixedSymbols": true
          },
          "fields": [
            {
              "name": "__OBJECTID",
              "alias": "__OBJECTID",
              "type": "esriFieldTypeOID",
              "editable": false,
              "nullable": false,
              "domain": null
            }
          ],
          "types": [],
          "capabilities": "Query",
          "name": "oasis",
          "templates": [{
            "description": "",
            "name": "New Feature",
            "prototype": {
              "geometry": null,
              "symbol": null,
              "attributes": {
              },
              "infoTemplate": null
            }
          }]
        },
        "featureSet": {
          "features": [
            {
              "geometry": {
                "x": -1.2886566893210717E7,
                "y": 3990062.0865377956,
                "spatialReference": {"wkid": 102100}
              },
              "attributes": {
                "__OBJECTID": 0
              }
            }
          ],
          "geometryType": "esriGeometryPoint"
        },
        "nextObjectId": 4,
        "popupInfo": {
          "title": "{Name}",
          "fieldInfos": [
            {
              "fieldName": "__OBJECTID",
              "label": "__OBJECTID",
              "isEditable": true,
              "tooltip": "",
              "visible": false,
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
      "id": "NatGeo_World_Map_1836",
      "opacity": 1,
      "visibility": true,
      "url": "http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer"
    }],
    "title": "National Geographic"
  },
  "version": "1.6"
}