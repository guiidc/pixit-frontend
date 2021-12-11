import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosRequest from '../utils/axiosRequest'
import icon from '../images/consumer.svg';

function ConsumerDetails() {
  const [errors, setErrors] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [city, setCity] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleList = () => {
    navigate('/consumers')
  }

  const handleChange = ({ target }) => {
    if(target.name === 'name') return setName(target.value);
    if(target.name === 'email') return setEmail(target.value);
    if(target.name === 'city') return setCity(target.value);
    if(target.name === 'sex') return setSex(target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token')
    axiosRequest.put(`consumers/${id}`, { name, email, sex, city },
    { headers: {authorization: token }})
    .then(() => navigate('/consumers'))
    .catch((err) => setErrors(err.response.data.message))
  }

  const handleRemoveConsumer = () => {
    const token = localStorage.getItem('token');
    axiosRequest.delete(`/consumers/${id}`, { headers: { authorization: token }})
    .then(() => navigate('/consumers'))
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    axiosRequest.get(`/consumers/${id}`, {headers: { authorization: token }})
    .then((response) => {
      const { data } = response;
      setName(data.name);
      setEmail(data.email);
      setCity(data.city);
      setSex(data.sex);
    })
    .catch((err) => console.log(err));
  }, [id, navigate])

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
      <img src={ icon } alt="consumer icon"></img>
      <form className="consumer-form flex-column" onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="nome"
          name="name"
          value={ name }
          onChange={ handleChange }
          required
          />
        <input
          type="email"
          placeholder="e-mail"
          name="email"
          value={ email }
          onChange={ handleChange }
          required
          />
        <input
          type="text"
          placeholder="city"
          name="city"
          value={ city }
          onChange={ handleChange }
          required
        />
        <select name="sex" onChange={ handleChange } required>
          <option value="">Escolha o sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
       { errors ? <span className="errors">{errors}</span> : null }
       <div className='button-container'>
          <button type="submit" className="button" >Atualizar</button>
          <button type="button" className="neutral-button" onClick={ () => navigate('/consumers')}>Cancelar</button>
          <button type="button" className="danger-button" onClick={ handleRemoveConsumer }>Excluir</button>
       </div>
      </form>
    </div>
    </>
  )
}

export default ConsumerDetails;