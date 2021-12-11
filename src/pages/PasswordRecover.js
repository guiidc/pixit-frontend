import React, { useState } from 'react';
import axiosRequest from '../utils/axiosRequest';
import { useNavigate } from 'react-router-dom';

function PasswordRecover() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axiosRequest.post('password-recover', {
      email: e.target.email.value,
    })
    .then(() => {
      setMessage(`Um link foi enviado para seu e-mail, você será redirecionado em 5 segundos...`);
      setTimeout(() => navigate('/'), 5000)
    })
    .catch(() => {
      setMessage('Algo deu errado.. =(')
    });
  }

  return (
    <div className="main-container bg-radial flex-column">
      <form className="form flex-column" onSubmit={ handleSubmit }>
        <img src="./icons/recover.svg" alt="recover password icon"/>
        <h1 className="form-title">Problemas?</h1>
        <p className="password-text">Insira seu e-mail e logo em seguida lhe enviaremos um link para que vc possa voltar a acessar sua conta sem problemas.</p>
        { message ? <span className="password-msg">{ message }</span> : null}
        <input className="input" name="email"></input>
        <button className="button">Enviar</button>
      </form>
    </div>
  )
}

export default PasswordRecover;