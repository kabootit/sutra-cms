/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f58"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"2663ABEA-5268-43B2-B657-1575D5A41384",variableType:4}
 */
var _themeSet = null;

/**
 *
 * @properties={typeid:24,uuid:"74D490E2-0E2D-4AA6-A808-8D64A2B7640C"}
 */
function TAB_display()
{

/*
 *	TITLE    :	TAB_display
 *			  	
 *	MODULE   :	wf_PRJ_project
 *			  	
 *	ABOUT    :	return to the non-editable tab
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	MODIFIED :	March 13, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

//go back a tab
var formName = 'PRJ_0F_project'
var buttonsName = formName + '__button_tab'

//offset
var tabA = 55
var tabB = 223
var offset = tabB - tabA + 5 //the # is the space between tab_header_detail

//set new size of this tab panel
forms[formName].elements.tab_header_detail.setSize(forms[formName].elements.tab_header_button.getWidth(),tabA)

//go to display-only fields
forms[formName].elements.tab_header_detail.tabIndex = 1

//move/resize other tab panels
forms[formName].elements.tab_main.setLocation(0,forms[formName].elements.tab_main.getLocationY() - offset)
forms[formName].elements.tab_main.setSize(forms[formName].elements.tab_header_button.getWidth(),forms[formName].elements.tab_main.getHeight() + offset)

//flip graphic
forms[buttonsName].elements.btn_cancel.visible = false
forms[buttonsName].elements.btn_edit.visible = true
}

/**
 *
 * @properties={typeid:24,uuid:"F8DAAD9D-EB39-47DB-95FA-577776E143A5"}
 */
function TAB_sec_actions()
{

/*
 *	TITLE    :	TAB_sec_actions
 *			  	
 *	MODULE   :	wf_PRJ_project
 *			  	
 *	ABOUT    :	wrapper on secondary action wheel
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TAB_sec_actions()
 *			  	
 *	MODIFIED :	November 13, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */


globals.TAB_btn_actions_list(null,'tab_secondary')
}

/**
 *
 * @properties={typeid:24,uuid:"1873D4E8-3D03-4431-A4EB-75099CA8459B"}
 */
function TAB_sec_add()
{

/*
 *	TITLE    :	TAB_sec_add
 *			  	
 *	MODULE   :	wf_PRJ_project
 *			  	
 *	ABOUT    :	wrapper on secondary add button
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TAB_sec_add()
 *			  	
 *	MODIFIED :	November 13, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

globals.TAB_btn_rec_new(null,'tab_secondary')
}

/**
 *
 * @properties={typeid:24,uuid:"16873BD8-29ED-433A-A66F-AA9EEF7C5644"}
 */
function TAB_sec_change()
{

/*
 *	TITLE    :	TAB_sec_change
 *			  	
 *	MODULE   :	wf_PRJ_project
 *			  	
 *	ABOUT    :	wrapper on tab change method
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TAB_sec_change()
 *			  	
 *	MODIFIED :	November 26, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */


globals.TAB_change_grid(null,null,'tab_secondary','tab_s','btn_sec_add','btn_sec_actions','btn_sec_help')
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"FA2FEA2B-DF7F-4CB8-BBDF-6A0D7F8C9CA2"}
 */
function FORM_on_show(firstShow, event) {
	TOGGLE_fields(page_type)
	
	elements.fld_page_name.requestFocus(false)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EB585F60-3597-44A6-AC80-E77B46CAE26E"}
 */
function ACTION_cancel() {
	globals.WEB_simple_cancel()
	
	//MEMO: check WEB_P_page method too
	if (forms.WEB_0T_page._addRecord) {
		forms.WEB_0T_page._addRecord = null
		
		forms.WEB_0T_page.elements.bean_tree.removeAllRoots()
		forms.WEB_0T_page.FORM_on_load()
	}
	
	TOGGLE_fields(page_type)
}

/**
 *
 * @properties={typeid:24,uuid:"2C217D68-302D-4F96-920E-E5145C9C19E9"}
 */
function ACTION_save() {
	//MEMO: check WEB_P_page method too
	if (_themeSet) {
		_themeSet = null
		
		//don't prompt if creating page
		if (forms.WEB_0T_page._addRecord) {
			var input = "Yes"
		}
		//prompt
		else {
			var input = plugins.dialogs.showWarningDialog(
							"Warning",
							"New theme layout selected. All current area records\nwill be deleted. Continue?", 
							"Yes", 
							"No"
						)
		}

		if ( input != "Yes") {
			return false
		}
		
		//group to create as
			//TODO: if they've sorted, this will not be the everybody/visitor group
		var recGroup = forms.WEB_0F_site.web_site_to_group.getRecord(1)
		
		var fsArea = databaseManager.getFoundSet('sutra_cms','web_area')
		fsArea.find()
		fsArea.id_group = recGroup.id_group
		fsArea.id_version = globals.WEB_version_selected
		var results = fsArea.search()
		
		// get editable regions based on layout selected
		if (!utils.hasRecords(foundset.getSelectedRecord(),'web_page_to_layout.web_layout_to_editable')) {
			return 'No editables for selected layout'
		}
		
		var fsRegions = web_page_to_layout.web_layout_to_editable
		
		// delete current area records
		if (utils.hasRecords(fsArea)) {
			fsArea.deleteAllRecords()
		}
	
		// create a page area record for each editable
		if (fsRegions.getSize()) {
			//sort
			fsRegions.sort('row_order asc')
			
			//still manually set the order in case web_editable is out of sync (kind of likely)
			var order = 1
			for (var i = 1; i <= fsRegions.getSize(); i++) {
				var tempEditableRec = fsRegions.getRecord(i)
				
				var areaRec = fsArea.getRecord(fsArea.newRecord(false, true))
				
				areaRec.area_name = tempEditableRec.editable_name
				areaRec.id_editable = tempEditableRec.id_editable
				areaRec.row_order = order ++ 
				areaRec.id_group = recGroup.id_group
				areaRec.id_version = globals.WEB_version_selected			
				
				//create a block record for each editable default
				for (var j = 1; j <= tempEditableRec.web_editable_to_editable_default.getSize(); j++ ) {
					var tempEditableDefaultRec = tempEditableRec.web_editable_to_editable_default.getRecord(j)
					
					var blockRec = areaRec.web_area_to_block.getRecord(areaRec.web_area_to_block.newRecord(false, true))
					
					blockRec.id_block_display = tempEditableDefaultRec.id_block_display
					blockRec.id_block_type = tempEditableDefaultRec.id_block_type
					blockRec.params = tempEditableDefaultRec.params
					blockRec.id_scrapbook = tempEditableDefaultRec.id_scrapbook
					blockRec.row_order = tempEditableDefaultRec.row_order
					
					// INPUT
					//create a block_data record for each block_input
					if ( tempEditableDefaultRec.web_editable_default_to_block_input ) {
						for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); k++) {
							var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(k)
	
							var blockDataRec = blockRec.web_block_to_block_data.getRecord(blockRec.web_block_to_block_data.newRecord(false,true))
							blockDataRec.data_key = tempEditableDefaultDetailRec.column_name
						}
					}
					
//					// CONFIG
//					//create a ?? record for each block_configure
//					if ( tempEditableDefaultRec.web_editable_default_to_block_input ) {
//						for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); k++) {
//							var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(k)
//	
//							var blockDataRec = blockRec.web_block_to_block_data.getRecord(blockRec.web_block_to_block_data.newRecord(false,true))
//							blockDataRec.data_key = tempEditableDefaultDetailRec.column_name
//						}
//					}
//					
//					// RESPONSE
//					//create a block_data_response record for each block_response
//					if ( tempEditableDefaultRec.web_editable_default_to_block_input ) {
//						for (var k = 1; k <= tempEditableDefaultRec.web_editable_default_to_block_input.getSize(); k++) {
//							var tempEditableDefaultDetailRec = tempEditableDefaultRec.web_editable_default_to_block_input.getRecord(k)
//	
//							var blockDataRec = blockRec.web_block_to_block_data.getRecord(blockRec.web_block_to_block_data.newRecord(false,true))
//							blockDataRec.data_key = tempEditableDefaultDetailRec.column_name
//						}
//					}
				}
			}
		}
		
		//thrown in so that group data is properly filled...technically shouldn't save data until we're sure this won't be cancelled
		databaseManager.saveData()
		
		// finish up
		//fsArea.sort( "row_order asc" )
		fsArea.setSelectedIndex(1)
		
		//fill group global
		forms.WEB_0F_page__design.SET_groups()
	}
	
	//page was just created
	if (forms.WEB_0T_page._addRecord) {
		var fsPath = databaseManager.getFoundSet('sutra_cms','web_path')
		var siteID = id_site
		
		//add in path for this page
		var pathNameWanted = page_name || 'untitled-page'
		pathNameWanted = pathNameWanted.toLowerCase()
		pathNameWanted = utils.stringReplace(pathNameWanted, ' ', '-')
		
		var pathName = pathNameWanted
		var cnt = 1
		
		//we need to get into the loop
		results = null
		
		while (results != 0) {
			fsPath.find()
			fsPath.id_site = siteID
			fsPath.path = pathName
			var results = fsPath.search()
			
			if (results) {
				pathName = pathNameWanted + cnt++
			}
		}
		
		var recPath = web_page_to_path.getRecord(web_page_to_path.newRecord(false,true))
		recPath.flag_default = 1
		recPath.path = pathName
		recPath.id_site = siteID
		
		//reset flag
		forms.WEB_0T_page._addRecord = null
	}
	
	//call datachange to update display of stuff
	TOGGLE_fields(page_type)
	
	return true
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"5EB85F2D-6D13-4392-9A96-A8CAA31808F2"}
 */
function FLD_data_change__page_type(oldValue, newValue, event) {
	//turn things off/on
	TOGGLE_fields(newValue)
	
	return true
}

/**
 *
 * @properties={typeid:24,uuid:"6AC3202B-F934-4E51-9AF4-866A7F3A5B6C"}
 */
function TOGGLE_fields(pageType) {
	pageType = application.getValueListDisplayValue('WEB_page_type',pageType)
	
	var linkHeader = forms.WEB_0F_page__design__header_display.elements.lbl_link
	var folderHeader = forms.WEB_0F_page__design__header_display.elements.lbl_folder	
	linkHeader.visible = false
	folderHeader.visible = false
	
	var headerText = ''
	var headerToolTip = ''
	
	switch (pageType) {
		//we've got a page
		case 'Page':
			var page = true
			var link = false
			break
		case 'Link':
			var page = false
			var link = true
			linkHeader.visible = true
			if (page_link) {
				headerText = page_link
				headerToolTip = 'Click to open "' + page_link + '" in a browser'
			}
			
			break
		case 'Folder':
			var page = false
			var link = false
			folderHeader.visible = true
			break
	}
	
	linkHeader.text = headerText
	linkHeader.toolTipText = headerToolTip
	
	if ( utils.hasRecords(foundset) ) {
		elements.lbl_id_theme.visible = page
		elements.fld_id_theme.visible = page
		elements.lbl_id_theme_layout.visible = page
		elements.fld_id_theme_layout.visible = page
		elements.lbl_page_link.visible = link
		elements.fld_page_link.visible = link
	}

	
	//folder or link type of page
	if (!page) {
		forms.WEB_0F_page__design.elements.tab_main.tabIndex = 3
	}
	//normal type of page
	else {
		forms.WEB_0F_page__design__button_tab.TAB_change('WEB_0F_page__design__button_tab','tab_b1')
	}
}

/**
 * Handle changed data.
 *
 * @param {Object} oldValue old value
 * @param {Object} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} valid value
 *
 * @properties={typeid:24,uuid:"97DEA334-AEAC-43AC-BB85-0D796AB05318"}
 */
function FLD_data_change__id_theme_layout(oldValue, newValue, event) {
	//different value than before and old value existed (not selecting for first time)
	if (oldValue != newValue) {
		_themeSet = 1
	}
}
