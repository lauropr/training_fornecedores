sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/odata/v2/ODataModel"
], function (JSONModel, Device, OData) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		//Customizado!
		createODataModel: function () {

			//var oURL = "https://services.odata.org/V2/(S(41dxty1u1zrj1fsq3zwzi1o4))/OData/OData.svc/";
			var oURL = "/api/V2/(S(41dxty1u1zrj1fsq3zwzi1o4))/OData/OData.svc/";
			var ODataModel = new OData({
				serviceUrl: oURL,
				disableHeadRequestForToken: true,
				useBatch: false
			});
			return ODataModel;

		}

	};
});