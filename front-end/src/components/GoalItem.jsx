import React, { useState } from 'react'
import {MdDeleteForever} from 'react-icons/md'
import {useDispatch} from 'react-redux'
import {deleteGoal, updateGoal} from '../features/goals/goalsSlice'


const GoalItem = ({goal}) => {
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false);
    const [updatedText, setUpdatedText] = useState('');

    const handleUpdateText = () => {
        dispatch(updateGoal({ id: goal._id, text: updatedText }));
        setIsEditing(false);
      };
    
  return (
   <div className="goal">
    <div>
        {new Date(goal.createdAt).toLocaleString('en-US')}
    </div>
    
    {isEditing ? (
        <div className="form-group">
            <input
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
        </div>
        
      ) : (
        <h2 className="">{goal.text}</h2>
      )}
    <button onClick={()=>{dispatch(deleteGoal(goal._id))}}className="close">
    <MdDeleteForever/>
    </button>
    <div className='update__div'>
    {isEditing ? (
          <button className="btn" onClick={handleUpdateText}>
            Update
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => {
              setIsEditing(true);
              setUpdatedText(goal.text);
            }}
          >
            Edit
          </button>
        )}
    </div>
    
   </div>
  )
}

export default GoalItem