sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ovly.odata.fornecedores.controller.View1", {
		onInit: function () {

		},

		onSearch: function (oEvent) {

			// @type sap.m.List
			var oList = this.byId("lstSuppliers");

			// @type sap.ui.model.odata.v2.ODataListBinding
			var oBinding = oList.getBinding("items");

			var aFilters = [];

			var sSearchTerm = oEvent.getParameters().newValue;

			if (sSearchTerm) {

				var oFilter = new Filter({
					path: "Name",
					operator: FilterOperator.Contains,
					value1: sSearchTerm
				});
				aFilters.push(oFilter);

				var oFilterUpper = new Filter({
					path: "Name",
					operator: FilterOperator.Contains,
					value1: sSearchTerm.toUpperCase()
				});
				aFilters.push(oFilterUpper);

				var oFilterLower = new Filter({
					path: "Name",
					operator: FilterOperator.Contains,
					value1: sSearchTerm.toLowerCase()
				});
				aFilters.push(oFilterLower);

			} // FIM DO IF

			oBinding.filter(aFilters);

		},

		onItemPress: function (oEvent) {
			// var sSupplierName = oEvent.getParameters().listItem.getBindingContext().getObject().Address.Street;
			// MessageToast.show("Street name for selected item: " + sSupplierName);
			this.getOwnerComponent().getRouter().navTo("detail", {
				supplierID: oEvent.getParameters().listItem.getBindingContext().getObject().ID
			});

		},

		onAdd: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("add");

		}

	});
});