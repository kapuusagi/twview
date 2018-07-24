$('.tw-btn').click(function() {
  const twTitleNode = $(this).parent();
  const body = twTitleNode.find('.tw-body');
  const btn = twTitleNode.find('.tw-btn span');
  if (body.css('display') === 'none') {
    body.slideDown();
    btn.text('-');
  } else {
    body.slideUp();
    btn.text('+');
  }
});
function resizeContentsArea() {
  const areaWidth = window.innerWidth - 280;
  const contents = $('.contents');
  contents.css('width', areaWidth);

  const areaHeight = window.innerHeight - 140;
  contents.css('height', areaHeight);
}

/**
 * ウィンドウがリサイズされたときのイベントを処理する。
 */
$(window).resize(function() {
  // 画面がリサイズされた。
  resizeContentsArea();
});


/**
 * 左側のメニューがクリックされたとき、対象のリンクを取得して反映させる。
 */
$('.tw-link').click(function() {
  const screen_name = this.getAttribute('user_id');
  const tw_user = $(this).text();

  // timelineの埋め込み方： https://syncer.jp/Web/API/Twitter/Website/User_Timeline/
  const tw_timeline = document.getElementById('tw-timeline1');
  // 既存のTwitter子要素は削除する。
  while (tw_timeline.firstChild) {
    tw_timeline.removeChild(tw_timeline.firstChild);
  }

  if (tw_user == '<empty>') {
    $('.contents h1').text('Twitter');
    return ;
  }
  $('.contents h1').text(tw_user + 'のTwitter');

  // ウィジェットタイプ
  var widget_type = { };
  widget_type['sourceType'] = 'profile';
  widget_type['screenName'] = screen_name; // スクリーンネーム

  // パラメータ : http://westplain.sakuraweb.com/translate/twitter/Documentation/Twitter-for-Websites/JavaScript/Scripting-Factory-Functions.cgi#create-timeline
  var tw_params = { };
  tw_params['chrome'] = 'transparent noboders';
  tw_params['width'] = (tw_timeline.clientWidth > 600) ? 600 : tw_timeline.clientWidth;
  tw_params['height'] = tw_timeline.clientHeight;
  console.log('size : ' + tw_params['width'] + ' x ' + tw_params['height']);

  twttr.widgets.createTimeline(
    widget_type, // ウィジェットの種類
    tw_timeline, // コンテナ
    tw_params // パラメータ
  );
});

// ウィンドウ表示時の処理
resizeContentsArea();
