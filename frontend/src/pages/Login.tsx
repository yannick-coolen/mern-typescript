import { Fragment, useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaSignInAlt } from 'react-icons/fa';

import { I_Credentials, I_InitState } from '../interface/PropsCollection';
import { login, reset } from '../features/auth/authSlice';
import { AppDispatch } from '../store/store';
import Spinner from '../components/Spinner';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState<I_Credentials>({
    email: '',
    password: ''
  });

  const { email, password } = formData;

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
  }, [user, isError, isSuccess, message, dispatch, setErrorMessage, navigate]);

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

    const userData = {
      email,
      password
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
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
            <button type='submit' className='btn btn-block'>
              Login
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
}
