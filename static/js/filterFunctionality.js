 let kohs =[];
 let filteredListArr = [];
 let filteredRemainer  =[];
 let filterlen =0;
 let filterSelectItems =[];

  const selectfilters = document.querySelectorAll(".sel-list");
  const checkDropVal = (sel) => {
    let $li = sel.closest("li");
        $li.className = "";
    if (sel.value !== "null") $li.className = "liActive";
    return true;
  };
  const setBodyClass = (cl,bool) =>{
    (bool) ? body.classList.add(cl) : body.classList.remove(cl);
    return;
  }

  const setFilterOptions = () => {
    let filterArr = [];
    selectfilters.forEach((sel) => {
      if (sel.value !== "null") {
        filterArr.push({
          type: sel.dataset.type,
           val: sel.value
        });
      }
    });
   setFilterFunct(filterArr);
  };

  const setBoxScroll = (box) => {
  
    setBodyClass("floatActive",true);

    window.scrollTo({
      top: common.currPosition(box).top,
      behavior: "smooth",
    });
    return true;
  };
  
  const resetDropAll = () =>{

    selectfilters.forEach((sel) => {
      sel.selectedIndex =0;
      if(sel.closest("li").classList.contains('liActive')) 
      sel.closest("li").classList.remove('liActive');
    });
    setBodyClass('body-filtered',false);
    setFilterFunct([]);
   return;
  }

  const setFilterFunct = (filterArr) => {
    filteredListArr = [];
    kohs = allkohs.slice(0);
    fcount = filterArr.length;
    
    setBodyClass('body-filtered',false);

    kohs.forEach((koh) =>{
      let dropCount = 0;
      filterArr.forEach((drop) =>{
        var $val = drop.val.toLowerCase();
        if($val.indexOf('/') >0){
          $val = $val.replace(' / ','/');
        }
        if(koh[drop.type] !== undefined && 
           koh[drop.type].toLowerCase() === $val){
           dropCount++;
        }
      });
      if(dropCount === parseInt(fcount)){
        filteredListArr.push(koh)
      };
    });

    let filteredRemainer = allkohs.slice(0).filter(function(itm) {
      return filteredListArr.indexOf(itm) == -1;
    });

    //**display reset link;
    $('link_reset-boxes').classList.add('sho');
   
    if(fcount === 0) {
      common.displayBoxHtml(allkohs,fcount);
      $('link_reset-boxes').className = "link__reset-boxes";
      return;
    }
    filterlen = filteredListArr.length;
    filteredListArr = filteredListArr.concat(filteredRemainer);
 
    setBodyClass('body-filtered',true);
    common.displayBoxHtml(filteredListArr,filterlen);
    return;
  };

  (function () {
    let $promise = new Promise((res, rej) => {
      let $int = setInterval(function () {
        if (container.classList.contains("ready")) {
          clearInterval($int);
          res(true);
        }
      }, 100);
    });

    $promise.then(function (res) {
      if (res) {
        //* bind the dropdown change event *//
        selectfilters.forEach((sel) => {
          sel.addEventListener("change", () => {
            if (checkDropVal(sel)) setFilterOptions();
          });
        });

        $('link_reset-boxes').addEventListener('click', (e)=>{
          e.preventDefault();
          if(document.getElementsByClassName('liActive').length < 1) return false;
          resetDropAll();
          return false;
        });
      }
    });

  }());

