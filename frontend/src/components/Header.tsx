import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';

import { AppDispatch } from '../store/store';
import { logout, reset } from '../features/auth/authSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header>
      <nav className='header'>
        <div>
          <Link to={'/'}>Goal Reacher</Link>
        </div>
        <ul>
          {!user ? (
            <Fragment>
              <li>
                <Link to={'/login'}>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to={'/register'}>
                  <FaUser /> Register
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <button className='btn' onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
}
