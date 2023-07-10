/*
	Commando Widget

	Created by Dean Beedell
	Original commando comic concept by Small Brown Dog
	Visuals added to and modified by Dean Beedell
	Sorted by Harry Whitfield

	email: dean.beedell@lightquick.co.uk
	http//lightquick.co.uk
*/

/*jslint multivar, this */

/*property
    MouseWheelPref, altKey, busy, clockFaceSwitchPref, clockSize, ctrlKey,
    data, duration, ease, endAngle, floor, getDate, getHours, getMilliseconds,
    getMinutes, getSeconds, getTime, getTimezoneOffset, hOffset,
    hRegistrationPoint, height, kEaseOut, length, mainDLSPref, match,
    maxLength, milliseconds, minLength, onMouseDown, onMouseUp, onMouseWheel,
    opacity, option, optionListPref1, optionListPref2, platform, readFile,
    rotation, round, scrollDelta, secyDLSPref, setTime, size, soundPref, split,
    src, srcHeight, srcWidth, start, startAngle, startTime, ticks, toFixed,
    toString, tooltip, vOffset, vRegistrationPoint, value, visible, width
*/

// ==========================
// to do:
// ==========================


// done
// test operation as a .widget, check it ALL works as expected
// test operation as a .widget on another machine, check it ALL works as expected
// tidy up functions and descriptions
// add machine guns on demand!
// add randomness to the two paired explosions
// f5 plays nothing, true
// add a menu link to my widgets on DeviantArt
// add a menu to facebook and other links if necessary (setmenu)
// make the ack ack explosions a little more frequent
// add Me109 animation s x 2
// add large explosion
// add fade in of the whole thing at the beginning
// add close button to the widget
// add modern metro-style volume toggle
// add price image click to make me 109s re-appear
// add menu link to DC Thompson
// add menu link to DeviantArt
// add menu link to 2nd about us page
// created 2nd about us page
// add green banner, badge and link to DC Thompson
// corrected the about us page text
// added a close button to the about us page
// added theme music
// added debug and editing options

// =========================================================


"use strict";

var mainWindow;

var windowx = 785, windowy = 622;
var backxo = 0, backyo = 0, backgroundxo = 7, backgroundyo = 0;

var currIcon = "Resources/images/dock.png";
var widgetName = "Commando Ywidget.widget";
var gunsFiring = false;

var kerpow = "Resources/sounds/kerpow.mp3";
var kerpow2 = "Resources/sounds/kerpow2.mp3";
var me109Long = "Resources/sounds/me109.mp3";
var me109Brief = "Resources/sounds/me109Brief.mp3";
var machineGunsShort = "Resources/sounds/machineGunsShort.mp3";
var machineGunsLong = "Resources/sounds/machineGunsLong.mp3";
var whistling = "Resources/sounds/whistling.mp3";
var bangs = "Resources/sounds/bangs.mp3";
var crump = "Resources/sounds/crump.mp3";
var crew = "Resources/sounds/crew.mp3";
var drone = "Resources/sounds/drone.mp3";
var distantexplosion = "Resources/sounds/distant-explosion.mp3";
var ting = "Resources/sounds/ting.mp3";
var theme = "Resources/sounds/theme.mp3";
var nothing = "Resources/sounds/nothing.mp3";

include("functions.js");
include("Resources/Licence/licence.js");

    	
//===============================================================
// this function is called when the widget loads
//===============================================================
widget.onload = function() {
    startup();
};
//=====================
//End function
//=====================


//===============================================================
// this function is
//===============================================================
function startup() {
    print("%-I-INFO, startup");

    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
		preferences.imageEditPref.hidden = false;
	} else {
		preferences.imageEditPref.hidden = true;
	}
    
    fadeMain();
    doTheSound();
    mainScreen();
    createLicence(mainWindow);
    setTooltips();

     
    setmenu();
    animateTimer.ticking = true;
    buildVitality(currIcon, 0); // build the dock vitality
}
//=====================
//End function
//=====================





