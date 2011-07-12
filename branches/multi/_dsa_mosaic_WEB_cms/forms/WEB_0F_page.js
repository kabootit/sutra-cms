/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f28"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"F1DF07A7-B3D8-4A8B-A4CF-9CB5A79A5D1D"}
 */
function TRIGGER_mode_set(mode) {
	if (mode) {
		switch (mode) {
			case "DESIGN":	
				//custom block editor loaded on browser form, remove
				if (forms.WEB_0F_page__browser.elements.tab_editor.getMaxTabIndex() && (
					forms.WEB_0F_page__browser.elements.tab_editor.getTabFormNameAt(1) == 'WEB_0F__content' ||
					forms.WEB_0F_page__browser.elements.tab_editor.getTabFormNameAt(1) == 'WEB_0F__image'
					)) {
					
					//stop loading on main browser bean form to avoid race condition
					forms.WEB_0F_page__browser.elements.bn_browser.stopLoading()
					
					forms.WEB_0F_page__browser.elements.tab_editor.removeTabAt(1)
				}
				
				elements.tab_main.removeTabAt(2)
				elements.tab_main.tabIndex = 1
				
				//reset enabled/disabled, etc.
				forms.WEB_0F_page__design__header_display.FLD_data_change__version_selected()
				
				break;
			case "BROWSER":	
				//following line only needed when returning to web mode after not being in it fulltime
				forms.WEB_0F_page__browser.REC_on_select()
				
				elements.tab_main.addTab( forms.WEB_0F_page__browser )
				elements.tab_main.tabIndex = 2
				break;
			default:
			break;
		}
	}
	else {
		switch (elements.tab_main.tabIndex) {
			case 1:	
				return "DESIGN"
				break;
			case 2:	
				return "BROWSER"
				break;
			default:
			break;
		}
	}
}

/**
 * @properties={typeid:35,uuid:"41D49272-FB3B-4284-B2AB-C3233F1D9C3D"}
 */
var _lastToolbar = null;

/**
 * @properties={typeid:35,uuid:"FA071178-813A-4E1E-AAEB-13E5E59D62F3",variableType:-4}
 */
var _hackNoFire = false;

/**
 * @properties={typeid:24,uuid:"10F5E463-15E2-4C0B-858D-F62E76FEDFBF"}
 */
function FORM_on_show(firstShow, event) {
	//this is set when scrapbook is shown to ensure that browser bean has enough time to load before rendering
	if (!_hackNoFire) {
		//first time go to sitemap view
		if (firstShow) {
			globals.TRIGGER_ul_tab_list('WEB_0T_page','Sitemap',0)
		}
		
		//don't run in headless client
		if (application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT) {
			//save down currently selected toolbar
			if (application.__parent__.solutionPrefs && !solutionPrefs.config.lockStatus) {
				_lastToolbar = solutionPrefs.panel.toolbar[forms[solutionPrefs.config.formNameBase + '__header__toolbar'].elements.tab_toolbar.tabIndex - 1].tabName
				
				//make sure on page toolbar
				globals.TRIGGER_toolbar_set('Web Edit')
			}
			
			
			//in workflow maximized view
			if (firstShow && application.__parent__.solutionPrefs && solutionPrefs.config.activeSpace == 'workflow') {
				var tabContent = forms.WEB_0F_page__design__content_1F_block_data.elements.tab_detail
				
//				//remove possible heavyweight stuff
//				if (tabContent.getMaxTabIndex() >= 2 && (
//					tabContent.getTabFormNameAt(tabContent.tabIndex) == 'WEB_0F__content' ||
//					tabContent.getTabFormNameAt(tabContent.tabIndex) == 'WEB_0F__image' //||
//					)) {
//					
//					tabContent.addTab(forms.WEB_0F_page__design__content_1F_block_data_2F_blank)
//				}
				
				//switch modes
				TRIGGER_mode_set("BROWSER")
				return
			}
			
			if (!utils.hasRecords(foundset)) {
				//null out variables and valuelists
				globals.WEB_page_version = null
				globals.WEB_page_group = null
				globals.WEB_page_language = null
				globals.WEB_page_platform = null
				
				forms.WEB_0F_page__design.REC_on_select()
				
				//no records, dim out
				globals.WEB_lock_workflow(true)
				
				//set elements appropriately
				forms.WEB_TB__web_mode.controller.enabled = false
				forms.WEB_TB__web_mode.elements.gfx_tool_left.enabled = true
				forms.WEB_TB__web_mode.elements.gfx_tool_center.enabled = true
				forms.WEB_TB__web_mode.elements.gfx_tool_right.enabled = true
				
				forms.WEB_0F_page__design__content_1L_area.TOGGLE_elements(true)
				forms.WEB_0F_page__design__content_1L_block.TOGGLE_elements(true)
				forms.WEB_0F_page__design__content_1F_block_data__textarea.TOGGLE_elements(false)
				forms.WEB_0F_page__design__header_display__version.TOGGLE_elements(false)
			}
			else {// if (TRIGGER_mode_set() != "BROWSER") {
				//enable rec_on_select of the block type form
				globals.WEB_block_on_select = true
				
				// trigger correct block simple display
//				forms.WEB_0F_page__design__content_1L_block.ACTION_gui_mode_load()
			}
		}
	}
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean} allow hide
 *
 * @properties={typeid:24,uuid:"C35E32F1-37B2-4324-84F2-347A223A6871"}
 */
