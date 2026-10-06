import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/features/counter/counterSlice"
export const store = configureStore({
	reducer: {
        counter:counterReducer
    },
});
