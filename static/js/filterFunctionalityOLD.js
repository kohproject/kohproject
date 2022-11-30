    document.addEventListener("DOMContentLoaded", function(evt) { 
        const $ =(id) =>{ return document.getElementById(id) }
       
        const selectfilters = document.querySelectorAll('.sel-list');
        let kbArray = [];
        let boolCount = 0;
        let kohboxes = [];
        let filterArr = [];

        const currPosition = (el) =>{
            let rect = el.getBoundingClientRect();
            let $top= (rect.top + window.scrollY);
            let $left= (rect.left + window.scrollX);
  
        return {top:$top+'px', left:$left+'px'}
        }

        const resetFilterBoxes = () =>{
            kbArray.forEach((box) =>{
                if(box.classList.contains('filtered')) box.classList.remove('filtered');
            });
            return true;
        }

        const checkDropVal =(sel) =>{
        let $li = sel.closest('li');
            $li.className ='';
            if(sel.value !=='null') $li.className ='liActive';
        return true;       
        }

        const setFilterOptions = () =>{
            filterArr = [];
            filteredList =[];
            boolCount=0;
            selectfilters.forEach((el) =>{
                if(el.value !== 'null'){
                    boolCount++;
                }
                filterArr.push({
                    type: el.dataset.type,
                     val: (el.value ==='null') ? null : el.value
                });
            });
            if(resetFilterBoxes()) setFilterFunct();
        }

        const setBoxScroll = (box,index) =>{
                $('body').classList.add('floatActive');
                window.scrollTo({
                    top: currPosition(box).top,
                    behavior: 'smooth'
                  });
                  return true;
        }
    
        const setFilterFunct =() =>{ 
            let actBox=null;
            let actBoxBool=true;
            let selectedBool=true;
            kbArray.forEach((box,index) =>{
                let dset = box.dataset;
                let boxCount =0;
               
                filterArr.forEach((obj) => {
                   
                    if(obj.val === dset[obj.type]){
                        boxCount++;
                        if(selectedBool){
                            actBox=box;
                            selectedBool=false;
                        }
                    }
                });
               
                if(boxCount === boolCount && boxCount !==0) box.classList.add('filtered');
                if(actBox && actBoxBool){
                    setBoxScroll(actBox,index);
                    actBoxBool =false;
                }
            })
        }


        (function () {
            let $promise = new Promise((res, rej) => {
              let $int = setInterval(function () {
                if ($('container').classList.contains("ready")) {
                  clearInterval($int);
                  res(true);
                }
              }, 100);
            });


            $promise.then(function (res) {
              if (res) {
               kohboxes = document.querySelectorAll('.box-koh');
               kbArray = Array.from(kohboxes);
                //* bind the dropdown change event *//
                selectfilters.forEach((el) =>{
                    el.addEventListener('change', ()=>{
                        if(checkDropVal(el)) setFilterOptions();
                    })
                });
              }
            })
        }());

    });