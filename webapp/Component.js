sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ovly/odata/fornecedores/model/models"
], function (UIComponent, Device, models, OData) {
	"use strict";

	return UIComponent.extend("ovly.odata.fornecedores.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			//CUSTOMIZADO - criação do modelo OData parecido com o modelo do standard "Device"
			this.setModel(models.createODataModel());

			this._oRouter = this.getRouter();

		}
	});
});