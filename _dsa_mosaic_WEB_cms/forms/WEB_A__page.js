/**
 * @properties={typeid:35,uuid:"EB4C7E20-176B-4986-AFB4-E135BBFC5172"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"B959CE00-5A5D-47FD-BC5B-4050B21049CE",variableType:-4}
 */
var _editMode = false;

/**
 * @properties={typeid:35,uuid:"C1AFA183-40E4-408B-8163-A394988EC398",variableType:-4}
 */
var _reorderMode = false;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C1C07757-6C1F-4833-BC03-73B4F3E725FC"}
 */
function ACTION_edit(event) {
	
	//locked version
	if (!utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset) || forms.WEB_0F_page__design_1F_version.flag_lock) {
		plugins.dialogs.showErrorDialog(
					'Error',
					'The selected version is locked.  To enter edit mode it must be unlocked.'
			)
	}
	//enter edit mode
	else {
		TOGGLE_edit_mode(true)
		globals.WEBc_log_create('page','page edit begin',forms.WEB_0F_page.id_site,'web_page',forms.WEB_0F_page.id_page)
	}
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"D5876A87-E0EE-4FFD-A5A9-CEF098FDA60F"}
 */
function ACTION_cancel(event) {
	//leave edit mode without saving
	TOGGLE_edit_mode()
	
	globals.WEBc_log_create('page','page edit canceled',forms.WEB_0F_page.id_site,'web_page',forms.WEB_0F_page.id_page)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EA4BF701-A1BA-44F5-98BF-F5D550B45F0A"}
 */
function ACTION_save(event) {
	//leave edit mode and save
	TOGGLE_edit_mode(null,true)
	
	globals.WEBc_log_create('page','page edit save',forms.WEB_0F_page.id_site,'web_page',forms.WEB_0F_page.id_page)
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"E73B27E7-8247-410F-B28F-73DB3B9A581A"}
 */
function FORM_on_load(event) {
	TOGGLE_buttons()
}

/**
 * @properties={typeid:24,uuid:"6DD30A2F-C575-426F-9017-EFABA1087533"}
 */
function TOGGLE_edit_mode(editMode,saveData) {
	var currentState = _editMode
	
	if (typeof editMode == 'boolean') {
		_editMode = editMode
	}
	else {
		//disable edits if edit flag not set
		if (!utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset) || forms.WEB_0F_page__design_1F_version.flag_lock) {
				//disable edits for active or non-latest versions
				//utils.hasRecords(fsVersions) && fsVersions.version_number != fsVersions.getSize() || fsVersions.flag_active) {
			_editMode = false
		}
		//toggle edits
		else {
			_editMode = !_editMode
		}
	}
	
	//entering edit mode
	if (_editMode) {
		//enter pseudo-transaction if not already in one
		if (databaseManager.getAutoSave()) {
			databaseManager.saveData()
			databaseManager.setAutoSave(false)
		}
		
		//lock the screen
		globals.TRIGGER_interface_lock(true)
		
		//toggle elements
		TOGGLE_buttons()
		
		//set up storage place for all newly created blocks
		forms.WEB_0F_page__design_1F_version_2L_scope._newBlocks = new Array()
	}
	//exiting edit mode
	else if (currentState) {
		//save the data
		if (saveData) {
			//when in gui mode, save
			if (globals.WEB_page_mode == 2 && utils.hasRecords(forms.WEB_0F_page__design_1F_version_2L_scope.foundset.getSelectedRecord(),'web_scope_to_block')) {
				var recBlock = forms.WEB_0F_page__design_1F_version_2L_scope.web_scope_to_block.getSelectedRecord()
		
				if (recBlock && utils.hasRecords(recBlock.web_block_to_block_type)) {
					var recBlockType = recBlock.web_block_to_block_type.getRecord(1)
				}
				
				//this block definition exists as does the form and it has a save method on it
				if (recBlockType && forms[recBlockType.form_name] && solutionModel.getForm(recBlockType.form_name).getFormMethod('BLOCK_save')) {
					//pseudo-event comes from the scope of where this is fired
					var pseudoEvent = new Object()
					pseudoEvent.getFormName = function() {return recBlockType.form_name}
					
					forms[recBlockType.form_name].BLOCK_save(pseudoEvent)
				}
			}
			
			//update modification date on this record
			if (utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset)) {
				forms.WEB_0F_page__design_1F_version.rec_modified = application.getServerTimeStamp()
			}
			
			//redo valuelist for versions
			forms.WEB_0F_page__design.SET_versions(true)
			
			databaseManager.saveData()
		}
		//rollback the data if we were in edit mode
		else if (!databaseManager.getAutoSave()) {
			databaseManager.rollbackEditedRecords()
			
			//delete all newly created scope records
			if (forms.WEB_0F_page__design_1F_version_2L_scope._newBlocks instanceof Array) {
				while (forms.WEB_0F_page__design_1F_version_2L_scope._newBlocks.length) {
					var record = forms.WEB_0F_page__design_1F_version_2L_scope._newBlocks.pop()
					record.foundset.deleteRecord(record)
				}
			}
			
			//update version valuelist (if version activated, need to undo)
			forms.WEB_0F_page__design.SET_versions(true)
		}
		
		databaseManager.setAutoSave(true)
		
		//unlock the screen
		globals.TRIGGER_interface_lock(false)
		
		//toggle elements
		TOGGLE_buttons()
	}
	
	//set elements appropriately
	forms.WEB_0F_page__design_1F__header_display__version.TOGGLE_elements()
	forms.WEB_0F_page__design_1F_version_2L_scope.TOGGLE_elements(_editMode)
	forms.WEB_0F_page__design_1F_version_2F_block__data.TOGGLE_elements(_editMode)
	forms.WEB_0F_page__design_1F__properties.TOGGLE_elements(_editMode)
	forms.WEB_0F_page__design_1F_version_2L_scope.REC_on_select(null,true)	//on load of form this will cause to load block in twice
	
	//hide actions (can remove when upgrade sutra core)
	forms.WEB_0F_block__scrapbook_1F__gui.elements.btn_data_actions.enabled = false
	forms.WEB_0F_block__scrapbook_1F__data.elements.btn_data_actions.enabled = false
}

