//@desc Get goals - get goals of user
//@route GET /api/goals
//@access Private
const getGoals = async (req,res) =>{
    res.status(200).json({message:'Get goals'});
}

//@desc Set goals - set goals of user
//@route POST /api/goals
//@access Private
const setGoals = async (req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
        return
    }
    console.log(req.body);
    res.status(200).json({message:'Set goals'})
}
//@desc update goals - update goals of user
//@route PUT /api/goals/:id
//@access Private
const updateGoals = async (req,res) =>{
    res.status(200).json({message:`Update goal ${req.params.id}`})
}

//@desc delete goals - delete goals of user
//@route DELETE /api/goals/:id
//@access Private
const deleteGoals = async (req,res) =>{
    res.status(200).json({message:`Delete goals ${req.params.id}`})
}

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}