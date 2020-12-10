function initModel() {
	var sUrl = "/ODATA_ORG/V2/(S(41dxty1u1zrj1fsq3zwzi1o4))/OData/OData.svc/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}