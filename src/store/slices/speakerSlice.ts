import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Speaker } from '../../types';
import { mockSpeakers } from '../mockData';

const initialState = {
  speakers: mockSpeakers,
};

const speakerSlice = createSlice({
  name: 'speakers',
  initialState,
  reducers: {
    setSpeakers: (state, action: PayloadAction<Speaker[]>) => {
      state.speakers = action.payload;
    },
    addSpeaker: (state, action: PayloadAction<Speaker>) => {
      state.speakers.push(action.payload);
    },
    updateSpeaker: (state, action: PayloadAction<Speaker>) => {
      const index = state.speakers.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.speakers[index] = action.payload;
      }
    },
    deleteSpeaker: (state, action: PayloadAction<string>) => {
      state.speakers = state.speakers.filter(s => s.id !== action.payload);
    },
  },
});

export const { setSpeakers, addSpeaker, updateSpeaker, deleteSpeaker } = speakerSlice.actions;
export default speakerSlice.reducer;