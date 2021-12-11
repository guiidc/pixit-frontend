import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosRequest from '../utils/axiosRequest';

function Consumers() {
  const [consumers, setConsumers] = useState([]);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/create-consumer');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleDetails = (id) => {
    navigate(`/consumers/${id}`)
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    axiosRequest.get('consumers', { headers: {authorization: token}})
    .then((response) => setConsumers(response.data))
    .catch();
  }, [])

  return (
    <>
    <nav className="flex-row">
      <h4>ConsumersBook</h4>
      <div className="links">
        <button onClick={ handleAdd }>+ Cadastrar</button>
        <button onClick={ handleLogout }>Logout</button>
      </div>
    </nav>
    <div>
    <h4 className="table-title">Cadastros</h4>
    <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td>ID</td>
              <td>Nome</td>
              <td>E-mail</td>
              <td>Sexo</td>
              <td>Cidade</td>
            </tr>
          </tbody>
          <tbody>
            { consumers.map((consumer) => (
              <tr
                className="consumer" key={ consumer.id }
                onClick={ () => handleDetails(consumer.id) }
              >
                  <td>{ consumer.id }</td>
                  <td>{ consumer.name }</td>
                  <td>{ consumer.email }</td>
                  <td>{ consumer.sex }</td>
                  <td>{ consumer.city }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Consumers;