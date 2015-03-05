var dark                  = window.localStorage["dark"] || 0;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  StatusBar.show();
  if (dark) {
    StatusBar.backgroundColorByHexString('333333');
  } else {
    StatusBar.styleDefault();
  }
}

var swipe_nav = window.localStorage["swipe_nav"] || 1;

var setAng = function(ang, store) {
  store = typeof store !== 'undefined' ? store : true;
  //Make sure it's an Ang within the proper range or set to 1
  var ang = parseInt(ang);
  if (ang < 1 || ang > 1430) ang = 1;
  //Set the one before and one after
  var minus1                = ((ang - 1) >= 1 ? (ang - 1) : 1);
  var plus1                 = ((ang + 1) <= 1430 ? (ang + 1) : 1430);
  $(".ang").val(ang);
  $(".minus1").data("ang", minus1);
  $(".plus1").data("ang", plus1);
  var newPaatth = '';
  $.get("paatth/" + ang + ".html", function(data) {
    shabads = data.split(' ');
    $.each(shabads, function(index,val){
      if(val.indexOf('॥') !== -1) {
        tag = "i";
      } else {
        tag = "span";
      }
      newPaatth += "<" + tag + ">" + val + (tag == "i" ? " " : "") + "</" + tag + "> ";
    });
    $("#paatth").html(newPaatth);
    window.scrollTo(0,0);
  });
  if (store === true) {
    window.localStorage["ang"] = ang;
  }
}
$(function() {
  var ang                   = window.localStorage["ang"] || 1;
  //Settings
  var font_size             = window.localStorage["font_size"] || 20;
  var larreevaar            = window.localStorage["larreevaar"] || 1;
  var larreevaar_assistance = window.localStorage["larreevaar_assistance"] || 0;
  setAng(ang, false);
  font_size = parseInt(font_size);
  $("#paatth").css("font-size", font_size + "px");
  $(".setting[data-setting='larreevaar']").data("on", larreevaar);
  $("#larreevaar_assistance").data("on", larreevaar_assistance);
  if (larreevaar == 1)            $("#paatth").addClass("larreevaar");
  if (larreevaar_assistance == 1) $("#paatth, #larreevaar_assistance").addClass("larreevaar_assistance");
  $(".setting[data-setting='swipe_nav']").data("on", swipe_nav);
  $(".setting[data-setting='dark']").data("on", dark);
  if (dark == 1)                  $("body").addClass("dark");
  //Change checkboxes to checked for settings that are on
  $(".setting.checkbox").each(function(){
    if ($(this).data("on") == "1") {
      $(this).find("i").removeClass("fa-square-o").addClass("fa-check-square-o");
    }
  });

  $("#settings_button").click(function() {
    $("#settings").toggle();
  })
  $("body").on("click", ".bigger", function () {
    font_size += 1;
    $("#paatth").css("font-size", font_size + "px");
    window.localStorage["font_size"] = font_size;
  });
  $("body").on("click", ".smaller", function () {
    font_size -= 1;
    $("#paatth").css("font-size", font_size + "px");
    window.localStorage["font_size"] = font_size;
  });
  $("body").on("submit", ".submit_ang", function(event) {
    setAng($(this).find("input").val());
    $('.ang').blur();
    event.preventDefault();
  });
  $("body").on("click", "#navigation a.minus1, #navigation a.plus1", function () {
    setAng($(this).data("ang"));
  });
  $("body").on("focus", ".ang", function(){
    $(this).select();
  })
  $(".setting").click(function () {
    setting = $(this).data("setting");
    if ($(this).data("on") == "0") {
      window.localStorage[setting] = 1;
      $(this).data("on", "1");
      switch(setting) {
        case "larreevaar_assistance":
          $(this).addClass(setting);
        case "larreevaar":
          $("#paatth").addClass(setting);
          break;
        case "swipe_nav":
          swipe_nav = 1;
          break;
        case "dark":
          $("body").addClass(setting);
          break;
      }
      if ($(this).hasClass("checkbox")) {
        $(this).find("i.fa-square-o").removeClass("fa-square-o").addClass("fa-check-square-o");
      }
    } else {
      window.localStorage[$(this).data("setting")] = 0;
      $(this).data("on", "0");
      switch(setting) {
        case "larreevaar_assistance":
          $(this).removeClass(setting);
        case "larreevaar":
          $("#paatth").removeClass(setting);
          break;
        case "swipe_nav":
          swipe_nav = 0;
          break;
        case "dark":
          $("body").removeClass(setting);
          break;
      }
      if ($(this).hasClass("checkbox")) {
        $(this).find("i.fa-check-square-o").removeClass("fa-check-square-o").addClass("fa-square-o");
      }
    }
  });
});
// TOUCH-EVENTS SINGLE-FINGER SWIPE-SENSING JAVASCRIPT
// Courtesy of PADILICIOUS.COM and MACOSXAUTOMATION.COM

