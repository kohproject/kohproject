  // const modal = $('modal');
  // const form = $('form_modal');

  const floatBox = $("floater");
  let mbBool = true;
  let selectedBox = null;

  // const removeActive = () => {
  //   var $active = document.getElementsByClassName("active");
    
  //     Array.from($active).forEach((el,index) =>{
  //       el.classList.remove('active');
  //       alert(index);
  //     });
   
  //   //body.className = "";
  //   common.scrollTo(0);
  //   return;
  // };

  const setBoxFlip=(index,delay) =>{
    setTimeout(() =>{
      $('box_grid-'+index).classList.add('flip');
    },delay);
    return;
  }

  const closeWin = (index,delay) =>{
    let $box = $('box_grid-'+index);
    let $link = $box.getElementsByClassName('link-tabs')[0];
    
        $box.classList.remove('flip');

      setTimeout(() =>{
        $box.classList.remove('active');
        body.classList.remove('active');
        common.scrollTo(0);
        setBlockContent($link,index);
      },delay);
    return;
  }

  const openUrl = (link) =>{
    window.open(link.dataset.url);
    return;
  }

  const setBlockContent = (link,index) =>{
    let type = link.dataset.type;
    let $box = $('box_grid-'+index);
 
      $box.getElementsByClassName('active')[0].classList.remove('active');
      $box.getElementsByClassName('wrap-content')[0].style.display = "none";
      $box.getElementsByClassName('wrap-content')[1].style.display = "none";
      $box.getElementsByClassName('wrap__content-'+type)[0].style.display ="block";
      link.classList.add('active');
      return;
  }

  const BoxClick = (targ) => {
    let bufferSubtract = 50;
    let url = targ.getElementsByClassName("txt__url")[0];
    url = url.innerHTML;
    url = url.trim();
    url = url.replace("http://", "").replace(".com", "");
    url = url.replace("https://", "").replace("www.", "").replace("/", "");
    url = url.replace(/^\s+|\s+$/gm, "");

    let counter = targ.dataset.counter;
    let $top = parseInt(common.currPosition(targ).top) - bufferSubtract;

    if ($top !== 0) common.scrollTo($top);
    // if ($("contain2").querySelector(".active")){removeActive()}
    body.classList.add("active");
    $("main2").getElementsByClassName("box-grid")[counter].classList.add("active");
    setBoxFlip(counter,250);

    return;
  };
  // let $timePos = (window.pageYOffset > 550) ? 550 : (window.pageYOffset);
  //     if($timePos !== 0){
  //       if(scrollTo(0)){
  //         setTimeout(function(){body.classList.add('open-modal')},$timePos);
  //       }
  //     }
  // else{
  //       body.classList.add('open-modal')
  //     }

  //   form.action = "displaykoh/"+url;

  //   const request = new Request(form.action,
  //     {
  //         method: 'POST',
  //         headers: {'X-CSRFToken': getCookie('csrftoken')},
  //         mode: 'same-origin' // Do not send CSRF token to another domain.
  //     }
  // );
  //console.log(request);

  //     fetch(request)
  //       .then(response => response.json())
  //       .then(data => {
  //         //handle data

  //         var mykoh = data.myObj;
  //           //console.log(mykoh);

  //         $('bq_modal').className = (mykoh.gender == 1) ? "block-male" : "block-female";
  //         $('head_name').innerHTML = mykoh.name;
  //         $('dd_profession').innerHTML = mykoh.profession;
  //         $('dd_nation').innerHTML = mykoh.nation;
  //         $('dd_ethnic').innerHTML = mykoh.ethnic;
  //         $('link_url').innerHTML = mykoh.url;
  //         $('link_url').setAttribute('href', mykoh.url);

  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });

  //   return;

  //   return false;
  //  }


  const animateBox = (_top, _left, box, _speed) => {
    if (_top === undefined || _left === undefined) return;
    selectedBox = box;
    var $promise = new Promise((res, rej) => {
      floatBox.animate({
          top: _top + "px",
          left: _left + "px",
        },
        _speed
      );
      let $timer = setTimeout(() => {
        res(true);
        clearTimeout($timer);
      }, _speed + 2);
    }).then((res) => {
      if (res) {
        floatBox.style.left = common.currPosition(selectedBox).left;
        floatBox.style.top = common.currPosition(selectedBox).top;
      }
    });
  };
  const moveBox = (oldPos, newPos, box) => {
    if (!mbBool) return;
    var oldPos = { top: parseInt(oldPos.top), left: parseInt(oldPos.left) };
    var newPos = { top: parseInt(newPos.top), left: parseInt(newPos.left) };

    if (oldPos.top !== newPos.top || oldPos.left !== newPos.left) {
      var topBuffer = newPos.top > oldPos.top ? newPos.top + 10 : newPos.top - 10;
      var leftBuffer = newPos.left > oldPos.left ? newPos.left + 10 : newPos.left - 10;
    }

    var speedPlus = topBuffer + leftBuffer < 750 ? 200 : 260;

    if (box) {
      var sTimer = setTimeout(function () {
        animateBox(newPos.top, newPos.left, box, speedPlus);
        clearTimeout(sTimer);
      }, 40);
    }
  };
  const BoxEnter = (box) => {
    if (box !== selectedBox) {
      moveBox(common.currPosition(floatBox), common.currPosition(box), box);
      mbBool = false;
    }
    return;
  };
  const BoxOut = (box) => {
    mbBool = true;
  };

  const bindEvts = (arr,bool) =>{
      arr.forEach((box) => {
         if(bool){
          box.addEventListener("click", (evt) => {
            evt.preventDefault();
            if (body.classList.contains("active") || evt.currentTarget.classList.contains("active")) {
              return false;
            }
            if (common.getTargBox(evt).classList.contains("active")) {
              removeActive("active");
            }
            BoxClick(common.getTargBox(evt));
          });
          box.addEventListener("mouseenter", (evt) => {
              BoxEnter(common.getTargBox(evt));
          });
          box.addEventListener("mouseout", (evt) => {
              BoxOut(common.getTargBox(evt));
          });
          container.addEventListener("mouseover", (evt) => {
            body.classList.add("floatActive");
          });
  
          container.addEventListener("mouseout", (evt) => {
            body.classList.remove("floatActive");
          });
  
          $("aside").addEventListener("mouseover", (evt) => {
            body.classList.remove("floatActive");
          });
          }
      else{
          box.removeEventListener('click',box);
          box.removeEventListener('mouseenter',box);
          box.removeEventListener('mouseout',box);
          }
      });
     
      return bool;
  };

  const bindExpEvts = (bool) =>{
    
    let linksOpen = document.querySelectorAll(".link__open");

      Array.from(linksOpen).forEach((link) =>{
        if(bool){
          link.addEventListener('click', (evt)=>{
            evt.preventDefault();
            var $targ = evt.currentTarget.getAttribute('href');
              if($targ =='#' && evt.currentTarget.classList.contains('link-close-grid')){
                body.classList.remove('active');
                  evt.currentTarget.closest('.box-grid').classList.remove('active');
                  
                  common.scrollTo(0);
                  evt.stopPropagation();
                return false;
              }

              if($targ.dataset) $targ = $targ+$targ.dataset.link;
              window.open($targ);
            return false;
          });
          return;
        }
        link.removeEventListener('click',link);
      });
  };


  (function () {
    let $promise = new Promise((res, rej) => {
        let $int = setInterval(function () {
            if(container.classList.contains("ready")) {
                res(true);
                clearInterval($int);
            }
        }, 100);
    });
  
      $promise.then(function (res) {
        if (res) {
          common.boxes = document.querySelectorAll(".box");
          if(bindEvts(Array.from(common.boxes),true)) bindExpEvts(true);
        }
      });
      // const $flipper = $('flipper');
      // $flipper.addEventListener("mouseenter", (e) =>{
      //   $('body').classList.add('floatHid');
      //   floatBox.style.left = '20000px';
      //   floatBox.style.top = '20000px';
      // })
      // $flipper.addEventListener("mouseleave", (e) =>{
      //   $('body').classList.remove('floatHid');
      // })

  }());


