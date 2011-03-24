/**
 * @properties={typeid:35,uuid:"677AC4CD-7827-49A0-BCD6-6EEE5D3D33CC"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"1F6CF598-4838-4641-86AC-D810EEC6718E"}
 */
function ACTIONS_list(event) {
	//hand off to asset's actions
	var template = globals.WEB_asset_map(asset_type)
	
	if (template && template.formName && solutionModel.getForm(template.formName).getFormMethod('ASSET_actions')) {
		
		forms[template.formName].ASSET_actions(event,foundset.getSelectedRecord())
	}
	else {
		plugins.dialogs.showInformationDialog(
					'Alert',
					'This type of asset has no actions defined'
				)
	}
}