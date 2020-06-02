$(function(){

  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="message">
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
      var html = `<div class="message">
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
});