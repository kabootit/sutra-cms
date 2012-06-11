/**
 * @properties={type:12,typeid:36,uuid:"15E543A9-8DE6-4070-B6D5-DD6DE283909C"}
 */
function display_delete() {
	var html = '<html><head></head><body><center>'
	
	//this is not a block builder component, can be deleted
	if (true){//!parent_id_scope) {
		html += '<img height="20" width="20" src="media:///btn_delete.png">'
	}
	//show nothing
	else {
		html += ''
	}
	
	html += '</center></body></html>'
	
	return html
}

/**
 * @properties={type:12,typeid:36,uuid:"F85FCCC2-D178-43FC-B736-973FB01D9BC7"}
 */
function display_flag_active() {
	var html = '<html><head></head><body><center>'
	
	//this is not a block builder component, can be (de-)activated
	if (true){//!parent_id_scope) {
		//show correct state of checkbox
		var img = (false) ? 'ballot_mac_unselect_blank' : 'ballot_mac_unselect_check'
		html += '<img height="18" width="20" src="media:///' + img + '.png">'
	}
	//show nothing
	else {
		html += ''
	}
	
	html += '</center></body></html>'
	
	return html
}

/**
 * Calculate the row background color.
 *
 * @param {Number} index row index
 * @param {Boolean} selected is the row selected
 * @param {String} elementType element type
 * @param {String} dataProviderID element data provider
 * @param {Boolean} edited is the record edited
 *
 * @returns {Color} row background color
 *
 * @properties={type:12,typeid:36,uuid:"49A8A20F-DDE1-4E67-9DC0-6235D529F44F"}
 */
function row_background(index, selected, elementType, dataProviderID, edited) {
	var scrapbook = utils.hasRecords(web_scope_to_block) && web_scope_to_block.scope_type
	
 	//white/tan with medium blue highlighter and green if a scrapbook
	if (selected) {
		//block builder sub blocks
		if (false) {//parent_id_scope) {
			return '#EAEAEA'
		}
		//there are blocks and they aren't unique
		else if (scrapbook) {
			return '#B6E6B6'
		}
		else {
			return '#BED7F7'
		}
	}
	else {
		//block builder sub blocks
		if (false) {//parent_id_scope) {
			return '#EFEFEF'
		}
		//scrapbook
		else if (scrapbook) {
			return '#DBF5DB'
		}
		//normal row alternation
		else {
			if (index % 2 == 0) {
				return '#F7F8EF'
			}
			else {
				return '#FFFFFF'
			}
		}
	}
}
