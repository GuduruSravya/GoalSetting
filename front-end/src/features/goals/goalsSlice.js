import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import goalsService from './goalsService'

const initState ={
    goals:[],
    isError: false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const createGoal = createAsyncThunk('goals/create',async(goalData,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.createGoal(goalData,token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const getGoals = createAsyncThunk('goals/getAll',async(_,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.getGoals(token)

    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGoal = createAsyncThunk('goals/delete',async(id,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.deleteGoal(id,token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateGoal = createAsyncThunk('goals/update',async(body,thunkAPI)=>{
    try{
        const token = thunkAPI.getState().auth.user.token
        return await goalsService.updateGoal(body,token)
    }
    catch(error){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalsSlice = createSlice(
    {
        name:'goal',
        initialState:initState,
        reducers:{
            reset:(state)=>initState
        },
        extraReducers: (builder) =>{
            builder
                .addCase(createGoal.pending,(state)=>{
                    state.isLoading = true
                })
                .addCase(createGoal.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = true
                    state.goals.push(action.payload)
                })
                .addCase(createGoal.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(getGoals.pending,(state)=>{
                    state.isLoading =true
                })
                .addCase(getGoals.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = true
                    state.goals = action.payload
                })
                .addCase(getGoals.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(deleteGoal.pending,(state)=>{
                    state.isLoading =true
                })
                .addCase(deleteGoal.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = true
                    state.goals = state.goals.filter((goal)=>goal._id !== action.payload.id)
                })
                .addCase(deleteGoal.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
                .addCase(updateGoal.pending,(state)=>{
                    state.isLoading =true
                })
                .addCase(updateGoal.fulfilled,(state,action)=>{
                    state.isLoading = false
                    state.isSuccess = true
                    state.goals[state.goals.findIndex(goal => goal._id === action.payload._id)] = action.payload
                       
                })
                .addCase(updateGoal.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
        }
    }
)

export const {reset} = goalsSlice.actions
export default goalsSlice.reducer