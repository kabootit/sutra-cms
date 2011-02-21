/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f42"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 * @properties={typeid:35,uuid:"1E47C10C-B99F-4515-A4B9-B7B9E6C21C32",variableType:-4}
 */
var _themesLayoutSelected = [];

/**
 * @properties={typeid:35,uuid:"F4A4D331-DC9D-4A88-92BA-1C3DB491C91E",variableType:-4}
 */
var _themesSelected = [];

/**
 * @properties={typeid:35,uuid:"FBEF5A88-6127-4EB8-B47C-1E98E64213DF",variableType:4}
 */
var _themesProgressTotal = 0;

/**
 * @properties={typeid:35,uuid:"BF4E5E80-2FAA-4433-A737-EF8364AD273E",variableType:4}
 */
var _themesProgressCount = 0;

/**
 * @properties={typeid:35,uuid:"91FDF507-D6E2-4E87-BF0D-C0D2A6946A57",variableType:4}
 */
var _themesDone = 0;

/**
 *
 * @properties={typeid:24,uuid:"F2CB4A41-BEEE-4317-9FA2-4976302B50EA"}
 */
function ACTION_new_editable()
{
	
	if (utils.hasRecords(web_theme_to_layout)) {
		web_theme_to_layout.web_layout_to_editable__selected.newRecord(false, true)
		databaseManager.saveData()
		web_theme_to_layout.web_layout_to_editable__selected.editable_name = ''
		forms.WEB_0F_theme_1L_editable.elements.fld_name.requestFocus()
		application.updateUI()
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No theme or layout selected.'
			)
	}	


}

/**
 * @properties={typeid:35,uuid:"563E0740-3E65-4C43-84B2-5EE80C9D81C3",variableType:-4}
 */
var _themesPaths = [];

/**
 * @properties={typeid:35,uuid:"CA483216-ED90-4FD6-8D30-292E98567DD0",variableType:-4}
 */
var _themes = {};

/**
 *
 * @properties={typeid:24,uuid:"8F31151F-873E-4BA0-A904-7533753AB256"}
 */
function ACTION_new_layout()
{	
	if (utils.hasRecords(foundset)) {
		web_theme_to_layout.newRecord(false, true)
		databaseManager.saveData()
		if (web_theme_to_layout.getSize() == 1) {
			web_theme_to_layout.flag_default = 1
		}
		web_theme_to_layout.layout_name = ''
		forms.WEB_0F_theme_1L_layout.elements.fld_layout_name.requestFocus(false)
		application.updateUI()
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No theme selected.'
			)
	}	
}

/**
 *
 * @properties={typeid:24,uuid:"65163F29-D176-461F-AA37-9C27BCBB5D94"}
 */
function ACTION_set_path()
{
	// TODO: Currently only works from client on a server. Implement server directory browsing.
	var input = plugins.dialogs.showInfoDialog(	"Note",
	"Currently only works from client running on the Server.",
	"Continue", "Cancel")
	if ( input == "Continue") {
		var folder = plugins.file.showDirectorySelectDialog()
	}
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"7EC1827E-0F69-47EB-B222-2971B81C2728"}
 */
function FORM_on_load(event) {
	// set split 2
	elements.bean_split_2.leftComponent = elements.tab_editable
	elements.bean_split_2.rightComponent = elements.tab_editable_default
	elements.bean_split_2.dividerLocation = 200	
	
	// set split 1
	elements.bean_split_1.leftComponent = elements.tab_layout
	elements.bean_split_1.rightComponent = elements.bean_split_2
	elements.bean_split_1.dividerLocation = 300
}

/**
 *
 * @properties={typeid:24,uuid:"3122FF8C-55C6-4992-996F-81F3B34F8CDC"}
 */
function REC_new() {
	controller.newRecord(true)
	id_site = forms.WEB_0F_site.id_site
	activated = 1
	elements.fld_theme_name.requestFocus(false)
}

/**
 *
 * @properties={typeid:24,uuid:"A0A26AD2-C1ED-4D39-B923-4901B33B9CF6"}
 */