//=================================
// widget inline button timer setup
//=================================
var lightsTimer = new Timer();
lightsTimer.ticking = true;
lightsTimer.interval =20;
//=================================
// timer ends
//=================================
//=================================
// timer to fade the buttons
//=================================
lightsTimer.onTimerFired = function () {
     searchLights();
};
//=====================
//End function
//=====================

//=================================
// widget inline button timer setup
//=================================
var ackackTimer = new Timer();
ackackTimer.ticking = true;
ackackTimer.interval = random(2,15);
var firingTimerCount = 0;
//=================================
// timer ends
//=================================
//=================================
// timer to fade the buttons
//=================================
ackackTimer.onTimerFired = function () {
    skyShells();  
};
//=====================
//End function
//=====================

//=================================
// widget inline button timer setup
//=================================
var firingTimer = new Timer();
firingTimer.ticking = false;
firingTimer.interval = .1;
var firingTimerCount = 0;
var firingTimer2Count = 0;
var firingCount = 0;
var firingAmount = 10;

//=================================
// timer ends
//=================================
//=================================
// timer to fade the buttons
//=================================
firingTimer.onTimerFired = function () {
     fireTheGuns();
};
//=====================
//End function
//=====================

//=================================
// widget inline button timer setup
//=================================
var groundTimer = new Timer();
groundTimer.ticking = true;
groundTimer.interval = random(6,35);
//=================================
// timer ends
//=================================


//=================================
// timer to fade the buttons
//=================================
groundTimer.onTimerFired = function () {
     if (gunsFiring) { return; }

      if (random(1,5) >= 4 ) {
        if (preferences.soundPref.value === "enabled") {
          	play(whistling, false);
        }
      }

      var z = new FadeAnimation( groundexplosion, 255, 350,
      animator.kEaseOut,fadeGroundExplosion);
      animator.start( z );
    function fadeGroundExplosion(){
        if (preferences.soundPref.value === "enabled") {
            play (crump,false);
        }
        var g = new FadeAnimation( groundexplosion, 0, 2050,
        animator.kEaseOut);
        animator.start( g );
    }
};
//=====================
//End function
//=====================

//=================================
// widget inline button timer setup
//=================================
var firingTimer2 = new Timer();
firingTimer2.ticking = false;
firingTimer2.interval = .1;
var firingTimerCount = 0;
var firingCount = 0;
//=================================
// timer ends
//=================================


//=================================
// widget inline button timer setup
//=================================
var salesTimer = new Timer();
salesTimer.ticking = true;
salesTimer.interval = 45;

//=================================
// timer ends
//=================================

//=================================
// timer to fade the buttons
//=================================
salesTimer.onTimerFired = function () {
     slideSalesPanel();
};
//=====================
//End function
//=====================


//=================================
// timer to fade the buttons
//=================================
firingTimer2.onTimerFired = function () {
    fireTheGuns();
};
//=====================
//End function
//=====================



//=================================
// function to flash in the various backgrounds that fire the guns and shake the scene
//=================================
function fireTheGuns() {
	gunsFiring = true;
    firingCount = firingCount + 1;
    firingTimerCount = firingTimerCount + 1;
    if (firingTimerCount === 1) {
      nonfiring.opacity=0;
      basewithflares.opacity=255;
      firing.opacity=0;
      firingwithtracer.opacity=0;
    }
    if (firingTimerCount === 2) {
      nonfiring.opacity=0;
      basewithflares.opacity=0;
      firing.opacity=255;
      firingwithtracer.opacity=0;
    }
    if (firingTimerCount === 3) {
      nonfiring.opacity=0;
      basewithflares.opacity=0;
      firing.opacity=0;
      firingwithtracer.opacity=255;
    }
    if (firingTimerCount === 4) {
      nonfiring.opacity=255;
      basewithflares.opacity=0;
      firing.opacity=0;
      firingwithtracer.opacity=0;
      firingTimerCount = 0 ;
    }
    if (firingCount === firingAmount) {
      nonfiring.opacity=255;
      basewithflares.opacity=0;
      firing.opacity=0;
      firingwithtracer.opacity=0;
      firingTimerCount = 0 ;
      firingTimer.ticking = false;
      firingTimer2.ticking = false;
      var z = new FadeAnimation( lines, 255, 3550,
      animator.kEaseOut, startSecondTimer);
      animator.start( z );
    }
};
 function startSecondTimer() {
      firingCount = 0;
      firingTimer2Count = firingTimer2Count + 1 ;
      firingAmount = 20;
      if (firingTimer2Count <= 1 ) {
        if (preferences.soundPref.value === "enabled") {
            play(machineGunsLong,false);
        }
        firingTimer2.ticking = true;
      } else {
      	 gunsFiring = false;
      	 searchLights() ;
      }
 }
