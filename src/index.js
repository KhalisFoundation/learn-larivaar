import React from 'react';
import { render } from 'react-dom';

// Components
import Root from './app/Root';

const App = () => (
  <Root />
);

// Settings
let ang = window.localStorage.ang || 1;
let font_size = window.localStorage.font_size || 20;
const dark = window.localStorage.dark || 0;
let samaaptee = window.localStorage.samaaptee || null;
let daily = window.localStorage.daily || null;
let today_date = window.localStorage.today_date || null;
let today_start = window.localStorage.today_start || null;
let today_read = ang - today_start;
let daily_total = 0;
let swipe_nav = parseInt(window.localStorage.swipe_nav) || 1;
const larreevaar = window.localStorage.larreevaar || 1;
const larreevaar_assistance = window.localStorage.larreevaar_assistance || 0;
let lang = 'en';// window.localStorage["lang"]                   || "en";
let bookmark_index = window.localStorage.bookmark_index || null;
let bookmark_ang = window.localStorage.bookmark_ang || null;
let backButtonClose = false;
const keep_awake = window.localStorage.keep_awake || 0;
const lefthand = window.localStorage.lefthand || 0;

document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  document.body.classList.add(`h${window.screen.height}`);
  document.body.classList.add(screen.orientation.type);
  screen.orientation.addEventListener('change', () => {
    document.body.classList.remove('portrait-primary');
    document.body.classList.remove('landscape-primary');
    document.body.classList.remove('landscape-secondary');
    document.body.classList.add(screen.orientation.type);
  });
  render(<App />, document.getElementById('app'));
  // Override back button
  init();
  document.addEventListener('backbutton', () => { onBackButton(false); }, false);
}

function init() {
  setAng(ang, false);
  if (samaaptee) {
    calculateDailyAngs(samaaptee, ang);
  } else if (daily) {
    daily_total = daily;
    calculateSamaapteeDate(daily, ang);
  }
  // Check if today var is actually today or reset
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  let today_string = new Date(Date.UTC(year, month, day));
  today_string = formatDate(today);
  if (today_string != today_date) {
    window.localStorage.today_date = today_date = today_string;
    window.localStorage.today_start = today_start = ang;
  }
  updateProgress();
  font_size = parseInt(font_size);
  $('#paatth').css('font-size', `${font_size}px`);
  $(".setting[data-setting='larreevaar']").data('on', larreevaar);
  $('#larreevaar_assistance').data('on', larreevaar_assistance);
  if (larreevaar == 1) $('body, #paatth').addClass('larreevaar');
  if (larreevaar_assistance == 1) $('#paatth, #larreevaar_assistance').addClass('larreevaar_assistance');
  $(".setting[data-setting='swipe_nav']").data('on', swipe_nav);
  $(".setting[data-setting='dark']").data('on', dark);
  if (dark == 1) {
    $('body').addClass('dark');
    if (typeof StatusBar !== 'undefined') {
      StatusBar.backgroundColorByHexString('#222');
      StatusBar.styleLightContent();
    }
  } else if (dark !== 1 && typeof StatusBar !== 'undefined') {
    StatusBar.styleDefault();
  }
  $(".setting[data-setting='keep_awake']").data('on', keep_awake);
  if (keep_awake == 1) window.plugins.insomnia.keepAwake();
  $(".setting[data-setting='lefthand']").data('on', lefthand);
  if (lefthand == 1) $('body').addClass('lefthand');
  $('body').addClass(`lang_${lang}`);
  $(`.setting[data-setting='lang'][data-value='${lang}']`).addClass('cur');
  if (bookmark_ang != null && bookmark_index != null) {
    bookmark_ang = parseInt(bookmark_ang);
    bookmark_index = parseInt(bookmark_index);
  }
  // if (Modernizr.inputtypes.date) {
  const tomorrow = new Date(Date.UTC(year, month, (day + 1)));
  const tomorrow_string = formatDate(tomorrow);
  // $("#samaaptee_date_input").attr("min",tomorrow_string);
  // } else {
  $('#samaaptee_date_input').datepicker({
    // altField: "#samaaptee_date_input",
    format: 'yyyy-mm-dd',
  })
    .val(samaaptee)
    .on('changeDate', function (ev) {
      if (ev.date.valueOf() < tomorrow.valueOf()) {
        Materialize.toast('Please choose a date in the future.', 4000);
        $('#samaaptee_date_input').datepicker('setValue', tomorrow_string);
      } else {
        const new_samaaptee = $(this).val();
        $('#samaaptee_date_input').datepicker('hide');
        window.localStorage.samaaptee = samaaptee = new_samaaptee;
        window.localStorage.removeItem('daily');
        daily = null;
        $('#daily_angs_input').val('');
        $('#daily_angs_projected_samaaptee').text('').parent('#daily_angs_projected_samaaptee_cont').hide();
        calculateDailyAngs(samaaptee, ang);
        updateProgress();
      }
    });
  if (samaaptee) {
    $('#samaaptee_date_input').datepicker('setValue', samaaptee);
  }
  // }
  $('#daily_angs_input').val(daily);
  // Change checkboxes to checked for settings that are on
  $('.setting.checkbox').each(function () {
    if ($(this).data('on') == '1') {
      $(this).find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
    }
  });
}

