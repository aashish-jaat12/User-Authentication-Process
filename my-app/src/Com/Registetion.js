import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registetion() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    address: '',
    email: '',
    contactNumber: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/register', { ...form });
      console.log(res.data);
      navigate('/login');
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  

  return (
    <div className='registetion'>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" name="name" value={form.name} onChange={handleChange} />
        </label><br />
        <label>
          DOB: <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        </label><br />
        <label>
          Gender: <input type="text" name="gender" value={form.gender} onChange={handleChange} />
        </label><br />
        <label>
          Address: <input type="text" name="address" value={form.address} onChange={handleChange} />
        </label><br />
        <label>
          Email: <input type="email" name="email" value={form.email} onChange={handleChange} />
        </label><br />
        <label>
          Contact Number: <input type="number" name="contactNumber" value={form.contactNumber} onChange={handleChange} />
        </label><br />
        <label>
       Password: <input type="text" name="password" value={form.password} onChange={handleChange} />
        </label><br />
        <button type="submit">Register</button>
      </form>
    
    </div>
  );
}

export default Registetion;
