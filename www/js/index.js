var setAng = function(ang, store) {
  store = typeof store !== 'undefined' ? store : true;
  //Make sure it's an Ang within the proper range or set to 1
  var ang = parseInt(ang);
  if (ang < 1 || ang > 1430) ang = 1;
  //Set the one before and one after
  var minus1                = ((ang - 1) >= 1 ? (ang - 1) : 1);
  var plus1                 = ((ang + 1) <= 1430 ? (ang + 1) : 1430);
  $(".ang").val(ang);
  $(".minus1").text(minus1);
  $(".plus1").text(plus1);
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
//              $newPaatth .= '<' . $tag . '>' . $shabad . ($tag == 'i' ? ' ' : '') . '</' . $tag . '> ';
  });
  if (store === true) {
    window.localStorage["ang"] = ang;
  }
}
$(function() {
  var ang                   = window.localStorage["ang"] || 1;
  var font_size             = window.localStorage["font_size"] || 20;
  var larreevaar            = window.localStorage["larreevaar"] || 0;
  var larreevaar_assistance = window.localStorage["larreevaar_assistance"] || 0;
  setAng(ang, false);
  $("#paatth").css("font-size", font_size + "px");
  $("#larreevaar_padchhed").data("on", larreevaar);
  $("#larreevaar_assistance").data("on", larreevaar_assistance);
  if (larreevaar == 1)            $("#paatth, #larreevaar_padchhed").addClass("larreevaar");
  if (larreevaar_assistance == 1) $("#paatth, #larreevaar_assistance").addClass("larreevaar_assistance");

  $("body").on("click", ".bigger", function () {
    font_size += 1;
    $("#paatth").css("font-size", font_size + "px");
    window.localStorage["font_size"] = font_size;
  });
  $("body").on("click", ".smaller", function () {
    font_size -= 1;
    $("#paatth").css("font-size", font_size + "px");
    window.localStorage["font-size"] = font_size;
  });
  $("body").on("submit", ".submit_ang", function(event) {
    setAng($(this).find("input").val());
    event.preventDefault();
  });
  $("body").on("click", ".navigation button", function () {
    setAng($(this).text());
  });
  $("body").on("focus", ".ang", function(){
    $(this).select();
  })
  $(".setting").click(function () {
    if ($(this).data("on") == "0") {
      window.localStorage[$(this).data("setting")] = 1;
      $(this).add("#paatth").addClass($(this).attr("data-setting"));
      $(this).data("on", "1");
    } else {
      window.localStorage[$(this).data("setting")] = 0;
      $(this).add("#paatth").removeClass($(this).attr("data-setting"));
      $(this).data("on", "0");
    }
  });
  $(".navigation").clone().appendTo("body");
});