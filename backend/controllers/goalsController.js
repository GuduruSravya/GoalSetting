const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@desc Get goals - get goals of user
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req,res) =>{
    const goals = await Goal.find({user:req.user.id})
    res.status(200).json(goals);
})

//@desc Set goals - set goals of user
//@route POST /api/goals
//@access Private
const setGoals = asyncHandler(async (req,res) =>{

    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        user:req.user.id,
        text:req.body.text
    })
    
    res.status(200).json(goal)
})
//@desc update goals - update goals of user
//@route PUT /api/goals/:id
//@access Private
const updateGoals = asyncHandler(async (req,res) =>{

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    

    if(!req.user){
        res.status(400)
        throw new Error("User does not exist")
    }
    
    //Only users can delete their own goals
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json(updatedGoal)
})

//@desc delete goals - delete goals of user
//@route DELETE /api/goals/:id
//@access Private
const deleteGoals = asyncHandler(async (req,res) =>{
    const goal = await Goal.findByIdAndRemove(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal is not available')
    }
    if(!req.user){
        res.status(400)
        throw new Error("User does not exist")
    }
    
    //Only users can delete their own goals
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }

    
    res.status(200).json({ id:req.params.id })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}