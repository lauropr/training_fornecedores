sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("ovly.odata.fornecedores.controller.View2", {

		onInit: function () {

			this._oViewModel = new JSONModel({ //creates an attribute on the controller so it is more maintainable 
				isAdd: false,
				isDetail: false,
				//ID: "",
				name: "New supplier",
				concurrency: 50 //not necessary, just to be more evident
			});

			this._oCountryModel = new JSONModel( //creates an attribute on the controller so it is more maintainable 
				[{
					id: 1,
					name: "Brazil"
				}, {
					id: 2,
					name: "South Korea"
				}]
			);

			this.getView().setModel(this._oViewModel, "view");
			this.getView().setModel(this._oCountryModel, "country");

			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.attachRouteMatched(this.onRouteMatched);

			this._oRouter.getRoute("add").attachPatternMatched(this.onRouteAdd, this);
			this._oRouter.getRoute("detail").attachPatternMatched(this.onRouteDetail, this);
		},

		onRouteAdd: function (oEvent) {
			this._oViewModel.setProperty("/isAdd", true);
			this._oViewModel.setProperty("/isDetail", false);

		},

		onRouteDetail: function (oEvent) {

			this._oViewModel.setProperty("/isAdd", false);
			this._oViewModel.setProperty("/isDetail", true);

			var oODataModel = this.getView().getModel();
			var sSupplierID = oEvent.getParameters().arguments.supplierID;
			var that = this;

			oODataModel.metadataLoaded().then(function () {
				var sPath = oODataModel.createKey("/Suppliers", {
					ID: sSupplierID
				});

				function onReadSuccess(oEntry) {
					this._oViewModel.setProperty("/id", oEntry.ID);
					this._oViewModel.setProperty("/street", oEntry.Address.Street);
					this._oViewModel.setProperty("/streetNumber", oEntry.Address.houseNumber);
					this._oViewModel.setProperty("/zip", oEntry.Address.ZipCode);
					this._oViewModel.setProperty("/city", oEntry.Address.City);
				}

				function onReadError(oError) {

				}

				var mReadParameters = {
					success: onReadSuccess.bind(that),
					error: $.proxy(onReadError, that)
				};

				oODataModel.read("/" + sPath, mReadParameters);
			});

		},

		onRouteMatched: function (oEvent) {
			switch (oEvent.getParameters().name) {
			case "add":
				break;

			case "detail":
				break;
			default:
			}
		},

		onSave: function (oEvent) {

			//var oViewModel = this.getView().getModel("view"); // this._oViewModel spares us from having to "get" the model everytime
			//var sId = this.getView().byId("supplierId").getValue();

			var sId = this._oViewModel.getProperty("/id");
			var sName = this._oViewModel.getData().name;
			var iConcurrency = this._oViewModel.getProperty("/concurrency");
			var sAddress = this._oViewModel.getProperty("/street") + " " + this._oViewModel.getProperty("/streetNumber");
			var sZip = this._oViewModel.getProperty("/zip");
			var sCountry = this._oViewModel.getProperty("/country");
			var sCity = this._oViewModel.getProperty("/city");

			//var sName = oViewModel.getData().name;	// alternatively... this.getView().getModel("view").getProperty("/name")

			var oSupplier = {
				ID: sId,
				Name: sName,
				Concurrency: iConcurrency,
				Address: {
					Street: sAddress,
					City: sCity,
					ZipCode: sZip,
					Country: sCountry
				}
			};

			var oODataModel = this.getView().getModel();

			var sPath = "/Suppliers";

			function createSuccess(oNewSupplier) {
				MessageToast.show("Supplier " + oNewSupplier.Name + "successfully created");
			}

			function createError(oError) {
				MessageBox.error("Error while creating supplier");
			}

			var mParameters = {
				success: createSuccess,
				error: createError
			};

			oODataModel.create(sPath, oSupplier, mParameters);

		}

	});

});