//=================================
// End function to flash in the various backgrounds that fire the guns and shake the scene
//=================================


//=================================
// widget inline button timer setup
//=================================
var animateTimer = new Timer();
animateTimer.ticking = true;
animateTimer.interval = 5;
animateTimerCount = 1;
//=================================
// timer ends
//=================================

//=================================
// timer to fade the buttons
//=================================
animateTimer.onTimerFired = function () {
	mainAnimation();
};
//=====================
//End function
//=====================

//===============================================================
// this function animates the searchlights
//===============================================================
function searchLights() {
     if (gunsFiring) { return; }

      lightsTimer.interval =random(15,25);

      var a = new FadeAnimation( searchlightleft, 0, 1850,
      animator.kEaseOut);
      var aa = new FadeAnimation( shadowleft, 0, 1850,
      animator.kEaseOut);
      var aaa = new FadeAnimation( canopyreflections, 0, 1850,
      animator.kEaseOut,lightSearchLightLeft2);
      animator.start( new Array( a, aa, aaa ) );
 
    function lightSearchLightLeft2(){
      var e = new FadeAnimation( searchlightleft, 255, 1850,
      animator.kEaseOut);
      var ee = new FadeAnimation( canopyreflections, 255, 1850,
      animator.kEaseOut,bringShadowLeft2);
      animator.start( new Array( e, ee ) );
    }
    function bringShadowLeft2(){
      var f = new FadeAnimation( shadowleft, 255, 1850,
      animator.kEaseOut);
      var ff = new FadeAnimation( canopyreflections, 180, 1850,
      animator.kEaseOut,fadeSearchLightRight2);
      animator.start( new Array( f, ff ) );
    }
    function fadeSearchLightRight2(){
      var g = new FadeAnimation( searchlightright, 0, 850,
      animator.kEaseOut,relightSearchLightRight2);
      animator.start( g );
    }
    function relightSearchLightRight2(){
        if (preferences.soundPref.value === "enabled") {
            play(bangs, false);
        }
        var h = new FadeAnimation( searchlightright, 255, 1850,
        animator.kEaseOut);
        animator.start( h );
    }
};
//=====================
//End function
//=====================



//===============================================================
// this function captures the mouse scroll wheel
//===============================================================
nonfiring.onMouseWheel = function (event) {
	var size = Number(preferences.clockSize.value),
		maxLength = Number(preferences.clockSize.maxLength),
		minLength = Number(preferences.clockSize.minLength),
		ticks = Number(preferences.clockSize.ticks),
		step = Math.round((maxLength - minLength) / (ticks - 1));

	if (event.ctrlKey) {
		if (event.scrollDelta > 0) {
			if (preferences.MouseWheelPref.value === "up") {
				size -= step;
				if (size < minLength) {
					size = minLength;
				}
			} else {
				size += step;
				if (size > maxLength) {
					size = maxLength;
				}
			}
		} else if (event.scrollDelta < 0) {
			if (preferences.MouseWheelPref.value === "up") {
				size += step;
				if (size > maxLength) {
					size = maxLength;
				}
			} else {
				size -= step;
				if (size < minLength) {
					size = minLength;
				}
			}
		}
		preferences.clockSize.value = String(size);
	}
};
//=====================
//End function
//=====================