function calculateDailyAngs(samaaptee, ang) {
  const samaaptee_date = processDate(samaaptee);
  const daily_angs = Math.ceil((1430 - ang + 1) / samaaptee_date.diff);
  $('#samaaptee_daily_angs').text(daily_angs).parent('#samaaptee_daily_angs_cont').show();
  $('#samaaptee_modal_trigger').removeClass('set').addClass('edit');
  $('#daily_modal_trigger').addClass('set').removeClass('edit');
  daily_total = daily_angs;
}
function calculateSamaapteeDate(angs, ang) {
  // Days left
  const days_left = Math.ceil((1430 - ang + 1) / angs);
  const date = new Date();
  const samaaptee_date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), (date.getDate() + days_left)));
  $('#daily_angs_projected_samaaptee').text(formatDate(samaaptee_date)).parent('#daily_angs_projected_samaaptee_cont').show();
  $('#daily_modal_trigger').removeClass('set').addClass('edit');
  $('#samaaptee_modal_trigger').addClass('set').removeClass('edit');
}

function updateProgress() {
  if (daily_total > 0) {
    today_read = ang - today_start;
    let percent = Math.round((today_read / daily_total * 100), 1);
    if (percent > 100) {
      percent = 100;
    } else if (percent < 0) {
      percent = 0;
    }
    $('#sehaj_paatth_progress').show().parent('a').addClass('hide-arrow');
    $('#sehaj_paatth_today_read').text(today_read);
    $('#sehaj_paatth_daily_total').text(daily_total);
    $('#sehaj_paatth_setting_progress_bar').css('width', `${percent}%`);
  } else {
    $('#sehaj_paatth_progress').hide().parent('a').removeClass('hide-arow');
    $('#sehaj_paatth_setting_progress_bar').css('width', 0);
  }
}

function processDate(future_date) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const new_date = new Date(future_date);
  let today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  today = new Date(Date.UTC(year, month, day));

  return {
    diff: Math.round((new_date.getTime() - today.getTime()) / (oneDay)),
    new_date: formatDate(new_date),
  };
}

function formatDate(date) {
  const year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  month = (month < 10) ? `0${month}` : month;
  day = (day < 10) ? `0${day}` : day;

  return `${year}-${month}-${day}`;
}

