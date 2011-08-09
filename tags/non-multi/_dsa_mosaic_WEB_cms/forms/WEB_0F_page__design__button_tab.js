/**
 * @properties={typeid:35,uuid:"04fde543-69cc-4de9-af47-7f7c22221f33"}
 */
var _license_dsa_mosaic_WEB_cms = 'Module: _dsa_mosaic_WEB_cms \
									Copyright (C) 2011 Data Mosaic \
									MIT Licensed';

/**
 *
 * @properties={typeid:24,uuid:"5CD2FA00-B410-47B4-BDA0-8D5A6ECF6B41"}
 */
function FORM_on_load()
{
//hide cancel button
elements.btn_cancel.visible = false
}

/**
 *
 * @properties={typeid:24,uuid:"C946B15B-1BD2-4FC4-9D1A-130E19536C2D"}
 */
function TAB_change(formName,elemName)
{

/*
 *	TITLE    :	TAB_change
 *			  	
 *	MODULE   :	wf_PRJ_project
 *			  	
 *	ABOUT    :	changes tab, shows correct buttons, shows/hides edit arrow
 *			  	
 *	INPUT    :	
 *			  	
 *	OUTPUT   :	
 *			  	
 *	REQUIRES :	
 *			  	
 *	USAGE    :	TAB_change
 *			  	
 *	MODIFIED :	January 21, 2009 -- Troy Elliott, Data Mosaic
 *			  	
 */

globals.TAB_change_inline('WEB_0F_page__design__button_tab',elemName,'tab_button','tab_b')

forms.WEB_0F_page__design.elements.tab_main.tabIndex = elements.tab_button.tabIndex


}
