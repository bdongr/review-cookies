import React, { useState, useEffect }  from 'react';

import Cookie from '../../components/cookie/cookie';
import CookieForm from '../../components/cookieForm/cookieForm';
import { getCookies, pushCookie, updateCookie, deleteCookie } from '../../dataBaseAccess/cookies';
import {Cookie as CookieObj} from '../../dataAccess/Cookie';
import './Home.css';

function Home() {

    // array de cookies
    const [cookies, setCookies] = useState([]);

    // cookie para ser adicionado ao banco
    const [newCookie, setNewCookie] = useState(new CookieObj('', ''));

    // carrega os cookies existentes no banco
    useEffect(()=>{
        async function fetchData(){
            const c = await getCookies();
            setCookies(c)
        }
        fetchData()
    }, [])

    // salva no banco um novo cookie e o exibe na tela
    const saveCookie = () => {
        var cookieSavedKey = pushCookie(newCookie)
        setCookies(cookies.concat([Object.assign(new CookieObj(), {...newCookie, key: cookieSavedKey})]))
        setNewCookie(new CookieObj('', ''))
    }

    // salva as alterações do cookie no banco e atualiza a tela com os dados novos
    const fetchUpdatedCookie = (cookie) => {
        updateCookie(cookie).then(()=>{
            var cookieIndex = cookies.findIndex(c => c.key === cookie.key);
            var cookiesUpdated = [...cookies];
            cookiesUpdated[cookieIndex] = cookie;
            setCookies(cookiesUpdated)
        })
    }

    // remove um cookie do banco e atualiza a tela
    const removeCookie = (cookieId) => {
        deleteCookie(cookieId).then(()=>{
            var cookiesUpdated = [...cookies];
            cookiesUpdated.splice(cookies.findIndex(c => c.key === cookieId), 1)
            setCookies(cookiesUpdated)
        })
    }

    return (
        <div className="container">

            <h1>
                Avalie cookies
            </h1>

            {/* componente de formulário usado para criar e atualizar um cookie */}
            <CookieForm cookie={newCookie} setCookie={setNewCookie}>
                {/* children, será renderizado abaixo dos campos de nome e review no formulário */}
                <div className="buttons">
                    <button type="submit" onClick={()=>saveCookie()}>
                        salvar
                    </button>
                </div>
            </CookieForm>

            {/* percorre o array de cookies e renderiza um componente cookie para cada elemento */}
            {cookies.map((cookie, i) => {
                return(
                    <Cookie 
                        key={`cookie-${i}`} 
                        cookie={cookie} 
                        updateCookie={fetchUpdatedCookie}
                        deleteCookie={removeCookie}/>
                )
            })}
        </div>
  );
}

export default Home;
