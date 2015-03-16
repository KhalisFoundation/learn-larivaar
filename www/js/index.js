var dark                  = window.localStorage["dark"] || 0;
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  StatusBar.show();
  if (dark) {
    StatusBar.backgroundColorByHexString('333333');
  } else {
    StatusBar.styleDefault();
  }
  window.localStorage["no_smartbanner"] = 1;
  $("#smartbanner").remove();
  $("body").removeClass("smartbanner");
  $("script[src='js/jquery.smartbanner.js']").remove();
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
    ga('send','event','button','click','settings'); 
  });
  $("*").on("click", function(e){
    if ($(e.target).attr("id") !== "settings_button" && $(e.target).parents("#settings_button").length < 1 && $("#settings").is(":visible")) {
      if($(e.target).parents("#settings").length < 1) {
        $("#settings").toggle();
      }
    }
  });
  $(".bigger").click(function () {
    font_size += 1;
    $("#paatth").css("font-size", font_size + "px");
    window.localStorage["font_size"] = font_size;
    ga('send','event','setting','change','zoom','in');
  });
  $(".smaller").click(function () {
    font_size -= 1;
    $("#paatth").css("font-size", font_size + "px");
    window.localStorage["font_size"] = font_size;
    ga('send','event','setting','change','zoom','out');
  });
  $(".submit_ang").submit(function(event) {
    ang = $(this).find("input").val();
    setAng(ang);
    ga('send','event','submit','ang',ang);
    $('.ang').blur();
    event.preventDefault();
  });
  $("#navigation a.minus1, #navigation a.plus1").click(function () {
    setAng($(this).data("ang"));
    if ($(this).hasClass('minus1')) {
      ga('send','event','button','click','nav arrows','prev');
    } else {
      ga('send','event','button','click','nav arrows','next');
    }
  });
  $(".ang").focus(function(){
    $(this).select();
  })
  $(".setting").click(function () {
    setting = $(this).data("setting");
    data_on = $(this).data("on");
    if (data_on == "0") {
      window.localStorage[setting] = 1;
      $(this).data("on", "1");
      switch(setting) {
        case "larreevaar_assistance":
          $(this).addClass(setting);
          $("#paatth").addClass(setting);
          ga('send','event','button','click','assist','on');
          break;
        case "larreevaar":
          $("#paatth").addClass(setting);
          ga('send','event','setting','change','larreevaar','on');
          break;
        case "swipe_nav":
          swipe_nav = 1;
          ga('send','event','setting','change','swipe','on');
          break;
        case "dark":
          $("body").addClass(setting);
          ga('send','event','setting','change','dark','on');
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
          $("#paatth").removeClass(setting);
          ga('send','event','button','click','assist','off');
          break;
        case "larreevaar":
          $("#paatth").removeClass(setting);
          ga('send','event','setting','change','larreevaar','off');
          break;
        case "swipe_nav":
          swipe_nav = 0;
          ga('send','event','setting','change','swipe','off');
          break;
        case "dark":
          $("body").removeClass(setting);
          ga('send','event','setting','change','dark','off');
          break;
      }
      if ($(this).hasClass("checkbox")) {
        $(this).find("i.fa-check-square-o").removeClass("fa-check-square-o").addClass("fa-square-o");
      }
    }
  });
  if (!window.localStorage['no_smartbanner']) {
    $.smartbanner({
      layer: true,
      speedIn: 400
    });
  }
  if (swipe_nav) {
    var myElement = document.getElementById('paatth');
    var mc = new Hammer(myElement);
    mc.get("swipe").set({
      direction: Hammer.DIRECTION_HORIZONTAL,
      velocity: 0.2
    })
    mc.on("swipeleft swiperight", function(ev) {
      switch(ev.type) {
        case 'swiperight':
          $(".minus1").click();
          ga('send','event','swipe','right');
          break;
        case "swipeleft":
          $(".plus1").click();
          ga('send','event','swipe','left');
          break;
      }
    });
  }
});