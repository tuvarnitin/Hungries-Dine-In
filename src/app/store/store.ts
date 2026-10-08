import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "@/store/features/cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({cart:cartReducer})

const persistConfig = {
	key:"root",
	storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type DispatchState = typeof store.dispatch;
