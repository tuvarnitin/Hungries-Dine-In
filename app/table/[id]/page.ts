"use client";
import { addTable, ITable } from "@/store/features/table/tableSlice";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Id = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		const fetchTable = async () => {
			try {
				const res = await axios.get(`/api/table/${id}`);
				const table:ITable = res.data.table;
				dispatch(addTable({
					id:table.id,
					saveAt:Date.now(),
					tableNumber:table.tableNumber
				}))
			} catch (error:any) {
				console.log("Erros occured ",error);
			}finally{
				router.push("/")
			}
		};
		fetchTable()
	}, []);
};

export default Id;
