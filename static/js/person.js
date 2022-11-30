
      document.addEventListener('DOMContentLoaded', function () {
         const $ = (id)=> document.getElementById(id);
         const $chx = document.getElementsByClassName('chx');
         const $inpSoc =document.getElementsByClassName('inp__social');
         const $addChx = document.getElementsByClassName('chx-toggle')[0];
         const $tarea = document.getElementsByTagName('textarea')[0];

    

         const upImg = () =>{
            const fileReader = new FileReader();
            
            fileReader.onload = () => {
                alert('1');
                $('imgHead').src = $('inp_file').result;
                console.log($('inp_file').result);
                alert('2');
             }
             fileReader.readAsDataURL($('inp_file').files[0]);
             return false;
            }
    
         const checkImg= async() => {
           
            if($('inp_file').files[0]){
             
                await upImg()
            }  
         }

         const getChx = (_evt) =>{
            _evt.target.closest('li').getElementsByClassName('chx')[0];
         }

         $('upload').addEventListener('click', ()=>{
            checkImg();
         })

         $addChx.addEventListener('click', (evt)=>{
            (evt.currentTarget.checked) ? $tarea.setProperty('disabled','') : $tarea.setProperty('disabled','disabled');
         })


         $('btn_save-changes').addEventListener('click', (evt)=>{
             evt.preventDefault();

             return false;
         })
       

         

         Array.from($chx).forEach((chx) =>{
            chx.addEventListener('click', (evt)=>{
                var cl = evt.currentTarget.name+' inp-wrap';
                var wrap = document.getElementsByClassName(cl)[0];
                var $inp =wrap.getElementsByTagName('input')[0];

                if(wrap.classList.contains('active')){
                    wrap.classList.remove('active');
                    $inp.setAttribute('placeholder',$inp.getAttribute('data-place'));
                    return;
                }
                wrap.classList.add('active');
                $inp.setAttribute('placeholder','');
                $inp.focus();
            });
         })


         Array.from($inpSoc).forEach((inp) =>{
            
            inp.addEventListener('focus', (evt)=>{
                getChx(evt).click()
            });
            inp.addEventListener('focusout', (evt)=>{
                console.log(getChx(evt));
                getChx(evt).click()
               
            });
         })

      });