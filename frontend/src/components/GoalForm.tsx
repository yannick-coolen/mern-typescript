import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';
import { AppDispatch } from '../store/store';

export default function GoalForm() {
  const [text, setText] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch((createGoal as any)({ text }));
    setText('');
  };

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={onChangeText}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}