// this script can be used with one or more page elements to perform actions based on them being swiped with a single finger

var triggerElementID = null; // this variable is used to identity the triggering element
var fingerCount = 0;
var startX = 0;
var startY = 0;
var curX = 0;
var curY = 0;
var deltaX = 0;
var deltaY = 0;
var horzDiff = 0;
var vertDiff = 0;
var minLength = 72; // the shortest distance the user may swipe
var swipeLength = 0;
var swipeAngle = null;
var swipeDirection = null;

// The 4 Touch Event Handlers

// NOTE: the touchStart handler should also receive the ID of the triggering element
// make sure its ID is passed in the event call placed in the element declaration, like:
// <div id="picture-frame" ontouchstart="touchStart(event,'picture-frame');"  ontouchend="touchEnd(event);" ontouchmove="touchMove(event);" ontouchcancel="touchCancel(event);">

function touchStart(event,passedName) {
  if (swipe_nav) {
    // disable the standard ability to select the touched object
    //event.preventDefault();
    // get the total number of fingers touching the screen
    fingerCount = event.touches.length;
    // since we're looking for a swipe (single finger) and not a gesture (multiple fingers),
    // check that only one finger was used
    if ( fingerCount == 1 ) {
      // get the coordinates of the touch
      startX = event.touches[0].pageX;
      startY = event.touches[0].pageY;
      // store the triggering element ID
      triggerElementID = passedName;
    } else {
      // more than one finger touched so cancel
      touchCancel(event);
    }
  }
}

function touchMove(event) {
  if (swipe_nav) {
    //event.preventDefault();
    if ( event.touches.length == 1 ) {
      curX = event.touches[0].pageX;
      curY = event.touches[0].pageY;
    } else {
      touchCancel(event);
    }
  }
}

function touchEnd(event) {
  if (swipe_nav) {
    //event.preventDefault();
    // check to see if more than one finger was used and that there is an ending coordinate
    if ( fingerCount == 1 && curX != 0 ) {
      // use the Distance Formula to determine the length of the swipe
      swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX,2) + Math.pow(curY - startY,2)));
      // if the user swiped more than the minimum length, perform the appropriate action
      if ( swipeLength >= minLength ) {
        caluculateAngle();
        determineSwipeDirection();
        processingRoutine();
        touchCancel(event); // reset the variables
      } else {
        touchCancel(event);
      } 
    } else {
      touchCancel(event);
    }
  }
}

function touchCancel(event) {
  // reset the variables back to default values
  fingerCount = 0;
  startX = 0;
  startY = 0;
  curX = 0;
  curY = 0;
  deltaX = 0;
  deltaY = 0;
  horzDiff = 0;
  vertDiff = 0;
  swipeLength = 0;
  swipeAngle = null;
  swipeDirection = null;
  triggerElementID = null;
}

function caluculateAngle() {
  var X = startX-curX;
  var Y = curY-startY;
  var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); //the distance - rounded - in pixels
  var r = Math.atan2(Y,X); //angle in radians (Cartesian system)
  swipeAngle = Math.round(r*180/Math.PI); //angle in degrees
  if ( swipeAngle < 0 ) { swipeAngle =  360 - Math.abs(swipeAngle); }
}

function determineSwipeDirection() {
  if ( (swipeAngle <= 25) && (swipeAngle >= 0) ) {
    swipeDirection = 'left';
  } else if ( (swipeAngle <= 360) && (swipeAngle >= 335) ) {
    swipeDirection = 'left';
  } else if ( (swipeAngle >= 155) && (swipeAngle <= 205) ) {
    swipeDirection = 'right';
  } else if ( (swipeAngle > 25) && (swipeAngle < 155) ) {
    swipeDirection = 'down';
  } else {
    swipeDirection = 'up';
  }
}

function processingRoutine() {
  var swipedElement = document.getElementById(triggerElementID);
  if ( swipeDirection == 'left' ) {
    $(".plus1").click();
  } else if ( swipeDirection == 'right' ) {
    $(".minus1").click();
  } else if ( swipeDirection == 'up' ) {
    // REPLACE WITH YOUR ROUTINES
    //swipedElement.style.backgroundColor = 'maroon';
  } else if ( swipeDirection == 'down' ) {
    // REPLACE WITH YOUR ROUTINES
    //swipedElement.style.backgroundColor = 'purple';
  }
}