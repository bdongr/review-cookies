import React, { useState } from 'react';
import CookieForm from '../../components/cookieForm/cookieForm';
import './cookie.css';

function Cookie(props){

    // variável para exibir ou esconder o formulário de edição do cookie
    const [isEditingCookie, setIsEditingCookie] = useState(false)

    // cookie passado para o formulário para ser editado, afim de manter a imutabilidade do cookie original carregado do banco
    const [cookie, setCookie] = useState({...props.cookie})

    return(
        <div className="cookie" id={props.cookie.key}>
            {/* exibe o formulário de edição caso o isEditing esteja true ou o nome e review caso seja false */}
            {isEditingCookie ?
                <CookieForm cookie={cookie} setCookie={setCookie}>
                    {/* children, serão renderizadas abaixo dos campos de nome e review no formulário */}
                    <div className="buttons">
                        <button 
                            type="button" 
                            style={{backgroundColor: '#ae2f27'}}
                            // atualiza isEditing e reseta o cookie para o original
                            onClick={()=>{
                                setIsEditingCookie(!isEditingCookie)
                                setCookie({...props.cookie})
                            }}>
                            cancelar
                        </button>
                        <button 
                            type="submit" 
                            // atualiza isEditing e envia o cookie para o banco
                            onClick={()=>{
                                setIsEditingCookie(!isEditingCookie)
                                props.updateCookie(cookie)
                            }}>
                            salvar
                        </button>
                    </div>
                </CookieForm>
                :
                <React.Fragment>
                    <h1 className="name">
                        {props.cookie.name}
                    </h1>
                    <p className="review">
                        {props.cookie.review}
                    </p>
                    <div className="buttons">
                        <button 
                            type="button" 
                            style={{backgroundColor: '#ae2f27'}}
                            // atualiza isEditing para exibir o formulário de edição
                            onClick={()=>props.deleteCookie(props.cookie.key)}>
                            remover
                        </button>
                        <button 
                            type="button" 
                            // atualiza isEditing para exibir o formulário de edição
                            onClick={()=>setIsEditingCookie(!isEditingCookie)}>
                            editar
                        </button>
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default Cookie;