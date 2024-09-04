import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios.get('http://localhost:5000/candidate-details', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => setUser(res.data))
      .catch(err => {
        console.error('Error fetching user details:', err);
        navigate('/login');
      });
    }
  }, [navigate]);

  return (
    <div className='registetion'>
      <h1>Welcome {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      <p>Number: {user. contactNumber}</p>
      <p>Gender: {user.gender}</p>
     
      
      
    </div>
  );
}

export default Home;
