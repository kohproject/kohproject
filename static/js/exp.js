
var expandedTempl = '<div class="box box-grid" id="box_grid-{{index}}" data-counter="{{index}}">';
expandedTempl += '<div class="block__title">';
expandedTempl += '<h2>{{koh.name}}</h2>';
expandedTempl += '<p><a href="{{koh.url}}">{{koh.url}}</a></p>';
expandedTempl += '<ol class="list__social">';
expandedTempl += '<li><a href="#" class="icon__social social-facebook"></a></li>';
expandedTempl += '<li><a href="#" class="icon__social social-instagram"></a></li>';
expandedTempl += '<li><a href="#" class="icon__social social-twitter"></a></li>';
expandedTempl += '</ol><em class="head"></em></div>';
expandedTempl += '<div class="block__content">';
expandedTempl += '<ol><li><a href="#" class="active"';
expandedTempl += 'onclick="javascript:setBlockContent(\"box_grid-1\",\"profile\")">profile</a></li>';
expandedTempl += '<li><a href="#" onclick="javascript:setBlockContent(\"box_grid-1\",\"notes\")">notes</a></li></ol>';
expandedTempl += '<div class="wrap__content-profile"><ul>';
expandedTempl += '<li class="li__prof"><em class="em__{{koh.ethnClass}} em__{{koh.ethnic}}"></em><dt>Profession:</dt><dd>{{koh.profession}}</dd></li>';
expandedTempl += '<li class="li__ethn"><em class="em__{{koh.ethnClass}} em__{{koh.ethnic}}"></em><dt>My Ethnicity:</dt><dd>{{koh.ethnic}}</dd></li>';
expandedTempl += '<li class="li__resid"><em class="em__{{koh.nationClass}} em__{{koh.nation}}"></em><dt>My Residence:</dt><dd>{{koh.nation}}</dd></li>';
expandedTempl += '</ul></div>';
expandedTempl += '<div class="wrap__content-notes">notes</div>';
expandedTempl += '<a href="#" onclick="javascript:closeWind()" class="link__close-win"></a>';
expandedTempl += '</div>';





<div class="over-inner">';
expandedTempl += '<div class="full-flipper">';
expandedTempl += '<div class="flipper flipper-{{koh.gender}}" id="flipper">';
expandedTempl += '<div class="block__head head-top"><h4>{{koh.name}}</h4></div>';
expandedTempl += '<div class="block__head head-bottom"><em class="{{koh.gender}}"></em>';
expandedTempl += '<div class="wrap__social"><ol><li class="li__facebook"><a class="link__open" href="https://www.facebook.com"><em></em></a></li><li class="li__instagram"><a class="link__open" href="https://www.instagram.com"><em></em></a></li><li class="li__twiiter"><a class="link__open" href="https://www.twitter.com"><em></em></a></li></ol></div>';
expandedTempl += '<div class="wrap__domain"><p class="txt__url"><a target="_blank" href="{{koh.url}}">{{koh.url}}</a></p></div>'
expandedTempl += '</div></div></div>';
expandedTempl += '<div class="flipper-second flipper-{{koh.gender}}">';
expandedTempl += '<ul class="flex"><li><em class="em__profession"></em><dt>Profession:</dt><dd>{{koh.profession}}</dd></li>';
expandedTempl += '<li><em class="em__{{koh.ethnClass}} em__{{koh.ethnic}}"></em><dt>My Ethnicity:</dt><dd>{{koh.ethnic}}</dd></li>';
expandedTempl += '<li><em class="em__{{koh.nationClass}} em__{{koh.nation}}"></em><dt>My Residence:</dt><dd>{{koh.nation}}</dd></li>';
expandedTempl += '</ul></div>';
expandedTempl += '<a class="link__blank link__open" target="_blank" href="{{koh.url}}">{{koh.domain}}</a>';
expandedTempl += '</div><div class="over-outer notes"><h3>Hello World</h3>';
expandedTempl += '<ul><li>sss</li><li>sss</li><li>sss</li></ul></div>';
expandedTempl += '<a href="#" class="link__open link-close-grid"></a><div class="expanded__notes"><a href="#" onclick="javascript:common.expandNotes(event,\'{{index}}\')" class="link__expanded-notes">notes</a></div></div>';

