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
                    state.goals.push(action.payload)
                    state.isLoading = true
                    state.isSuccess = true
                })
                .addCase(createGoal.rejected,(state,action)=>{
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
        }
    }
)

export const {reset} = goalsSlice.actions
export default goalsSlice.reducer