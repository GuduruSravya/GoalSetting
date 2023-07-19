import React from 'react'
import { useState } from 'react'
import { UseSelector,useDispatch } from 'react-redux'
import {createGoal} from '../features/goals/goalsSlice'


const GoalForm = () => {

    const [text,setText] = useState('');

    const dispatch = useDispatch();

    const submitted = (e) =>{
        e.preventDefault()

        dispatch(createGoal({text}))
        setText('')
    }
  return (
    <section className="form">
        <form onSubmit={submitted}>
            <div className="form-group">
                <label htmlFor="text">Goal</label>
                <input type="text" name='text' id='text' value = {text} onChange={(e)=>setText(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">
                    Add goal
                </button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm