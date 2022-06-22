import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';

import { AppDispatch } from '../store/store';
import { getGoals } from '../features/goals/goalSlice';
import { reset } from '../features/auth/authSlice';
import { I_Credentials } from '../interface/PropsCollection';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: any) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state: any) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch((getGoals as any)());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      {(goals as [])?.length > 0 ? (
        <div className='goals'>
          {goals.map((goal: I_Credentials) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (
        <h3>You have not set any goals</h3>
      )}
    </Fragment>
  );
}
