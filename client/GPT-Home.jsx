import React from 'react';
import Pagination from './Pagination'; // Ruta del archivo Pagination.jsx

const Home = () => {
  const apiUrl = '/api/data'; // Ajusta la URL de la API según tus necesidades

  return (
    <div>
      <h1>Home Page</h1>
      <Pagination apiUrl={apiUrl} />
    </div>
  );
};

export default Home;
