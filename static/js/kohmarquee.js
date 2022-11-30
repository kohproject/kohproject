document.addEventListener("DOMContentLoaded", function(evt) { 

    const $ = (id) =>  document.getElementById(id);


    let $int = setInterval(function(){
        if(document.getElementById('container').classList.contains('ready')){
            alert('ready');
          clearInterval($int);
        }
      },100);

    const sels = document.querySelectorAll('.sel-list');
    const kohboxes = document.querySelectorAll('.box-koh');
    const kbArray = Array.from(kohboxes);  
    const $bq = $('bq');
    const compareArr = [{"label":"nation","value":null },{"label":"ethnic", "value":null },{"label":"profession", "value":null},{"label":"gender", "value":null }]
      

    let selectFlag = false;
    let filteredList = [];

    const comparesides = (itm, _arr) =>{
       var bool = false;
        filteredEl = _arr.forEach(it =>{
           bool = (itm[it['label']] ===it.value) ? true : false;   
        })

        return bool;
    } 

    const filterArr =(arr) =>{
        filteredList = [];
        kbArray.forEach(el =>{
            var $dataObj = el.dataset;

            arr.forEach(obj =>{
                if(obj.value !== null){
                   if($dataObj[obj.label] ===obj.value){
                        if(comparesides($dataObj,arr)){
                            filteredList.push(el);
                        }
                   }
                }
            })
        });

        console.log(filteredList);
    }

    const checkAllselects = (type) =>{
        compareArr['label'][type] = null;
        selectFlag =Array.from(sels).some(el => el.selectedIndex !==0);
        (selectFlag) ? $bq.classList.add('filtered') :  $bq.classList.remove('filtered');
    }

    const setFilter = (val,type) =>{
        var obj = compareArr.filter(el => el['label'] === type);
            obj = obj[0];
            obj['value'] = val;
      
           var tst = filterArr(compareArr);

           console.log(tst);

        // setFilteredList(filterArr(compareArr));
       // checkAllselects();
    }
   
   sels.forEach((el) =>{
        el.addEventListener('change', (e)=>{
            (e.currentTarget.selectedIndex !==0) ? setFilter(e.target.value, e.currentTarget.dataset['type']) : checkAllselects(e.currentTarget.dataset['type']);
        })
    })
});