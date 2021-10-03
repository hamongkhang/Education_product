var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  // if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  // }
}

function setDatePersonal(){
  d = new Date()
  // if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp-personal">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  // }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal" style="padding-bottom:8px;">' + msg +'</div>').appendTo($('.mCSB_container')).addClass('new');
  setDatePersonal();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Chào bạn!<br /> Bạn muốn chúng tôi hỗ trợ điều gì <div style="mix-width: 10px;"></div>',
  'Bạn Muốn chúng tôi hỗ trợ vật lý lớp mấy <div style="mix-width: 10px;"></div>',
  'Bạn Im mỏ <div style="mix-width: 10px;"></div>',
  'Cút <div style="mix-width: 10px;"></div>',
  'Bye :)<div style="mix-width: 10px;"></div>'
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="https://honghot.net/wp-content/uploads/tong-hop-icon-mat-cuoi-chat-nhat-10.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    if(Fake[i]!=null){
    $('<div class="message new"><figure class="avatar"><img src="https://honghot.net/wp-content/uploads/tong-hop-icon-mat-cuoi-chat-nhat-10.png" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    }

    else{
      Fake[i] ='Vui lòng liên hệ với chúng tôi <div style="mix-width: 10px;"></div>'
    $('<div class="message new"><figure class="avatar"><img src="https://honghot.net/wp-content/uploads/tong-hop-icon-mat-cuoi-chat-nhat-10.png" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    }
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);
}

$(document).ready(function(){
  $(".header-nav").click(function(){
    $(".chat").hide(1000);
    $(".bt-chat").show(1000);
  });

  $(".bt-chat").click(function(){
    $(".chat").show(1000);
    $(".bt-chat").hide();
  });
});

