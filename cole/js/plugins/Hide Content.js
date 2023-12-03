//=======================================================================
// Hide Content Plugin v1.0
//=======================================================================
//   The  Hide Content  plugin  adds a hide content toggle to the option
//	 menu. It gives  players the choice to have more content if they
//   aren't easily offended by adult, religion, sexual contents.
//========================================================================
// Hide Content.js
//========================================================================
 
var Imported = Imported || {}; Imported.CContent = true;
var C = C || {}; C.Mct = C.Mct || {};


/*:
 @plugindesc Add a Content toggle in the Options menu.
 @author Vito The Boss

 @param Content Text
 @desc Text for Content option
 @default Content
 
 @help

 To use, create a Conditional Branch with the Script option selected and the
 "Create Else Branch" checked. Paste the following in the Script textbox:

 	ConfigManager.Content

 or

 	$mature.Content()

 This will check if mature content is toggled on or off and display the
 appropriate contents.

 Example:

	 If: Script: $mature.Content()
	 	Text : None, Window, Bottom
	 	: Content ON
	 : Else
	 	Text : None, Window, Bottom
	 	: Content OFF
	 : End

 Both $mature.Content() and ConfigManager.Content are interchangable.
 You can use one or both, although I'd recommend using one ofthem.
 You can use this almost anywhere that you want the content or to add
 an alternative if it's turned off.
*/

(function($) {
	CC.Mct.params = $.parameters('CContent');
	CC.Mct.Content = String(CC.Mct.params['Content Text'] || 'Content');

	$mature = new Game_Interpreter(); 
})(PluginManager);

(function($) {
	$.Content = false;

	CC__alias_ConfigManager_makeData = $.makeData;
	$.makeData = function() {
		CC__alias_ConfigManager_makeData.call(this);
		var config = {};
		config.Content = this.Content;
	    return config;
	};

	CC__alias_ConfigManager_applyData = $.applyData;
	$.applyData = function(config) {
		CC__alias_ConfigManager_applyData.call(this, config);
		this.Content = this.readFlag(config, 'Content');
	};
})(ConfigManager);

(function($) {
	CC__alias_Window_Options_addGeneralOptions = $.prototype.addGeneralOptions;
	$.prototype.addGeneralOptions = function() {
		CC__alias_Window_Options_addGeneralOptions.call(this);
		this.addCommand(CC.Content, 'Content');
	};
})(Window_Options);

Game_Interpreter.prototype.Content = function() {
	return ConfigManager.Content;
};

Window_Options.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2 + 120;
};
