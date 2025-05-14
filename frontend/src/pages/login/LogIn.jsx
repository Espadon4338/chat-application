import React, { useState } from 'react'

import './login.scss';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({username, password});
        await login(username, password);
    }

  return (
    <div className='h-screen w-xl flex flex-col items-center justify-center comp-body'>
        <form className='w-full' onSubmit={handleSubmit}>
            <div className='flex flex-col'>
                <label className='label p-2'>
                    <span className=''>Username</span>
                </label>
                <input type='text' placeholder='Enter your username...' className='w-full input input-bordered h-10'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className='flex flex-col'>
                <label className='label p-2'>Password</label>
                <input type='password' placeholder='Enter your password...' className='w-full input input-bordered h-10'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Link to="/signup" className='text-sm text-neutral-400 p-2 hover:underline hover:text-blue-600 mt-2 inline-block'>
                Sign up
            </Link>

            <div>
                <button type='submit' className='w-full text-lg text-gray-200 p-5 btn mt-2 cursor-pointer'>Login</button>
            </div>
        </form>
    </div>
  )
}

export default LogIn;