//===============================================================
// this function is called when the widget prefs are changed
//===============================================================
widget.onPreferencesChanged = function() {
    log("preferences Changed");
	savePreferences();	/// <<<<<<<<<<<<<
	sleep(1000);
    play(nothing,true); // this turns off all sound
    reloadWidget();
};
//=====================
//End function
//=====================


//===============================================================
// this function defines the keyboard events captured
//===============================================================
mainWindow.onKeyDown = function(event) {
                if (system.event.keyCode==116) { //F5
                    print("pressing "+system.event.keyCode);
                    play(nothing,true); // this turns off all sound
                    reloadWidget();
                }
   };
//=====================
//End function
//=====================


//===============================================================
// these functions animate the anti-aircraft shell fire
//===============================================================
function skyShells() {
    if (gunsFiring) { return; }    
    var x = random(200,270);
    var y = random(63,133);
    var a = new MoveAnimation( shell01, x  , y , 0,
    animator.kEaseOut);
    animator.start( a );
   
    var a = new FadeAnimation( shell01, 255, 150,
    animator.kEaseOut, fireshell02);
    animator.start( a );

    function fireshell02() {
        if (preferences.soundPref.value === "enabled") {
    	      play(distantexplosion,false);
        }
   
        var b = new FadeAnimation( shell01, 00, 2550,
        animator.kEaseOut);
       
        var x = random(338,378);
        var y = random(56,106);
        var a = new MoveAnimation( shell02, x , y , 0,
        animator.kEaseOut);
        animator.start( a );
        
        var bb = new FadeAnimation( shell02, 255, 150,
        animator.kEaseOut,fadeshell02);
        animator.start( new Array( b, bb ) );
    }
    function fadeshell02(){
        if (preferences.soundPref.value === "enabled") {
        	      play(distantexplosion,false);
        }
        var c = new FadeAnimation( shell02, 00, 2550,
        animator.kEaseOut,fireshell03);
        animator.start( c );   
    }
    function fireshell03(){
      var xx = random(1,5) ;
      if(xx >= 2 ) {
        if (preferences.soundPref.value === "enabled") {
    	   play(distantexplosion,false);
        }
        var d = new FadeAnimation( flash, 255, 250,
        animator.kEaseOut,fadeshell03);
        animator.start( d );            
      }
    }
    function fadeshell03(){
      var dd = new FadeAnimation( flash, 00, 1550,
      animator.kEaseOut);
      animator.start( dd );    
    }
   ackackTimer.interval = random(6,35);
}
//=====================
//End function
//=====================


//===============================================================
// these functions slides the green banner down from the top
//===============================================================
function slideSalesPanel(){
   var b = new MoveAnimation( sellIt, 00 , 480 , 2550,
   animator.kEaseOut, DoNothing);
   var bb = new FadeAnimation( sellIt, 255, 1500,
   animator.kEaseOut);
   animator.start( new Array( b, bb ) );
}
function DoNothing(){
   var b = new MoveAnimation( sellIt, 00 , 480 , 5550,
   animator.kEaseOut, slidesAway);
   animator.start( new Array( b) );
}
function slidesAway() {
   var b = new MoveAnimation( sellIt, -1000 , 480 , 2550,
   animator.kEaseOut);
   var bb = new FadeAnimation( sellIt, 0, 1500,
   animator.kEaseOut);
   animator.start( new Array( b, bb ) );
}
//=====================
//End function
//=====================


