(function(){
    const $togglelinks = document.getElementsByClassName('login-toggle');
    const $body = document.getElementById('body');


    Array.from($togglelinks).forEach((el) =>{
        el.addEventListener('click', (e)=>{
            e.preventDefault();
            ($body.classList.contains('login')) 
            ? $body.classList.remove('login') 
            : $body.classList.add('login');
            return false;
        })
    })
   
}())