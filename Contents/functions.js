//===========================================================================
// functions.js
// Commando widget  1.0
// Originally written and Steampunked by: Dean Beedell
// Dean.beedell@lightquick.co.uk
// Vitality code, advice and patience from Harry Whitfield
//
//===========================================================================
//add the help
//add the relative positioning for landscape/portrait

/*jslint multivar */

/*property
	clockFaceSwitchPref, contextMenuItems, hLocationPercPref, hOffset, height,
	hoffset, itemExists, landscapeHoffsetPref, landscapeVoffsetPref, locked,
	onContextMenu, onMouseDown, onSelect, opacity, portraitHoffsetPref,
	portraitVoffsetPref, reveal, soundPref, title, tooltip, userWidgetsFolder,
	vLocationPercPref, vOffset, value, visible, voffset, widgetHideModePref,
	widgetLockLandscapeModePref, widgetLockPortraitModePref, width
*/

"use strict";

var mainWindow, mainWindowwidthDefault, mainWindowheightDefault,
		cableWheelSet, cableWheelSethoffsetDefault, cableWheelSetvoffsetDefault,
		cableWheelSetwidthDefault, cableWheelSetheightDefault, cable, cablehoffsetDefault,
		cablevoffsetDefault, cablewidthDefault, cableheightDefault, pipes, pipeshoffsetDefault,
		pipesvoffsetDefault, pipeswidthDefault, pipesheightDefault, bell, bellhoffsetDefault,
		bellvoffsetDefault, bellwidthDefault, bellheightDefault, indicatorRed,
		indicatorRedhoffsetDefault, indicatorRedvoffsetDefault, indicatorRedwidthDefault,
		indicatorRedheightDefault, speaker, speakerhoffsetDefault, speakervoffsetDefault,
		speakerwidthDefault, speakerheightDefault, bar, barhoffsetDefault, barvoffsetDefault,
		barwidthDefault, barheightDefault, sliderSet, sliderSethoffsetDefault,
		sliderSetvoffsetDefault, sliderSetwidthDefault, sliderSetheightDefault, text1,
		text1hoffsetDefault, text1voffsetDefault, text1fontDefault, text2, text2hoffsetDefault,
		text2voffsetDefault, text2fontDefault, tingingSound, startup, aspectRatio, displayLicence,
		widgetName, switchFacesButton, prefs, till, background2, background, smallMinuteHand,
		swSecondHand, swMinuteHand, swHourHand, dateText, secondtextxo, secondtextyo, sizeIt,
		pin, lock, stopWatchState, mistake;


//======================================================================================
// Function to move the main_window onto the main screen - called on startup and by timer
//======================================================================================
function mainScreen() {
// if the widget is off screen then move into the viewable window

	print("****************MAINSCREEN********************");

	// check for aspect ratio and determine whether it is in portrait or landscape mode
	if (screen.width > screen.height) {
		aspectRatio = "landscape";
	} else {
		aspectRatio = "portrait";
	}
	print("screen.width " + screen.width);
	print("screen.height " + screen.height);
	print("aspectRatio " + aspectRatio);
	// check if the widget has a lock for the screen type.
	if (aspectRatio === "landscape") {
		if (preferences.widgetLockLandscapeModePref.value === "enabled") {
			mainWindow.hoffset = preferences.landscapeHoffsetPref.value;
			mainWindow.voffset = preferences.landscapeVoffsetPref.value;
		}
		if (preferences.widgetHideModePref.value === "landscape") {
			print("Hiding the widget for landscape mode");
			widget.visible = false;
		} else {
			widget.visible = true;
		}
	}
	// check if the widget has a lock for the screen type.
	if (aspectRatio === "portrait") {
		if (preferences.widgetLockPortraitModePref.value === "enabled") {
			mainWindow.hoffset = preferences.portraitHoffsetPref.value;
			mainWindow.voffset = preferences.portraitVoffsetPref.value;
		}
		if (preferences.widgetHideModePref.value === "portrait") {
			print("Hiding the widget for portrait mode");
			widget.visible = false;
		} else {
			widget.visible = true;
		}
	}

	if (mainWindow.hOffset < 0) {
		mainWindow.hOffset = 10;
	}
	if (mainWindow.vOffset < 0) {
		mainWindow.vOffset = 0; // avoid Mac toolbar
	}
	if (mainWindow.hOffset > screen.width - 50) { //adjust for the extra width of the help page
		mainWindow.hOffset = screen.width - mainWindow.width + 220;
	}
	if (mainWindow.vOffset > screen.height - 150) {	 //adjust for the extra height of the help page
		mainWindow.vOffset = screen.height - mainWindow.height; // avoid Mac toolbar
	}

	// calculate the current hlocation in % of the screen
	//store the current hlocation in % of the screen
	if (preferences.hLocationPercPref.value !== "") {
		preferences.hLocationPercPref.value = String((mainWindow.hoffset / screen.width) * 100);
	}
	if (preferences.vLocationPercPref.value !== "") {
		preferences.vLocationPercPref.value = String((mainWindow.voffset / screen.height) * 100);
	}

}
//=====================
//End function
//=====================

