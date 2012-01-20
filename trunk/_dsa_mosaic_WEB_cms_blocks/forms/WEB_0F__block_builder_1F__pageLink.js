/**
 * @properties={typeid:35,uuid:"C7D81C36-DD36-4C76-9F11-B462B1CEFB4F"}
 */
var _license_dsa_mosaic_WEB_cms_blocks = 'Module: _dsa_mosaic_WEB_cms_blocks \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"346FEC3F-F398-4D41-AAED-610CCBB58F0B"}
 */
var _link = null;

/**
 * @properties={typeid:35,uuid:"346FEC3F-F398-6D41-AAED-610CCBB58F0B"}
 */
var _name = null;

/**
 * @properties={typeid:24,uuid:"6E5DBDB8-F58E-40AB-9E1F-CF96F2CAD453"}
 */
function INIT_data(data) {
	if (data && data.link && data.name) {
		var pageName = ''
		
		if (data.link.data) {
			var fsPage = databaseManager.getFoundSet('sutra_cms','web_page')
			fsPage.find()
			fsPage.id_page = data.link.data
			var results = fsPage.search()
			
			if (results) {
				pageName = fsPage.page_name
			}
		}
		
		_link = pageName
		_name = (data.name.data) ? data.name.data : pageName
		
		elements.lbl_link.text = data.link.label || solutionModel.getForm(controller.getName()).getLabel('lbl_link').text
		elements.lbl_name.text = data.name.label || solutionModel.getForm(controller.getName()).getLabel('lbl_name').text
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B106DA14-241E-41A0-946A-FCB31366D1DE"}
 */
function PAGE_picker(event,record) {
	if (event instanceof JSEvent) {
		globals.WEBc_page_picker(PAGE_picker,elements.lbl_link)
	}
	else {
		//if page name was same as old page selected, update display with new page name
		if (_link == _name || !_name) {
			var resetName = true
		}
		
		//actual page
		forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].data.link.data = event
		_link = record.page_name
		
		//display value for page
		if (resetName) {
			forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].data.name.data = record.page_name
			_name = record.page_name
		}
	}
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"A330C9C7-36EF-43FD-83AC-A5EBBD2BD0C4"}
 */
function onDataChange(oldValue, newValue, event) {
	forms.WEB_0F__block_builder._blockList[forms.WEB_0F__block_builder._blockSelected].data.name.data = newValue
}