function FORM_on_hide(event) {
	//don't run in headless client
	if (application.getApplicationType() != APPLICATION_TYPES.HEADLESS_CLIENT) {
		globals.WEB_lock_workflow(false)
		forms.WEB_TB__web_mode.controller.enabled = true
		
		//restore last selected toolbar
		if (application.__parent__.solutionPrefs && !solutionPrefs.config.lockStatus) {
			//make sure on whatever last toolbar was
			globals.TRIGGER_toolbar_set(_lastToolbar)
			
			_lastToolbar = null
		}
	}
	
	return true
}

/**
 * @properties={typeid:24,uuid:"6DF88FF6-B5B2-4C20-BECB-5199AA95F932"}
 */
function FIND_restrict_site() {
	return forms.WEB_0F_site.id_site
}

/**
 * @properties={typeid:24,uuid:"97CC07D0-6689-419F-B468-06786A53DBE0"}
 */
function FIND_post_process(count) {
	//show correct list
	var baseForm = solutionPrefs.config.formNameBase
	
	//something found as a result of this find, show flat view
	if (count) {
		forms[baseForm].elements.tab_content_B.tabIndex = (navigationPrefs.byNavItemID[solutionPrefs.config.currentFormID].listData.withButtons) ? 2 : 3
	}
	//show tree view
	else {
		forms[baseForm].elements.tab_content_B.tabIndex = navigationPrefs.byNavSetName.configPanes.itemsByName['Custom tab ' + solutionPrefs.config.currentFormID + ': WEB_0T_page'].listData.tabNumber
		
		//force to select correct record
		forms.WEB_0T_page.elements.bean_tree.selectionPath = forms.WEB_0T_page.FIND_path(foundset.getSelectedRecord())
	}
}

/**
 * @properties={typeid:24,uuid:"C24345A2-A310-4E68-9083-1D9F656002BB"}
 */
function ACTION_edit_get() {
	//disable edits if edit flag not set
	if (!utils.hasRecords(forms.WEB_0F_page__design__content.foundset) || !forms.WEB_0F_page__design__content.flag_edit) {
			//disable edits for active or non-latest versions
			//utils.hasRecords(fsVersions) && fsVersions.version_number != fsVersions.getSize() || fsVersions.flag_active) {
		var editAllow = false
	}
	//enable edits
	else {
		var editAllow = true
	}
	
	return editAllow
}
