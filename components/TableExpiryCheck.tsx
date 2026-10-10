"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkTableExpiry } from "@/store/features/table/tableSlice";

export default function TableExpiryCheck (){
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkTableExpiry());
	}, [dispatch]);

	return null;
}
