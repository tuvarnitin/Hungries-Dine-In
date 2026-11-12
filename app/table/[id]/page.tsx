"use client";
import { addTable, type ITable } from "@/store/features/table/tableSlice";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { notifyError } from "@/lib/toast-notifications";
import { toast } from "react-toastify";

const Id = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		const fetchTable = async () => {
			try {
				const res = await axios.get(`/api/table/${id}`);
				const table: ITable = res.data.table;
				dispatch(
					addTable({
						id: table.id,
						saveAt: Date.now(),
						tableNumber: table.tableNumber,
					}),
				);
				toast.success(`Table ${table.tableNumber} selected.`);
			} catch (error: unknown) {
				notifyError(error, "Unable to load this table.");
			} finally {
				router.push("/");
			}
		};
		void fetchTable();
	}, [dispatch, id, router]);

	return <p className="text-center text-muted-text">Opening table...</p>;
};

export default Id;
