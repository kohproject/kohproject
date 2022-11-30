document.addEventListener("DOMContentLoaded", function() { 
   
    const fetchData = async(url) =>{
        await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache', 
            headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken":document.getElementsByTagName('input')[0].value
            }
          }).then((resp) =>{
            return resp.json();
          }).then((data) =>{
         
             allkohs = data;
          })
    }
      
    fetchData('/apikoh/all').then(function(){
        common.displayBoxHtml(allkohs);
        container.classList.add('ready');
    });
})