function setAng(set_ang, store) {
  store = typeof store !== 'undefined' ? store : true;
  // Make sure it's an Ang within the proper range or set to 1
  var set_ang = parseInt(set_ang);
  if (set_ang < 1 || set_ang > 1430) set_ang = 1;
  // Set the one before and one after
  const minus1 = ((set_ang - 1) >= 1 ? (set_ang - 1) : 1);
  const plus1 = ((set_ang + 1) <= 1430 ? (set_ang + 1) : 1430);
  $('.ang').val(set_ang);
  ang = set_ang;
  $('.minus1').data('ang', minus1);
  $('.plus1').data('ang', plus1);
  let newPaatth = '';
  $.get(`paatth/${ang}.html`, (data) => {
    const shabads = data.split(' ');
    let tag;
    $.each(shabads, (index, val) => {
      if (val.indexOf('॥') !== -1) {
        tag = 'i';
      } else {
        tag = 'span';
      }
      newPaatth += `<${tag}>${val}${tag == 'i' ? ' ' : ''}</${tag}> `;
    });
    $('#paatth').html(newPaatth);
    // Check for bookmark, insert it and scroll to
    if (bookmark_ang == ang && bookmark_index > -1) {
      $('#paatth *').eq(bookmark_index).after($('<i></i>').addClass('fa fa-bookmark'));
      window.scrollTo(0, $('i.fa.fa-bookmark').offset().top - 58);
    } else {
      window.scrollTo(0, 0);
    }
  });
  if (store === true) {
    window.localStorage.ang = ang;
    // Check for bookmark and remove
    if (bookmark_ang) {
      window.localStorage.removeItem('bookmark_ang');
      window.localStorage.removeItem('bookmark_index');
      bookmark_ang = null;
      bookmark_index = null;
      Materialize.toast('Bookmark removed', 4000);
    }
  } else {
    // Loading for the first time
    // Check for bookmark, insert it and scroll to
    if (bookmark_ang == ang && bookmark_index > -1) $('#paatth *').eq(bookmark_index).after($('<i></i>').addClass('fa fa-bookmark'));
  }
}

