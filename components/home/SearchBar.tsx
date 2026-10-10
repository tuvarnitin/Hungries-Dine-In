'use client'
import { Mic, Search } from "lucide-react";
import React, { Dispatch } from "react";

const SearchBar = ({setSelectedFilter}:{setSelectedFilter:Dispatch<string>}) => {
	let timerId : any 
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
		clearTimeout(timerId)
		timerId = setTimeout(()=>{
			setSelectedFilter(e.target.value)
		},500)
	}
	
	return (
		<div className=" bg-white py-3 px-4 rounded-full flex justify-between items-center gap-4 md:py-2">
			<div className="flex items-center gap-2 flex-1">
				<Search size={18} strokeWidth={2} className="text-muted-text" />
				<input
					type="text"
					name="search"
					className="outline-none flex-1 text-muted-text"
					placeholder="Search dishes, drinks, or ingredients..."
                    onChange={handleChange}
				/>
			</div>
			<Mic size={18} strokeWidth={2} className="text-muted-text" />
		</div>
	);
};

export default SearchBar;
