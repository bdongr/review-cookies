import {Cookie} from '../dataAccess/Cookie';
import fire from '../firebaseConfig';

const cookiesRef = fire.database().ref('/cookies/');

// recupera os cookies existentes no banco
export const getCookies = () => {
    return cookiesRef.once('value').then((cookies) => {
        if(cookies.val()){
            var cookiesArray = Object.entries(cookies.val()).map(e => Object.assign(new Cookie(), {...e[1], key: e[0]}));
            return cookiesArray
        } else{
            return []
        }
    }).catch((error) => {
        alert(error)
    })
}

// cria um novo cookie no banco
export const pushCookie = (cookie) => {
    return cookiesRef.push(cookie, (error)=>{
        if(error){
            alert(error)
        } 
    }).key
}

// atualiza um cookie
export const updateCookie = (cookie) => {
    const cookieUpdated = {...cookie}
    // remove a propriedade key para que ela não seja enviada ao banco
    delete cookieUpdated.key;
    return cookiesRef.child(cookie.key).set(cookieUpdated)
}

// remove um cookie do banco
export const deleteCookie = (cookieId) => {
    return cookiesRef.child(cookieId).remove()
}