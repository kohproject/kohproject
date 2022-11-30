document.addEventListener('DOMContentLoaded', (event) => {
    const $ =(id) =>document.getElementById(id);
    const resetLogin =()=>{
        $('username').selectedIndex = 0;
        $('password').value = "";
    }

    const checkCred = (cred)=>{
        let _bool = true; 
        if(cred.user ==='' || cred.pass ===''){
            _bool = false;
        }
        return {"bool":_bool,"creds":{"user":cred.user,"pass":cred.pass}}
    }
    
    const logintokoh = async(_user,_pass)=>{
       
        let url = '/login';
        let credObj = checkCred({"user":_user,"pass":_pass});
        
        if(credObj.bool){
            await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache', 
                body: JSON.stringify(credObj.creds),
                headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken":document.getElementsByTagName('input')[0].value
                }
            }).then((resp) =>{
                console.log(resp);
            }).then((_data) =>{
                console.log(_data);
                $('body').className = 'loggedIn';
                resetLogin();
            })
           
        }
    };

    

    $('btn_password-submit').addEventListener('click', (evt)=>{
        evt.preventDefault();
        let pass = $('password').value;
        let user = $('username');
            user = user.options[user.selectedIndex].value;
          
      
        if(user === 'null'){
            alert('please select a domain');
            return false;
        }

        if(pass === ''){
            alert('please provide a password');
            return false;
        }
        
        logintokoh(user,pass);
        return false;
    })
})