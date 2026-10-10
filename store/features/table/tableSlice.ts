"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITable {
	tableNumber: number | null;
	saveAt: number | null;
	id : string | null
}
const initialState: ITable = {
	tableNumber: null,
	saveAt: null,
	id:null
};
const tableSlice = createSlice({
	name: "table",
	initialState: initialState,
	reducers: {
		addTable: (state, actions: PayloadAction<ITable>) => {
			state.tableNumber = actions.payload.tableNumber;
			state.saveAt = actions.payload.saveAt;
			state.id = actions.payload.id;
		},
		clearTable: (state) => {
			state.saveAt = null;
			state.tableNumber = null;
		},
		checkTableExpiry: (state) => {
			const ONE_HOUR = 60 * 1000;
			if (state.saveAt && Date.now() - state.saveAt > ONE_HOUR) {
				state.saveAt = null;
				state.tableNumber = null;
				state.id = null;
			}
			return state
		},
	},
});

export const { addTable, clearTable, checkTableExpiry } = tableSlice.actions;
export default tableSlice.reducer;
