import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/interceptor";
import { CHARACTERS } from "../../constant/apiRoutes";
import { CharacterData, Pagination } from "../../interface";

const initialState = {
  characterData: [] as CharacterData[],
  loading: false,
  pagination: {} as Pagination,
};

export const getCharactersData = createAsyncThunk(
  "characters/getCharactersData",
  async (query: string) => {
    const response = await api.get(CHARACTERS + query);
    return response.data;
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharactersData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCharactersData.fulfilled, (state, action) => {
      state.loading = false;
      state.characterData = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(getCharactersData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default charactersSlice.reducer;