function REC_delete()
{

/*
 *	TITLE    :	REC_delete
 *			  	
 *	MODULE   :	start_CRM_mosaic
 *			  	
 *	ABOUT    :	prompts to delete the currently selected record
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	REC_delete()
 *			  	
 *	MODIFIED :	July 31, 2008 -- Troy Elliott, Data Mosaic
 *			  	
 */

var delRec = plugins.dialogs.showWarningDialog(
'Delete record',
'Do you really want to delete this record?',
'Yes',
'No')

if (delRec == 'Yes') {

controller.deleteRecord()


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
 * @properties={typeid:24,uuid:"F0F3FB67-B1E6-4D1F-9AE5-940B22838CE7"}
 */
function FLD_data_change__flag_default(oldValue, newValue, event) {
	var record = foundset.getRecord(foundset.getSelectedIndex())
	
	var fsTheme = databaseManager.getFoundSet('sutra_cms','web_theme')
	
	fsTheme.find()
	fsTheme.id_site = record.id_site
	fsTheme.search()
	
	if (newValue) {
		
		//fsupdater broken as of 5.1.4??
//		var fsUpdater = databaseManager.getFoundSetUpdater(fsTheme)
//		fsUpdater.setColumn('flag_default',0)
//		fsUpdater.performUpdate()
//
//		record.flag_default = 1
		
		for (var i = 1; i <= fsTheme.getSize(); i++) {
			var recTheme = fsTheme.getRecord(i)
			
			if (recTheme.id_theme != record.id_theme) {
				recTheme.flag_default = 0
			}
		}
		
		databaseManager.saveData()
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'There must be a default theme set'
			)
		
		record.flag_default = 1
	}
	
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"896936DD-2542-4E87-8D01-3D058BCBC274"}
 */
function LAYOUTS_action_list(event) {
	if (utils.hasRecords(foundset)) {
		//menu items
		var valuelist = new Array('Duplicate layout','Refresh from directory...'/*,'-','Re-order editables on pages using selected layout'*/)
		
		//set up menu with arguments
		var menu = new Array()
		for ( var i = 0 ; i < valuelist.length ; i++ ) {
			menu[i] = plugins.popupmenu.createMenuItem(valuelist[i],LAYOUTS_action_list_control)
		
			menu[i].setMethodArguments(valuelist[i])
		
			if (menu[i].text == '----') {
				menu[i].setEnabled(false)
			}
		}
		
		//popup
		var elem = forms[event.getFormName()].elements[event.getElementName()]
		if (elem != null && valuelist.length) {
			plugins.popupmenu.showPopupMenu(elem, menu)
		}
	}
	else {
		plugins.dialogs.showErrorDialog(
					'Error',
					'No theme selected.'
			)
	}
}

/**
 * @properties={typeid:24,uuid:"332C7622-77A2-42B8-A8EB-B4135890E333"}
 */
function LAYOUTS_action_list_control(selected) {
	switch (selected) {
		case "Duplicate layout":  // duplicate layout, areas and blocks
			if (utils.hasRecords(web_theme_to_layout)) {
				var record = web_theme_to_layout.getRecord(web_theme_to_layout.getSelectedIndex())	
				var relations = new Array("web_layout_to_editable",
											"web_layout_to_editable.web_editable_to_editable_default")
//				var override = new Array(null,['flag_new_block'],null)
				
				var dupRecord = globals.CODE_record_duplicate(record, relations)
				dupRecord.flag_default = null
				
				plugins.dialogs.showInfoDialog("Complete", "Layout duplicated")
			}
			break
		case "Re-order editables on pages using selected layout":
			if (utils.hasRecords(forms.WEB_0F_theme_1L_layout)) {
				var fsPages = databaseManager.getFoundSet('sutra_cms','web_page')
				
				fsPages.find()
				fsPages.id_site = forms.WEB_0F_site.id_site
				fsPages.id_theme = id_theme
				fsPages.id_theme_layout = forms.WEB_0F_theme_1L_layout.id_layout
				var results = fsPages.search()
				
				//prompt to continue
				if (results) {
					var input = plugins.dialogs.showQuestionDialog(
								'Re-order?',
								results + ' pages will be updated in this site. Proceed?',
								'Yes',
								'No'
						)
					
					if (input == 'Yes') {
						for (var i = 1; i <= fsPages.getSize(); i++) {
							var thePage = fsPages.getRecord(i)
							
							//TODO: set global variabls for group/version combo where id_version >= the active version
//							forms.WEB_0F_page__design__content_1L_area.AREA_reorder(thePage)
						}
					}
				}
				else {
					plugins.dialogs.showInfoDialog(
									'Nothing to do',
									'No pages found in current site using this layout'
							)
				}
			}
			else {
				plugins.dialogs.showInfoDialog(
							'No layouts',
							'There are no layouts for the selected theme'
					)
			}
			break
	}
}

/**
 * @param {Integer} progress : used by streaming file callbacks to pass control back to this method
 * 
 * @properties={typeid:24,uuid:"B757D4CF-18E5-4D51-8A9B-9E4D5686530D"}
 */
function REC_newFromTheme(progress) {
	
	// *** STAGE #1: get available themes *** //
	if ( !progress ) { 
		
		// streaming file upload directory check
		if ( !globals.WEB_streaming_check() ) {
			plugins.dialogs.showErrorDialog( "Error", 'File streaming default folder needs to be set to operating system root ("/" or "C:\")')
			return 'File streaming default folder needs to be set to operating system root ("/" or "C:\")'
		}

		// build directory to current site's theme folder
		var install = forms.WEB_0F_install.FUNCTION_getInstallDirectory() 
		var theme = FUNCTION_getThemeDirectory()
		
		var directory = install + "/application_server/server/webapps/ROOT/sutraCMS/sites/" + theme + "/themes/"
		directory = utils.stringReplace(directory,"\\", "/")	// windows backslashes to js standard forward slashes
		
		// get theme directories and descriptor files
		var themesArray = plugins.file.getRemoteFolderContents(directory, null, 2)
		if (!themesArray) return;
		
		// form variables needed to keep track of state and data while streaming
		_themes = {}					// main storage object
		_themesPaths = []				// track full path to theme
		_themesPathsIncrementer = 0		// increments each callback
		_themesDone = 0					// to determine last callback
		_themesProgressTotal = 0		// max bytes to transfer for progress monitor
		
		// build data needed for streaming: file arrays, state variables
		var incrementer = 0
		var tempArray = []
		var sourceArray = []
		for (var i = 0; i < themesArray.length; i++) {
			if ( themesArray[i].getName().charAt(0) != "." ) { // skip hidden directories
				// build list of description.txt files to stream
				if ( plugins.file.convertToRemoteJSFile(directory + themesArray[i].getName() + "/description.txt").exists() ) {  // description.txt file may not be present
					_themesPaths[incrementer] = directory + themesArray[i].getName()	
					sourceArray[incrementer] = directory + themesArray[i].getName() + "/description.txt"
					tempArray[incrementer] = plugins.file.createTempFile("description",".txt")
					_themesProgressTotal += plugins.file.convertToRemoteJSFile(_themesPaths[incrementer] + "/description.txt").size()
					incrementer ++
				}				
			}
		}
		// set total number of themes so last callback can return control
		_themesDone = incrementer
		
		if ( incrementer > 0 ) { // only stream if themes are present
			// if in Data Sutra: stream files with progress bar for monitor
			if ( application.__parent__.solutionPrefs ) {
				globals.TRIGGER_progressbar_start(0, "Streaming files...", null, 0, _themesProgressTotal)
				// callback method fires when streaming is done in separate thread
				var monitor = plugins.file.streamFilesFromServer( tempArray, sourceArray, REC_newFromThemeCallbackTheme )
				if (monitor) {
					// progress monitor
					monitor.setProgressCallBack( REC_newFromThemeProgress, 1, (application.isInDeveloper() ? 100 : 0) )	
				}
			}
			else { // not in Data Sutra: stream files without monitor
				var monitor = plugins.file.streamFilesFromServer( tempArray, sourceArray, REC_newFromThemeCallbackTheme )
			}
		}
		else {
			plugins.dialogs.showErrorDialog( "Error", "No themes available")
			return "No themes available"
		}
	}
	
	// *** STAGE #2: // get jsp files and build data object *** //
	else if ( progress == 2 ) { 
	
		var themes = []  // array for select dialog
		for (var i in _themes ) {
			themes.push(_themes[i].name)
		}
	
		// choose theme
		var input =	plugins.dialogs.showSelectDialog("Themes", "Choose a theme to register", themes)
		if ( !input ) {
			return "No theme seleceted"
		}
		
		// get jsp files
		var jspArray = plugins.file.getRemoteFolderContents(_themes[input].path, null, 1)
		
		_themesDone = 0					// to determine last callback
		_themesPathsIncrementer = 0		// increments each callback
		_themesProgressTotal = 0		// max bytes to transfer for progress monitor
		_themesSelected = input			// tracks selected theme
		_themesLayoutSelected = []		// tracks current jsp name being processed for callback
		
		// build data needed for streaming: file arrays, state variables
		var incrementer = 0
		var tempArray = []
		var sourceArray = []
		for (var i = 0; i < jspArray.length; i++) {
			if ( jspArray[i].getName().search(/\.jsp$/) > 0 ) { // only get jsp files
				_themesLayoutSelected[incrementer] = jspArray[i].getName()
				sourceArray[incrementer] = jspArray[i]
				tempArray[incrementer] = plugins.file.createTempFile(jspArray[i].getName(),".txt")
				_themesProgressTotal += jspArray[i].size()
				incrementer ++				
			}
		}
		// set total number of themes so last callback can return control
		_themesDone = incrementer
		
		if ( incrementer > 0 ) {
			// if in Data Sutra: stream files with progress bar for monitor
			if ( application.__parent__.solutionPrefs ) {
				globals.TRIGGER_progressbar_start(0, "Streaming files...", null, 0, _themesProgressTotal)
				// callback method fires when streaming is done in separate thread
				var monitor = plugins.file.streamFilesFromServer( tempArray, sourceArray, REC_newFromThemeCallbackJSP )
				if (monitor) {
					// progress monitor
					monitor.setProgressCallBack( REC_newFromThemeProgress, 1, (application.isInDeveloper() ? 100 : 0) )	
				}
			}
			else { // not in Data Sutra: stream files without monitor
				var monitor = plugins.file.streamFilesFromServer( tempArray, sourceArray, REC_newFromThemeCallbackJSP )
			}	
		}
		else {
			plugins.dialogs.showErrorDialog( "Error", "No theme files defined in selected theme")
			return "No theme files defined in selected theme"
		}		
	}
	
	// *** STAGE #3: create theme, layouts and editable areas *** //
	else if ( progress == 3 ) {
		// 1 create theme record 
		var theme = foundset.getRecord(foundset.newRecord())
		theme.theme_name = _themes[_themesSelected].name
		theme.description = _themes[_themesSelected].description
		theme.id_site = forms.WEB_0F_site.id_site
		theme.activated = 1
		var themeDirectory = _themes[_themesSelected].path.split("/")
		theme.theme_directory = themeDirectory[themeDirectory.length - 1]
		databaseManager.saveData(theme)
		for (var i in  _themes[_themesSelected].editables ) {
			// 2 create layout record
			var layout = theme.web_theme_to_layout.getRecord(theme.web_theme_to_layout.newRecord())
			layout.layout_path = i
			layout.layout_name = i.split(".")[0]
			if (i == "default.jsp") layout.flag_default = 1                                  
			databaseManager.saveData(layout)
			for (var j in _themes[_themesSelected].editables[i] ) {
				// 3 create editable area record
				var editable = layout.web_layout_to_editable.getRecord(layout.web_layout_to_editable.newRecord())
				editable.editable_name = _themes[_themesSelected].editables[i][j]
				databaseManager.saveData(editable)                                                               
			}
		}
	}
}

/**
 * @properties={typeid:24,uuid:"606D36D4-5866-42BB-AE72-9B0FB0958593"}
 */
function FUNCTION_getThemeDirectory() {
	var error = null
	if ( forms.WEB_0F_site.directory ) {
		return forms.WEB_0F_site.directory
	}
	else {
		error = "No theme site directory specified"
	}
	
	if ( error ) {
		plugins.dialogs.showErrorDialog( "Error", error )
		return error
	}
	
}

/**
 * @properties={typeid:24,uuid:"E4583ABF-C20D-490E-82DB-5D9647B7409E"}
 */
function REC_newFromThemeCallbackTheme(result, e) {
	if (e) {
		//TODO: how to handle potential streaming error?
	} else {			
		// file stream done
		var fileData = plugins.file.readTXTFile( result )
		if (fileData) { // if description.txt exists read it and store
			var fileName = fileData.split("\n")[0]
			var description = fileData.slice(fileData.search(/\n/) + 1, 100000)   
			_themes[fileName] = { "name" : fileName,
			                      "description" : description,
			                      "path" : _themesPaths[_themesPathsIncrementer]} 
			_themesPathsIncrementer ++
		}
		else {
			_themesPathsIncrementer ++
		}
		// last callback: return control to orignator method
		if ( _themesPathsIncrementer == _themesDone ) {
			REC_newFromTheme( 2 )  // return to main method stage #2
		}
	}	
}

/**
 * @properties={typeid:24,uuid:"E4583ABF-C20D-490E-82DB-5D9647B7409F"}
 */
function REC_newFromThemeCallbackJSP(result, e) {
	if (e) {
		//TODO: how to handle potential streaming error?
	} else {			
		// file stream done
		var fileData = plugins.file.readTXTFile( result )
		if (fileData) { 
			
			// find and store editable regions			                        		
			var regexp = /pageData\.get\(\"(.*)\"/gi   // match: <%=pageData.get("Sidebar")%>, any combination of letters, numbers, spaces and undersores
			var occurrence = null;
			var editables = []
			while (occurrence = regexp.exec( fileData )){	
				editables.push(occurrence[1])
			}
			
			if ( !_themes[_themesSelected].editables ) {
				_themes[_themesSelected].editables = {}
			}
			_themes[_themesSelected].editables[_themesLayoutSelected[_themesPathsIncrementer]] = editables	
		}
		_themesPathsIncrementer ++
		// last callback: return control to orignator method
		if ( _themesPathsIncrementer == _themesDone ) {
			REC_newFromTheme( 3 )  // return to main method stage #3
		}
	}	
}

/**
 * @properties={typeid:24,uuid:"1B675F4D-34A2-48FC-9915-897C65DD3FDC"}
 */
function REC_newFromThemeProgress(monitor) {

	globals.TRIGGER_progressbar_set(monitor.getTotalTransferredBytes(), " Streaming " + monitor.getTotalTransferredBytes() + " of " + _themesProgressTotal)
	
	if ( monitor.isFinished() ) {
		// Data Sutra callback function
		globals.TRIGGER_progressbar_stop()
	}
}

/**
 * Handle focus element loosing focus.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"E1AF70C2-4087-41C1-A588-5F413DD0FD5A"}
 */
function FIELD_directory_onLost(event) {
	// don't allow trailing "/"
	databaseManager.saveData()
	if ( theme_directory.search(/\/*$/) > 0 ) {
		theme_directory = theme_directory.replace(/\/*$/, "")
		databaseManager.saveData()
	}
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"6A6517C7-831B-4579-A192-2ED134AEBB4C"}
 */
function FORM_on_show(firstShow, event) {
	if (firstShow) {
		//find stuff for the selected site
		if (utils.hasRecords(forms.WEB_0F_site.foundset)) {
			foundset.find()
			foundset.id_site = forms.WEB_0F_site.id_site
			var results = foundset.search()
		}
		else {
			foundset.clear()
		}
		
		//set divider locations
		var aThird = (controller.getFormWidth() - 22) / 3
		elements.bean_split_1.dividerLocation = aThird
		elements.bean_split_2.dividerLocation = aThird
	}
}
