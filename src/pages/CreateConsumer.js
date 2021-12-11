import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosRequest from '../utils/axiosRequest'

function CreateConsumer() {
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleList = () => {
    navigate('/consumers')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, sex, city } = e.target;
    const token = localStorage.getItem('token')
    axiosRequest.post('consumers', {
      name: name.value,
      email: email.value,
      sex: sex.value,
      city: city.value,
    },
    {headers: {authorization: token}})
    .then(() => navigate('/consumers'))
    .catch((err) => setErrors(err.response.data.message))

  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
  }, [navigate]);

  return (
    <>
    <nav className="flex-row">
      <h4>ConsumersBook</h4>
      <div className="links">
        <button onClick={ handleList }>Lista</button>
        <button onClick={ handleLogout }>Logout</button>
      </div>
    </nav>
    <div className="flex-column">
      <img src="./icons/consumer.svg" alt="consumer icon"></img>
      <form className="consumer-form flex-column" onSubmit={ handleSubmit }>
        <input type="text" placeholder="nome" name="name" required/>
        <input type="email" placeholder="e-mail" name="email" required/>
        <input type="text" placeholder="city" name="city" required/>
        <select name="sex" required>
          <option value="" defaultValue>Escolha o sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
       { errors ? <span className="errors">{errors}</span> : null }
        <button type="submit" className="button" required>Cadastrar</button>
      </form>
    </div>
    </>
  )
}

export default CreateConsumer;