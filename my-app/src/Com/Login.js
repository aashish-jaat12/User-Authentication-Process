import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='registetion'>
    <form onSubmit={handleSubmit}>
      <label>
        Email: <input type="email" name="email" value={form.email} onChange={handleChange} />
      </label><br />
      <label>
        Password: <input type="password" name="password" value={form.password} onChange={handleChange} />
      </label><br />
      <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default Login;
