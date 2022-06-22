import { useState, useEffect, Fragment, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import { register, reset } from '../features/auth/authSlice';
import { AppDispatch } from '../store/store';

import Spinner from '../components/Spinner';

import { I_Credentials, I_InitState } from '../interface/PropsCollection';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<I_Credentials>({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { entity, isLoading, isError, isSuccess, message }: I_InitState =
    useSelector((state: any) => state.auth);

  let user: null;
  user = entity as null;

  useEffect(() => {
    if (isError) {
      setErrorMessage(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState: I_Credentials) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const closeError = () => {
    setErrorMessage('');
  };

  const onSubmit = (e: FormEvent<unknown>) => {
    e.preventDefault();

    if (password !== password2) {
      setErrorMessage('Password do not match');
    } else {
      const userData = {
        name,
        email,
        password
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        {errorMessage && (
          <div className='errorContainer'>
            <p>{errorMessage}</p>
            <button onClick={closeError}>X</button>
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name...'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email...'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter your password...'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm your password...'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
}