//===========================================
// this function opens the online help file
//===========================================
function CommandoComicsOnClick() {
	var answer = alert("This button opens a browser window and connects to the Commando Comics Website. Do you wish to proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("https://www.commandocomics.com");
	}
}
//=====================
//End function
//=====================



//===========================================
// this function opens the online help file
//===========================================
function smallBrownDogOnClick() {
	var answer = alert("This button opens a browser window and connects to Small Brown Dog's DeviantArt page. Do you wish to proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("https://www.deviantart.com/small-brown-dog/art/Tail-end-Charlie-765031420");
	}
}
//=====================
//End function
//=====================


//===========================================
// this function opens the online help file
//===========================================
function toggleSound() {
    if (preferences.soundPref.value === "enabled") {
        preferences.soundPref.value = "disabled";
        knob.hOffset = 382;
        knob.tooltip="click to turn sound ON";
        set4.tooltip="click to turn sound ON";
        //system.volume = 4;
        play(nothing,true); // this turns off all sound // this turns off all sound
    } else {
        preferences.soundPref.value = "enabled";
        knob.hOffset = 358;
        knob.tooltip="click to turn sound OFF";
        set4.tooltip="click to turn sound OFF";
        //system.volume = 16;
        //reloadWidget();    
    }
}
//=====================
//End function
//=====================


//===========================================
// this function 
//===========================================
function widgetCreation() {
    if (aboutWindow.visible === false) {
       aboutWindow.visible = true; 
    } else {
       aboutWindow.visible = false;         
    }
    
}
//=====================
//End function
//=====================

//===========================================
// this function opens the online help file
//===========================================
function menuitem1OnClick() {
	var answer = alert("This button opens a browser window and connects to the help page for this widget. Do you wish to proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("https://www.facebook.com/profile.php?id=100012278951649");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens other widgets URL
//===========================================
function menuitem5OnClick() {
	var answer = alert("This button opens a browser window and connects to the Steampunk widgets page on my site. Do you wish to proceed", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("https://www.deviantart.com/yereverluvinuncleber/gallery/59981269/yahoo-widgets");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens the download URL
//===========================================
function menuitem6OnClick() {
	var answer = alert("Download latest version of the widget - this button opens a browser window and connects to the widget download page where you can check and download the latest zipped .WIDGET file). Proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("https://www.deviantart.com/yereverluvinuncleber/art/Panzer-RAM-Gauge-Yahoo-Widget-736905483");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens the browser at the contact URL
//===========================================
function menuitem7OnClick() {
	var answer = alert("Visiting the support page - this button opens a browser window and connects to our contact us page where you can send us a support query or just have a chat). Proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("http://www.facebook.com/profile.php?id=100012278951649");
	}
}
//=====================
//End function
//=====================

//===========================================
// this function opens the URL for paypal
//===========================================
function donate() {
    var answer = alert("Help support the creation of more widgets like this, send us a coffee! This button opens a browser window and connects to the Kofi donate page for this widget). Will you be kind and proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
                openURL("https://www.ko-fi.com/yereverluvinunclebert");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the browser at the contact URL
//===========================================
function facebookChat() {
    var answer = alert("Visiting the Facebook chat page - this button opens a browser window and connects to our Facebook chat page.). Proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function edits the widget
//===========================================
function editWidget() {
    //var answer = alert("Editing the widget. Proceed?", "Open Editor", "No Thanks");
    //if (answer === 1) {
		//uses the contents of imageEditPref to initiate your default editor
        performCommand();
    //}

}
//=====================
//End function
//=====================        


//===========================================
// this function allows a spacer in the menu
//===========================================
function nullfunction() {
	print("null");
}
//=====================
//End function
//=====================

//===========================================
// this function causes explorer to be opened and the file selected
//===========================================
function findWidget() {

 // temporary development version of the widget
    var widgetFullPath = convertPathToPlatform(system.userWidgetsFolder + "/" + widgetName);
    var alertString = "The widget folder is: \n";
    if (filesystem.itemExists(widgetFullPath)) {
        alertString += system.userWidgetsFolder + " \n\n";
        alertString += "The widget name is: \n";
        alertString += widgetName + ".\n ";

        alert(alertString, "Open the widget's folder?", "No Thanks");

        filesystem.reveal(widgetFullPath);
    } else {
        widgetFullPath = resolvePath(".");   
        filesystem.reveal(widgetFullPath);
        print("widgetFullPath " + widgetFullPath);
    }
}
//=====================
//End function
//=====================



//======================================================================================
// Function to perform commands
//======================================================================================
function performCommand() {
     if (preferences.soundPref.value === "enabled") {
        play(tingingSound, false);
    }

    print("preferences.imageEditPref.value " + preferences.imageEditPref.value);
   	runCommandInBg(preferences.imageEditPref.value, "runningTask");
 }
//=====================
//End function
//=====================


//===========================================
// this function opens other widgets URL
//===========================================
function otherwidgets() {
    var answer = alert("This button opens a browser window and connects to the widgets page on my site. Do you wish to proceed", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        openURL("https://www.deviantart.com/yereverluvinuncleber/gallery/59981269/yahoo-widgets");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the download URL
//===========================================
function update() {
    var answer = alert("Download latest version of the widget - this button opens a browser window and connects to the widget download page where you can check and download the latest zipped .WIDGET file). Proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        openURL("https://www.deviantart.com/yereverluvinuncleber/gallery/59981269/yahoo-widgets");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the browser at the contact URL
//===========================================
function contact() {
    var answer = alert("Visiting the support page - this button opens a browser window and connects to our contact us page where you can send us a support query or just have a chat). Proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        openURL("http://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the browser at the contact URL
//===========================================
function facebookChat() {
    var answer = alert("Visiting the Facebook chat page - this button opens a browser window and connects to our Facebook chat page.). Proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================

//=========================================================================
// this function assigns translations to preference descriptions and titles
//=========================================================================
function setmenu() {
	mainWindow.onContextMenu = function () {
              var items = [], mItem, sItem;
              
              mItem = new MenuItem();
              mItem.title = "Visit Commando Comics Website";
              mItem.onSelect = function () {
                  CommandoComicsOnClick();
              };              
              
      	items.push(mItem);     
        
        mItem = new MenuItem();
        mItem.title = "Visit the original artist at DeviantArt";
        mItem.onSelect = function () {
            smallBrownDogOnClick();
        };              
              
      	items.push(mItem);
        
        mItem = new MenuItem();
        mItem.title = "How this widget was created";
        mItem.onSelect = function () {
            widgetCreation();
        };              
              
      	items.push(mItem);               
        
              mItem = new MenuItem();
              mItem.title = "";
              mItem.onSelect = function () {
                  nullFunction();
              };              
              
      	items.push(mItem);            
                 
        
        mItem = new MenuItem();
              mItem.title = "Toggle Sound On/Off";
              mItem.onSelect = function () {
                  toggleSound();
              };              
              
      	items.push(mItem);
        
        mItem = new MenuItem();
        mItem.title = "Online Help and other online options";
        items.push(mItem);

        sItem = new MenuItem();
        sItem.title = "See More Widgets";
        sItem.onSelect = function () {
            otherwidgets();
        };
        mItem.appendChild(sItem);
        
        
        sItem = new MenuItem();
        sItem.title = "Donate a Coffee with Ko-Fi";
        sItem.onSelect = function () {
            donate();
        };
        mItem.appendChild(sItem);

        sItem = new MenuItem();
        sItem.title = "Download Latest Version";
        sItem.onSelect = function () {
            update();
        };
        mItem.appendChild(sItem);

        sItem = new MenuItem();
        sItem.title = "Contact Support";
        sItem.onSelect = function () {
            contact();
        };
        mItem.appendChild(sItem);

        sItem = new MenuItem();
        sItem.title = "Chat about the Widgets on Facebook";
        sItem.onSelect = function () {
            facebookChat();
        };
        mItem.appendChild(sItem);


              mItem = new MenuItem();
              mItem.title = "Display Licence Agreement...";
              mItem.onSelect = function () {
                  displayLicence();
              };
      	items.push(mItem);

              mItem = new MenuItem();
              mItem.title = "";
              mItem.onSelect = function() {
                  nullfunction();
              };
      	items.push(mItem);

              mItem = new MenuItem();
              mItem.title = "Reveal Widget in Windows Explorer";
              mItem.onSelect = function() {
                  findWidget();
              };
      	items.push(mItem);

              mItem = new MenuItem();
              mItem.title = "";
              mItem.onSelect = function() {
                  nullfunction();
              };
      	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Reload Widget (F5)";
        mItem.onSelect = function () {
          play(nothing,true); // this turns off all sound
          reloadWidget();
        };
        items.push(mItem);

        if ((preferences.imageEditPref.value !== "") && (debugFlg === "1")) {
        	mItem = new MenuItem();
        	mItem.title = "Edit Widget using " + preferences.imageEditPref.value;
        	mItem.onSelect = function () {
        		editWidget();
        	};
        	items.push(mItem);
        }

	    mainWindow.contextMenuItems = items;
	};
}
//=====================
//End function
//=====================




//===============================================================
// this function 
//===============================================================

//=====================
//End function
//=====================


//===============================================================
// this function 
//===============================================================
aboutText2.onMouseDown = function() {
       aboutWindow.visible = false;         
}
//=====================
//End function
//=====================

//======================================================================================
// END script functions.js
//======================================================================================