/**
 * @properties={typeid:24,uuid:"51FF71D7-7529-4E39-B9D4-747AB1B9A7D0"}
 */
function TOGGLE_buttons() {
	//actions
	elements.btn_cancel.visible = _editMode
	elements.btn_save.visible = _editMode
	elements.btn_done.visible = _reorderMode
	elements.btn_edit.visible = !(_editMode || _reorderMode)
	elements.btn_reorder.visible = !(_editMode || _reorderMode)
	
	//gui stuff
	elements.lbl_curve_two.visible = !(_editMode || _reorderMode)
	elements.lbl_curve_one.visible = _editMode || _reorderMode
	elements.lbl_reorder.visible = !(_editMode || _reorderMode)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6E28B34B-004E-4482-8590-4F7B6DA58089"}
 */
function ACTION_done(event) {
	ACTION_reorder()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"83323A47-B373-4788-A8D9-5010012E2715"}
 */
function ACTION_reorder(event) {
	//locked version
	if (!_reorderMode && !utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset) || forms.WEB_0F_page__design_1F_version.flag_lock) {
		plugins.dialogs.showErrorDialog(
					'Error',
					'The selected version is locked.  To reorder blocks it must be unlocked.'
			)
	}
	//enter reorder mode
	else {
		//toggle
		_reorderMode = !_reorderMode
		
		//entering reorder
		if (_reorderMode) {
			globals.WEBc_log_create('page','page reorder begin',forms.WEB_0F_page.id_site,'web_page',forms.WEB_0F_page.id_page)
			
			//lock the screen
			globals.TRIGGER_interface_lock(true)
			
			//toggle elements
			TOGGLE_buttons()
		}
		//exiting reorder
		else {
			globals.WEBc_log_create('page','page reorder end',forms.WEB_0F_page.id_site,'web_page',forms.WEB_0F_page.id_page)
			
			//update modification date on this record
			if (utils.hasRecords(forms.WEB_0F_page__design_1F_version.foundset)) {
				forms.WEB_0F_page__design_1F_version.rec_modified = application.getServerTimeStamp()
			}
			
			databaseManager.saveData()
			
			//unlock the screen
			globals.TRIGGER_interface_lock(false)
			
			//set elements appropriately
			forms.WEB_0F_page__design_1F__header_display__version.TOGGLE_elements()
			forms.WEB_0F_page__design_1F_version_2L_scope.TOGGLE_elements(_editMode)
			forms.WEB_0F_page__design_1F_version_2F_block__data.TOGGLE_elements(_editMode)
			forms.WEB_0F_page__design_1F__properties.TOGGLE_elements(_editMode)
			forms.WEB_0F_page__design_1F_version_2L_scope.REC_on_select(null,true)	//on load of form this will cause to load block in twice
			
			//hide actions (can remove when upgrade sutra core)
			forms.WEB_0F_block__scrapbook_1F__gui.elements.btn_data_actions.enabled = false
			forms.WEB_0F_block__scrapbook_1F__data.elements.btn_data_actions.enabled = false
			
			//toggle elements
			TOGGLE_buttons()
		}
		
		//dis/enable ordering
		forms.WEB_0F_page__design_1F_version_2L_scope.elements.btn_down.enabled = _reorderMode
		forms.WEB_0F_page__design_1F_version_2L_scope.elements.btn_up.enabled = _reorderMode
		
		//can remove with sutra upgrade
		forms.WEB_0F_page__design_1F_version_2L_scope.elements.btn_add.enabled = false
		forms.WEB_0F_page__design_1F_version_2L_scope.elements.btn_actions.enabled = false
		forms.WEB_0F_page__design_1F_version_2L_scope.ACTION_gui_mode_load()
	}
}