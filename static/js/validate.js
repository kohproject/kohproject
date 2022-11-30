(function(){
    const $ = (id) => document.getElementById(id);
    const requiredItems = document.querySelectorAll('.li__req');
    const resetForm =() =>{
        Array.from(requiredItems).forEach((el) =>{
            el.className = 'li__req';
            el.getElementsByClassName('inp-req')[0].value='';
        });
    }
    const setSuccess =() =>{
        var $wrapper = $("contactWrapper").classList;
        ($wrapper.contains('success')) 
        ? $wrapper.remove('success') 
        : $wrapper.add('success')
    }

    const validate = () => {
        let validBool = true;
            requiredItems.forEach(itm => {
                var inp = itm.getElementsByClassName('inp-req')[0];
                if (inp.value === '') {
                    itm.classList.add('err');
                    validBool = false;
                }
                if ((inp.id === 'email' && inp.value.indexOf('@') === -1) ||
                    (inp.id === 'email' && inp.value.indexOf('.') === -1)) {
                    itm.classList.add('err-email');
                    validBool = false;
                }
        })
        return validBool;
    }

    document.querySelectorAll('.li__req').forEach(el => {
        var $inp = el.getElementsByClassName('inp-req')[0]
            $inp.addEventListener('keyup', (e) => {
            if (el.classList.contains('err')){
                el.classList.remove('err');
            }
            if (($inp.value.indexOf('@') > 0) && ($inp.value.indexOf('.') > 0)) {
                el.classList.remove('err-email');
            }
        })
    })

    $('btn_submit').addEventListener('click', (e) => {
        e.preventDefault();
        if(!validate()) return false;

        let $messObj = {"name":$('name').value,
                        "email":$('email').value,
                        "subject":$('subject').value,
                        "mess":$('message').value}

           resetForm();
           setSuccess();
           setTimeout(function(){
            setSuccess();
           },2200)

        return false;
    });
    
}())