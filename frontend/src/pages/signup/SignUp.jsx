import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: '',
    display_name: '',
    password: '',
    confirm_password: '',
  })

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  }

  return (
    <div className='h-screen w-xl flex flex-col items-center justify-center comp-body'>
      <div className='w-full text-center p-2'>Sign up</div>

      <form className='w-full' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='label p-2'>Your username</label>
          <input type="text" placeholder='Enter your username...' className='w-full input input-bordered h-10'
          value={inputs.username}
          onChange={(e) => setInputs({...inputs, username: e.target.value})} />
        </div>

        <div className='flex flex-col mt-2'>
          <label className='label p-2'>Your display name</label>
          <input type="text" placeholder='Enter your display name...' className='w-full input input-bordered h-10' 
          value={inputs.display_name} 
          onChange={(e) => setInputs({...inputs, display_name: e.target.value })} />
        </div>

        <div className='flex flex-col mt-2'>
          <label className='label p-2'>Your password</label>
          <input type="password" placeholder='Enter your password...' className='w-full input input-bordered h-10'
          value={inputs.password}
          onChange={(e) => setInputs({...inputs, password: e.target.value})} />
        </div>

        <div className='flex flex-col mt-2'>
          <label className='label p-2'>Confirm your password</label>
          <input type="password" placeholder='Enter your password...' className='w-full input input-bordered h-10' 
          value={inputs.confirm_password}
          onChange={(e) => setInputs({...inputs, confirm_password: e.target.value})} />
        </div>

        <Link to="/login" className='text-sm text-neutral-400 p-2 hover:underline hover:text-blue-600 mt-2 inline-block'>
          Log in
        </Link>

        <div>
          <button type='submit' className='w-full text-lg text-gray-200 p-5 btn mt-6'>Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp;