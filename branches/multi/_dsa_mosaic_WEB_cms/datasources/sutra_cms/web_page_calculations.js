/**
 * @properties={type:12,typeid:36,uuid:"4CB99AE3-868F-424D-A778-516860FEC7E1"}
 */
function display_page_name() {
	//creating a page
	if (forms.WEB_0T_page._addRecord) {
		var pageName = 'Newly created page'
	}
	//page already created
	else {
		for (var i = 1; i <= web_page_to_language.getSize(); i++) {
			var languageRec = web_page_to_language.getRecord(i)
			
			//if we have the default language, return it
			if (languageRec.id_site_language == globals.WEB_page_language) {
				var pageName =  languageRec.page_name
			}
		}
	}
	//no page name, we must not have a valid language record
	if (!pageName) {
		return  "Language record error"
	}
	
	//this is a folder
	if (page_type == 1) {
		return 'Folder: ' + pageName
	}
	//this is an external link
	else if (page_type == 2) {
		return 'External link: ' + pageName
	}
	//this is an internal link
	else if (page_type == 3) {
		return 'Internal link: ' + pageName
	}	
	//this is a page
	else {
		return pageName
	}
}

/**
 * @properties={type:12,typeid:36,uuid:"0CEAE8B0-E697-4E2F-B5CE-F8721B48352E"}
 */
function id_language__default() {
	//take default language from site level
	if (utils.hasRecords(web_page_to_site)) {
		var siteLanguageID = web_page_to_site.id_site_language__default
		
		for (var i = 1; i <= web_page_to_language.getSize(); i++) {
			var languageRec = web_page_to_language.getRecord(i)
			
			//if we have the default language, return it
			if (languageRec.id_site_language == siteLanguageID) {
				return languageRec.id_language
			}
		}
	}
	
	//grab first created language and serve it back
	var fsLanguage = databaseManager.getFoundSet('sutra_cms','web_language')
	fsLanguage.find()
	fsLanguage.id_page = id_page
	var results = fsLanguage.search()
	
	if (results) {
		fsLanguage.sort('rec_created asc')
		
		var initialLanguage = fsLanguage.getRecord(1)
		return initialLanguage.id_language
	}
	else {
		return "Language record error"
	}
}

/**
 *
 * @properties={type:12,typeid:36,uuid:"33576727-2FBF-4718-8F0A-ED5A68D652AA"}
 */
function page_name() {
	//we have a default language, serve it up
	if (utils.hasRecords(web_page_to_language__default)) {
		var pageName = web_page_to_language__default.page_name
	}
	//no default language, go hunting
	else {
		//new record mode
		if (forms.WEB_0T_page._addRecord) {
			return "Newly created page"
		}
		
		//grab first language related record alphabetically
		var pageName =  web_page_to_language.page_name
	}
	
	//no page name, we must not have a valid language record
	if (!pageName) {
		return  "Language record error"
	}
	
	//this is a folder
	if (page_type == 1) {
		return 'Folder: ' + pageName
	}
	//this is an external link
	else if (page_type == 2) {
		return 'External link: ' + pageName
	}
	//this is an internal link
	else if (page_type == 3) {
		return 'Internal link: ' + pageName
	}	
	//this is a page
	else {
		return pageName
	}
}

/**
 *
 * @properties={type:12,typeid:36,uuid:"505BDBD8-5168-446A-ACC0-0CB9531D07DC"}
 */
function display_header_sub_right()
{
	var dateString = 'Created: ' + globals.CODE_date_format(rec_created,'current')
	
	if (rec_modified) {
		dateString += '   Modified: ' + globals.CODE_date_format(rec_modified,'current')
	}
	
	return dateString
}