//===============================================================
// Main animation functions occurring in sequence
//===============================================================
    function mainAnimation() {
      animateTimer.ticking = false;
        var a = new MoveAnimation( commando, 0, 42 , 150,
        animator.kEaseOut, movePrice);
        animator.start( a );
        var z = new MoveAnimation( me109, -210 , 100 , 1000,
        animator.kEaseOut );
        animator.start( z );
    }
    function movePrice() {
        if (preferences.soundPref.value === "enabled") {
            play(kerpow2,false);
        }
        var b = new FadeAnimation( price, 255, 2550,
        animator.kEaseOut, moveTailendCharlie);
        animator.start( b );
    }
    function moveTailendCharlie(){
      var c = new MoveAnimation( tailendCharlie, 204 , 400 , 550,
      animator.kEaseIn,lightSearchLightRight);
      animator.start( c );
    }
    function lightSearchLightRight() {
        if (preferences.soundPref.value === "enabled") {
            play(kerpow,false);
        }
      var d = new FadeAnimation( searchlighton, 255, 1850,
      animator.kEaseOut);
      var dd = new FadeAnimation( searchlightright, 255, 1850,
      animator.kEaseOut,bringShadowRight);
      animator.start( new Array( d, dd ) );
    }
    function bringShadowRight() {
      var e = new FadeAnimation( shadowright, 255, 1850,
      animator.kEaseOut,lightSearchLightLeft);
      animator.start( e );
    }
    function lightSearchLightLeft() {
      var f = new FadeAnimation( searchlightleft, 255, 1850,
      animator.kEaseOut);
      var ff = new FadeAnimation( canopyreflections, 255, 1850,
      animator.kEaseOut,bringShadowLeft);
      animator.start( new Array( f, ff ) );
    }
    function bringShadowLeft() {
      var g = new FadeAnimation( shadowleft, 255, 1850,
      animator.kEaseOut);
      var gg = new FadeAnimation( canopyreflections, 180, 1850,
      animator.kEaseOut,fadeSearchLightRight);
      animator.start( new Array( g, gg ) );
    }
    function fadeSearchLightRight() {
      var h = new FadeAnimation( searchlightright, 0, 850,
      animator.kEaseOut,relightSearchLightRight);
      animator.start( h );
    }
    function relightSearchLightRight() {
      var i = new FadeAnimation( searchlightright, 255, 1850,
      animator.kEaseOut, arbitraryTimer);
      animator.start( i );
    }
    function arbitraryTimer() {
      var z = new FadeAnimation( lines, 255, 15550,
      animator.kEaseOut, arbitraryTimer2);
      animator.start( z );
    }
    function arbitraryTimer2() {
        if (preferences.soundPref.value === "enabled") {
            play(me109Long,false);
        }
        var z = new FadeAnimation( lines, 255, 1550,
        animator.kEaseOut, startFiringTimers);
        animator.start( z );
    }
    function startFiringTimers() {
        if (preferences.soundPref.value === "enabled") {
            play(machineGunsShort,false);
            play(me109Brief,false);
            play(me109Long,false);
        }
        firingTimer.ticking = true;
        me109.hoffset = 450;
        me109.voffset = 0;
        var z = new MoveAnimation( me109, -910 , 100 , 3100,
        animator.kEaseOut,anotherme109 );
        animator.start( z );
    }
    function anotherme109() {
        me109.hoffset = 450;
        me109.voffset = -10;
        var z = new MoveAnimation( me109, -410 , 10 , 2000,
        animator.kEaseOut );
        animator.start( z );
    }	
    function falseMe109() {
        if (preferences.soundPref.value === "enabled") {
            play(me109Long,false);
        }        
        me109.hoffset = 450;
        me109.voffset = 0;
        var z = new MoveAnimation( me109, 450 , 0, 4100,
        animator.kEaseOut, singleMe109 );
        animator.start( z );
    }	
    function singleMe109() {
        var z = new MoveAnimation( me109, -910 , 100 , 3100,
        animator.kEaseOut );
        animator.start( z );
    }        
//=====================
//End Main Animation functions
//=====================
     
//===============================================================
// this function opens the brower to DC Thomson
//===============================================================
nonfiring.onMultiClick = function() {
    CommandoComicsOnClick();
}
//=====================
//End function
//=====================

