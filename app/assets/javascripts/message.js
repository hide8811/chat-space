$(function(){

  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                  <div class="message__header">
                    <div class="message__header--user-name">
                      ${message.user_name}
                    </div>
                    <div class="message__header--date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    ${message.text}
                  </div>
                  <img src=${message.image} >
                </div>`
      return html;
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message__header">
                      <div class="message__header--user-name">
                        ${message.user_name}
                      </div>
                      <div class="message__header--date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      ${message.text}
                    </div>
                  </div>`
      return html;
    };
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".main__area").append(html);
      $('.main__area').animate({ scrollTop: $('.main__area')[0].scrollHeight});
      $('form')[0].reset();
      $('.input__btn').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.input__btn').prop("disabled", false);
    })
  });

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages) {
      console.log(messages)
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__area').append(insertHTML);
        $('.main__area').animate({ scrollTop: $('.main__area')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});