function onBackButton(esc_button) {
  esc_button = typeof esc_button !== 'undefined' ? esc_button : false;
  if ($('.datepicker:visible').length > 0) {
    $('#samaaptee_date_input').blur().datepicker('hide');
  } else if ($('.modal:visible').length > 0) {
    $('.modal').closeModal();
  } else if (parseInt($('.side-nav.right-aligned').css('right')) == 0 || parseInt($('.side-nav.left-aligned').css('left')) == 0) {
    $('.button-collapse').sideNav('hide');
  } else if (!esc_button) {
    if (backButtonClose == true) {
      navigator.app.exitApp();
    } else {
      backButtonClose = true;
      Materialize.toast('Press again to exit', 4000, '', () => { backButtonClose = false; });
    }
  }
}
$(() => {
  $('.external-link').click(function () {
    const externalLink = $(this).attr('href');
    cordova.plugins.browsertab.isAvailable((result) => {
      if (!result) {
        cordova.InAppBrowser.open(externalLink, '_system');
      } else {
        cordova.plugins.browsertab.openUrl(externalLink);
      }
    });
  });

  $('.browser-link').click(() => {
    const browserLink = $(this).attr('href');
    window.open(browserLink, '_system');
    return false;
  });

  $('#settings_button').click(() => {
    $('.button-collapse').sideNav('show');
    /* $('#settings_button').toggleClass('selected'); */
    ga('send', 'event', 'button', 'click', 'settings');
  });
  // FONT SIZE
  $('.bigger').click(() => {
    font_size += 1;
    $('#paatth').css('font-size', `${font_size}px`);
    window.localStorage.font_size = font_size;
    ga('send', 'event', 'setting', 'change', 'zoom', 'in');
  });
  $('.smaller').click(() => {
    font_size -= 1;
    $('#paatth').css('font-size', `${font_size}px`);
    window.localStorage.font_size = font_size;
    ga('send', 'event', 'setting', 'change', 'zoom', 'out');
  });
  // CHANGE ANG
  $('.ang').blur(() => {
    $('.submit_ang').submit();
  }).keypress(function (event) {
    if (event.keyCode == 13) {
      $(this).blur();
      event.preventDefault();
    }
  });
  $('.ang').blur(function (event) {
    const newAng = parseInt($(this).val());
    if (newAng != ang) {
      ang = newAng;
      setAng(ang);
      window.localStorage.today_start = today_start = ang;
      if (samaaptee) {
        calculateDailyAngs(samaaptee, ang);
      }
      updateProgress();
      ga('send', 'event', 'submit', 'ang', ang);
      event.preventDefault();
    }
  });
  $('#navigation a.minus1, #navigation a.plus1').click(function () {
    setAng($(this).data('ang'));
    if ($(this).hasClass('minus1')) {
      ga('send', 'event', 'button', 'click', 'nav arrows', 'prev');
    } else {
      ga('send', 'event', 'button', 'click', 'nav arrows', 'next');
    }
    updateProgress();
  });
  $('.ang').focus(function () {
    $(this).select();
  });
  $('.setting').click(function () {
    setting = $(this).data('setting');
    data_on = $(this).data('on');
    if (data_on == '0') {
      window.localStorage[setting] = 1;
      $(this).data('on', '1');
      switch (setting) {
        case 'larreevaar_assistance':
          $(this).addClass(setting);
          $('#paatth').addClass(setting);
          ga('send', 'event', 'button', 'click', 'assist', 'on');
          break;
        case 'larreevaar':
          $('body, #paatth').addClass(setting);
          ga('send', 'event', 'setting', 'change', 'larreevaar', 'on');
          break;
        case 'swipe_nav':
          swipe_nav = 1;
          ga('send', 'event', 'setting', 'change', 'swipe', 'on');
          break;
        case 'dark':
          $('body').addClass(setting);
          if (typeof StatusBar !== 'undefined') {
            StatusBar.backgroundColorByHexString('#222');
            StatusBar.styleLightContent();
          }
          ga('send', 'event', 'setting', 'change', 'dark', 'on');
          break;
        case 'keep_awake':
          window.plugins.insomnia.keepAwake();
          ga('send', 'event', 'setting', 'change', 'keep_awake', 'on');
          break;
        case 'lefthand':
          $('body').addClass(setting);
          ga('send', 'event', 'setting', 'change', 'lefthand', 'on');
          break;
      }
      if ($(this).hasClass('checkbox')) {
        $(this).find('i.fa-square-o').removeClass('fa-square-o').addClass('fa-check-square-o');
      }
    } else if (data_on == '1') {
      window.localStorage[$(this).data('setting')] = 0;
      $(this).data('on', '0');
      switch (setting) {
        case 'larreevaar_assistance':
          $(this).removeClass(setting);
          $('#paatth').removeClass(setting);
          ga('send', 'event', 'button', 'click', 'assist', 'off');
          break;
        case 'larreevaar':
          $('body, #paatth').removeClass(setting);
          ga('send', 'event', 'setting', 'change', 'larreevaar', 'off');
          break;
        case 'swipe_nav':
          swipe_nav = 0;
          ga('send', 'event', 'setting', 'change', 'swipe', 'off');
          break;
        case 'dark':
          $('body').removeClass(setting);
          if (typeof StatusBar !== 'undefined') {
            StatusBar.backgroundColorByHexString('#fff');
            StatusBar.styleDefault();
          }
          ga('send', 'event', 'setting', 'change', 'dark', 'off');
          break;
        case 'keep_awake':
          window.plugins.insomnia.allowSleepAgain();
          ga('send', 'event', 'setting', 'change', 'keep_awake', 'off');
          break;
        case 'lefthand':
          $('body').removeClass(setting);
          ga('send', 'event', 'setting', 'change', 'lefthand', 'off');
          break;
      }
      if ($(this).hasClass('checkbox')) {
        $(this).find('i.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-square-o');
      }
    } else {
      switch (setting) {
        case 'lang':
          lang = $(this).data('value');
          $('body').removeClass((index, css) => (css.match(/\blang_\S+/g) || []).join(' '));
          $('body').addClass(`lang_${lang}`);
          ga('send', 'event', 'setting', 'change', 'lang', lang);
          window.localStorage.lang = lang;
          $(".setting[data-setting='lang']").removeClass('cur');
          $(`.setting[data-setting='lang'][data-value='${lang}']`).addClass('cur');
          break;
      }
    }
  });
  $('#daily_angs_input').change(function () {
    let new_daily = parseInt($(this).val());
    if (new_daily > 0) {
      new_daily = (new_daily > 1430) ? 1430 : new_daily;
      window.localStorage.daily = daily = daily_total = new_daily;
      window.localStorage.removeItem('samaaptee');
      $(this).val(new_daily);
      calculateSamaapteeDate(daily, ang);
      updateProgress();
      samaaptee = null;
      $('#samaaptee_date_input').val('');
      $('#samaaptee_daily_angs').text('').parent('#samaaptee_daily_angs_cont').hide();
    } else if (new_daily == 0) {
      window.localStorage.removeItem('daily');
      daily = daily_total = null;
      $('#daily_angs_projected_samaaptee').text('').parent('#daily_angs_projected_samaaptee_cont').hide();
      window.localStorage.removeItem('samaaptee');
      samaaptee = null;
      $('#samaaptee_date_input').val('');
      $('#samaaptee_daily_angs').text('').parent('#samaaptee_daily_angs_cont').hide();
      updateProgress();
    } else {
      alert('Invalid number');
    }
  });
  // Hammer gesture recognition
  const myElement = document.getElementById('paatth');
  const mc = new Hammer(myElement);
  // Bookmarking
  mc.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
  mc.add(new Hammer.Tap());
  mc.get('doubletap').recognizeWith('tap');
  mc.on('doubletap', (ev) => {
    let prev_i_index;


    let next_i_index;

    $('#paatth i.fa.fa-bookmark').remove();
    const doubletap_index = $(ev.target).index();
    if (ev.target.tagName == 'I') {
      bookmark_index = doubletap_index;
    } else {
      // Find closest <i> and put bookmark after
      prev_i_index = $(ev.target).prevAll('i').eq(0).index();
      next_i_index = $(ev.target).nextAll('i').eq(0).index();
      if ((doubletap_index - prev_i_index) < (next_i_index - doubletap_index)) {
        // Prev <i> is closer
        bookmark_index = prev_i_index;
      } else {
        // Next <i> is closer
        bookmark_index = next_i_index;
      }
    }
    // Set localStorage variable and add icon
    window.localStorage.bookmark_index = bookmark_index;
    window.localStorage.bookmark_ang = ang;
    bookmark_ang = ang;
    $('#paatth *').eq(bookmark_index).after($('<i></i>').addClass('fa fa-bookmark'));
  });
  mc.get('swipe').set({
    direction: Hammer.DIRECTION_HORIZONTAL,
    velocity: 0.2,
  });
  mc.on('swipeleft swiperight', (ev) => {
    if (swipe_nav == 1) {
      switch (ev.type) {
        case 'swiperight':
          $('.minus1').click();
          ga('send', 'event', 'swipe', 'right');
          break;
        case 'swipeleft':
          $('.plus1').click();
          ga('send', 'event', 'swipe', 'left');
          break;
      }
    }
  });
  // KEYBOARD NAVIGATION
  $(document).keydown((event) => {
    if (!$(document.activeElement).is('input')) {
      switch (event.keyCode) {
        // Esc
        case 27:
          onBackButton(true);
          break;
        // Left Arrow
        case 37:
          $('.minus1').click();
          ga('send', 'event', 'keyboard', 'left');
          break;
        // Right Arrow
        case 39:
          $('.plus1').click();
          ga('send', 'event', 'keyboard', 'right');
          break;
      }
    }
  });
  $(document).keypress((event) => {
    if (!$(document.activeElement).is('input')) {
      switch (event.keyCode) {
        //+
        case 43:
          $('#zoom_in_button').click();
          break;
        //-
        case 45:
          $('#zoom_out_button').click();
          break;
        // a
        case 97:
          if ($('#paatth').hasClass('larreevaar')) {
            $('#larreevaar_assistance').click();
          }
          break;
        // l
        case 108:
          $('#larreevaar_setting').click();
          break;
        // m
        case 109:
          $('#settings_button').click();
          break;
        // n
        case 110:
          $('#night_mode_button').click();
          break;
      }
    }
  });
});
