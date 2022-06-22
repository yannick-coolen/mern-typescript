import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';

export default function GoalItem({ goal }: any) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch((deleteGoal as any)(goal._id));
  };

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={onDelete} className='close'>
        X
      </button>
    </div>
  );
}
