import React, { useRef }  from 'react';

import './cookieForm.css';

function CookieForm(props){

    // cria referencias para os campos do formulário
    const nameRef = useRef();
    const reviewRef = useRef();

    return(
        <form 
        className="cookieForm"
        // atualiza o cookie recebido por parametro a cada mudança nos campos do formulário
        onChange={(evt) => props.setCookie(Object.assign(props.cookie, {[evt.target.name]: evt.target.value}))}
        onSubmit={(evt) => {
            evt.preventDefault();
            // limpa os campos do formulário após ser enviado
            nameRef.current.value = '';
            reviewRef.current.value = '';
        }}>
            <input 
                name="name" 
                placeholder="nome"
                // exibe o nome atual do cookie no campo
                defaultValue={props.cookie.name}
                // aplica as referencias criadas para os campos do formulário
                ref={nameRef}
                />
            <textarea 
                name="review" 
                placeholder="review"
                // exibe o review atual do cookie no campo
                defaultValue={props.cookie.review}
                // aplica as referencias criadas para os campos do formulário
                ref={reviewRef}
                />

            {/* renderiza os botões do formulário ou qualquer outro campo extra passado em children */}
            {props.children}
        </form>
    )
}

export default CookieForm