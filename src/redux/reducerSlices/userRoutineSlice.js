import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserRoutine, postUserRoutine } from '../../api/userApi';

const initialState = {
  userRoutineActionList: null,
  isLoading: false,
  error: null,
  remainingTime: 0,
};

export const fetchUserRoutine = createAsyncThunk(
  'userRoutineSlice/fetchUserRoutine',
  async () => {
    const response = await getUserRoutine();
    return response.data;
  }
);

function routineSerializer(payload) {
  const data = payload.documents;
  let userRoutineActionList = [];
  for (let i = 0; i < data.length; i++) {
    const routine = data[i];
    const id = routine.name.match(/(r\w+)/g).at(-1);
    const fields = routine.fields;
    const duration = fields.duration.integerValue;
    // TODO: remove unused vars if they're not needed
    const category = fields.category.stringValue;
    const routineName = fields.routine_name.stringValue;
    const difficulty = fields.difficulty.integerValue;
    const activeDay = fields.active_day.integerValue;
    const streak = fields.streak.integerValue;
    const routineObj = {
      id: id,
      name: routineName,
      category: category,
      complete: false,
      duration: parseInt(duration),
      difficulty: parseInt(difficulty),
      streak: parseInt(streak),
      activeDay: parseInt(activeDay),
    };
    userRoutineActionList.push(routineObj);
  }
  return userRoutineActionList;
}

function calculateDuration(array) {
  const total = array.reduce((accumulator, object) => {
    if (!object.complete) {
      return accumulator + object.duration;
    }
    return accumulator;
  }, 0);
  return total;
}

export const userRoutineSlice = createSlice({
  name: 'userRoutineSlice',
  initialState,
  reducers: {
    updateRoutineStatus: (state, action) => {
      const index = state.userRoutineActionList.findIndex(routine => routine.id === action.payload);
      const newArray = [...state.userRoutineActionList];
      const currentStrike = newArray[index].streak;

      if (!newArray[index].complete) {
        state.remainingTime -= newArray[index].duration;
        state.streak += 1;
      } else {
        state.remainingTime += newArray[index].duration;
        state.streak = currentStrike;
      }
      newArray[index].complete = !newArray[index].complete;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoutine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserRoutine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userRoutineActionList = routineSerializer(action.payload);
        state.remainingTime = calculateDuration(state.userRoutineActionList);
      })
      .addCase(fetchUserRoutine.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateRoutineStatus } = userRoutineSlice.actions;
export default userRoutineSlice.reducer;