//===============================================================
// this function makes the controls appear
//===============================================================
nonfiring.onMouseEnter = function() {
    close.opacity = 255;
    set4.opacity = 255;
    knob.opacity = 255;
}
//=====================
//End function
//=====================

//===============================================================
// this function causes a plane to appear after a few seconds
//===============================================================
price.onMouseDown = function() {
    price.src = "Resources/images/pricepressed.png";        
}
//=====================
//End function
//=====================


//===============================================================
// this function toggleSound
//===============================================================
price.onMouseUp = function() {
    falseMe109();
    price.src = "Resources/images/price.png";        
}
//=====================
//End function
//=====================



//===============================================================
// this function causes the guns to fire on a turret click
//===============================================================
turret.onMouseDown = function() {
    firingTimer.interval = .1;
    firingTimerCount = 0;
    firingTimer2Count = 0;
    firingCount = 0;
    firingAmount = 10;
    startFiringTimers();

}
//=====================
//End function
//=====================


//===============================================================
// this function causes the controls to disappear
//===============================================================
nonfiring.onMouseExit = function() {
    close.opacity = 0;
    set4.opacity = 0;
    knob.opacity = 0;    
}
//=====================
//End function
//=====================


//===============================================================
// this function handles the close control
//===============================================================
close.onMouseDown = function() {
    closeWidget();
}
//=====================
//End function
//=====================

//===============================================================
// this function opens the brower to DC Thomson
//===============================================================
sellIt.onMouseDown = function() {
    CommandoComicsOnClick()
}
//=====================
//End function
//=====================

//===============================================================
// this function toggleSound
//===============================================================
knob.onMouseDown = function() {
    toggleSound();
}
//=====================
//End function
//=====================

//===============================================================
// this function fades the widget in on startup
//===============================================================
function fadeMain() {
    var e = new FadeAnimation( nonfiring, 255, 3000,
    animator.kEaseOut);
    var ee = new ResizeAnimation( nonfiring, 450 , 599 , 3000,
    animator.kEaseOut);
    var eeee = new MoveAnimation( nonfiring, 225 ,300 , 3000,
    animator.kEaseOut);
    animator.start( new Array( e, ee, eeee ) );
}    
//=====================
//End function
//=====================

//===============================================================
// this function enables/disables/plays sound effects
//===============================================================
function doTheSound() {
    play(nothing,true); // this turns off all sound
    if (system.platform === "windows" ) {
        preferences.widgetVolume.hidden = false;
        system.volume = parseInt(preferences.widgetVolume.value / 6.25);
    } else {
        preferences.widgetVolume.hidden = true;
    }
    if (preferences.soundPref.value === "enabled") {
        play(drone, false);
        play(crew, false);
        play(bangs, false);
        play(distantexplosion, false);
        play(theme, false);
    }
} 
//=====================
//End function
//=====================

//===============================================================
// this function setTooltips
//=============================================================== 
 function setTooltips() {
    if (preferences.soundPref.value === "enabled") {
        knob.hOffset = 358;
        knob.tooltip="click to turn sound OFF";
        set4.tooltip="click to turn sound OFF";
    } else {
        knob.hOffset = 382;
        knob.tooltip="click to turn sound ON";
        set4.tooltip="click to turn sound ON";
    }
    nonfiring.tooltip = "press F5 to restart";
    sellIt.tooltip = "click here to visit Commando Comic's Site!";
    close.tooltip = "close Widget";
    turret.tooltip = "click to fire guns";
    price.tooltip = "click for a Me109";
}
//=====================
//End function
//=====================




//===============================================================
// this function toggleSound
//===============================================================
commando.onMouseDown = function() {
        commando.src = "Resources/images/commandopressed.png";        
}
//=====================
//End function
//=====================

//===============================================================
// this function toggleSound
//===============================================================
commando.onMouseUp = function() {
        play(theme, false);                 
        commando.src = "Resources/images/commando.png";        
}
//=====================
//End function
//=====================
