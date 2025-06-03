import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        axios.get('http://localhost:3001/register')
        .then((response) => {
            // console.log(response.data);
        })
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/register', {
            email,
            username,
            password
        })
        .then(() => {
            alert('Registered successfully');
           setEmail('');
           setUsername('');
           setPassword('');
           fetchUsers();
           navigate('/login');
        })
        .catch((error) => {
            console.log('Error registering user', error);
        })
    }

  return (
    <div className='w-full h-screen flex'>
        <div className='w-[50%] h-[100%] bg-gray-600 text-white flex justify-center items-center'>
            <form className='text-center border rounded-lg w-[600px] h-[400px] p-9'
                onSubmit={handleRegister}
            >
                {/* Email Input */}
                <label>Email</label>
                <br />
                <input className='w-[400px] h-[40px] rounded-xl bg-gray-400 p-2' 
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}/>
                <br />
                <br />
                {/* Username Input */}
                <label>Username</label>
                <br />
                <input className='w-[400px] h-[40px] rounded-xl bg-gray-400 p-2' 
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={(e)=> setUsername(e.target.value)}/>
                <br />
                <br />
                <label>Password</label>
                <br />
                <input className='w-[400px] h-[40px] rounded-xl bg-gray-400 p-2' 
                  type='password'
                  placeholder='password'
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}/>
                <br />
                <br />
                {/* Button */}
                <button className='w-[200px] h-[50px] border hover:bg-slate-300'
                    type='submit'
                >SignUp</button>
            </form>
        </div>
        <div className='w-[50%] h-[100%] flex justify-center items-center bg-cyan-200'>
            <h2 className='text-3xl text-black'>SIGNUP</h2>
        </div>
    </div>
  )
}

export default SignUp