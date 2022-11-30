const $ = (id)=>document.getElementById(id);
const body = $('body');
const container = $('container');
var allkohs = [];
var template = '<li><div class="box box-koh';
        template += '" data-id="test"';
        template += ' data-nation="{{koh.nation}}"';
        template += ' data-ethnic="{{koh.ethnic}}"';
        template += ' data-gender="{{koh.gender}}"';
        template += ' data-profession="{{koh.profession}}" ';
        template += ' data-counter="{{index}}">';
        template += ' <div class="box-inner">';
        template += ' <h4>{{koh.name}}</h4>';
        template += ' <p class="txt__url">{{koh.url}}</p>';
        template += ' </div></div></li>';

var blanktemplate = '<li><div class="box box-koh blank blank{{index}}"></div></li>'; 

var expandedTempl = '<li><div class="box box-grid box-{{koh.gender}}" id="box_grid-{{index}}" data-counter="{{index}}">';
    expandedTempl += '<div class="block__title">';
    expandedTempl += '<h2>{{koh.name}}</h2>';
    expandedTempl += '<p><a href="javascript:void(0)" data-url="{{koh.url}}" onclick="javascript:openUrl(this)">{{koh.url}}</a></p><em class="head"></em></div>';
    expandedTempl += '<div class="block__content">';
    expandedTempl += '<ol class="list__social">';
    expandedTempl += '<li><a href="javascript:void(0)" class="icon__social social-facebook"></a></li>';
    expandedTempl += '<li><a href="javascript:void(0)" class="icon__social social-instagram"></a></li>';
    expandedTempl += '<li><a href="javascript:void(0)" class="icon__social social-twitter"></a></li>';
    expandedTempl += '</ol>';
    expandedTempl += '<ol><li><a href="javascript:void(0)" data-type="profile" class="link-tabs active" id="link_profile"';
    expandedTempl += 'onclick="javascript:setBlockContent(this,{{index}})">profile</a></li>';
    expandedTempl += '<li><a href="javascript:void(0)" class="link-tabs" id="link_notes" data-type="notes" onclick="javascript:setBlockContent(this,{{index}})">notes</a></li></ol>';
    expandedTempl += '<div class="wrap-content wrap__content-profile"><ul>';
    expandedTempl += '<li class="li__prof"><em class="em__profession"></em><dt>Profession:</dt><dd>{{koh.profession}}</dd></li>';
    expandedTempl += '<li class="li__ethn"><em class="em__{{koh.ethnClass}} em__{{koh.ethnic}}"></em><dt>My Ethnicity:</dt><dd>{{koh.ethnic}}</dd></li>';
    expandedTempl += '<li class="li__resid"><em class="em__{{koh.nationClass}} em__{{koh.nation}}"></em><dt>My Residence:</dt><dd>{{koh.nation}}</dd></li>';
    expandedTempl += '</ul></div>';
    expandedTempl += '<div class="wrap-content wrap__content-notes">notes</div></div>';
    expandedTempl += '<a href="javascript:void(0)" onclick="javascript:closeWin({{index}},350)" class="link__close-win"></a>';
    expandedTempl += '</div></li>';

    
const common = {
    boxes:{},
    expandNotes: (evt,num) =>{
        evt.preventDefault();
        let boxgrid = $('box_grid-'+num);
        (boxgrid.classList.contains('open')) ? boxgrid.classList.remove('open') : boxgrid.classList.add('open');
        return false;
    },
     resetForm:() =>{
        Array.from(document.getElementsByClassName('li__req')).forEach((el) =>{
            el.className = 'li__req';
            el.getElementsByClassName('inp-req')[0].value='';
        });
    },
    showPage:(type)=>{
        body.className = (type ==null) ? "" : type;
        if(!type){
            common.resetForm();
            return;
        }
    },
    getTargBox: (evt) => evt.currentTarget.closest(".box"),
    strToHTML: (str) =>{
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        return doc.body.innerHTML;
    },
    currPosition: (el) => {
        let rect = el.getBoundingClientRect();
        let $top = rect.top + window.scrollY;
        let $left = rect.left + window.scrollX;
      
        return { top: $top + "px", left: $left + "px" };
    },
    scrollTo:(pos) => {
          var $top = pos || 0;

          window.scrollTo({
            top: $top,
            behavior: "smooth",
          });

         body.classList.add("floatActive");
        return true;
    },
    getCookie :(name)=>{
        let cookieValue = null;
            if (document.cookie && document.cookie !== "") {
              const cookies = document.cookie.split(";");
              for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === name + "=") {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
                }
              }
            }
        return cookieValue;
    },
   
    //render full screen//
    displayBoxHtml: (_kohs,len) =>{
   
        let $html ="";
        let $html2 ="";
        let blankSpacerArr = [{"num":7},{"num":11},{"num":15}];
        let $kohs = _kohs.filter((itm) => {
            if(!itm.num) return itm;
        });

        blankSpacerArr.forEach((itm,index) =>{
            $kohs.splice(itm.num,0,{"num":index})
        });
        
        $kohs.forEach((k,index)=>{
            var data = {"koh":k,"index":index};
           
            if(data.koh.ethnic !== undefined && data.koh.ethnic.indexOf('/chinese') >0){
                data.koh.ethnClass = data.koh.ethnic.replace('/chinese',' / chinese');
            }
            if(data.koh.nation !== undefined && data.koh.nation.indexOf('/china') >0){
                data.koh.nationClass =  data.koh.nation.replace('/china',' / china');
            }
            if(index==blankSpacerArr[0].num ||
                index==blankSpacerArr[1].num ||
                index==blankSpacerArr[2].num){
                $html += Mustache.render(blanktemplate,data);
                $html2 += '<li><div class="box box-grid"></div></li>';
            }
            else{
                $html += Mustache.render(template,data);
                $html2 += Mustache.render(expandedTempl,data);
            }
        })

        if(len !== undefined){
            for(i=0;i<len;i++){
               $html= $html.replace('class="box box-koh" data-id','class="box box-koh filtered" data-id');
            }
            if(!bindEvts(Array.from(document.querySelectorAll('.box')),false)){
                bindExpEvts(false);
            } 
        }

       $('main').innerHTML = '<ul class="flex flex-wrap" id="list__kohs">'+common.strToHTML($html)+'</ul>';
       $('main2').innerHTML = '<ul class="flex flex-wrap">'+common.strToHTML($html2)+'</ul>';

       if(len !== undefined){
        let boxKohs = document.querySelectorAll('.box-koh');
        if(bindEvts(Array.from(boxKohs),true)){
            bindExpEvts(true)
        }
        moveBox(common.currPosition(floatBox), common.currPosition(boxKohs[0]),boxKohs[0]);
       }
    }
}
