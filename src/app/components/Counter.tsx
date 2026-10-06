'use client'
import { decrement, increment, reset } from '@/store/features/counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
	const counter : number = useSelector((state:{counter:number}) => state.counter);
    const dispatch = useDispatch()

    console.log(counter)
  return (
		<div className="min-h-dvh text-dark-text flex flex-col items-center justify-center ">
			<h1 className="text-2xl">Counter : {counter}</h1>
			<div>
				<button
					className="border border-dark-text px-4 py-2 rounded-xl mt-4 mr-4"
					onClick={() => dispatch(increment())}
				>
					Increment
				</button>
				<button
					className="border border-dark-text px-4 py-2 rounded-xl mt-4 mr-4"
					onClick={() => dispatch(decrement())}
				>
					Decrement
				</button>
				<button
					className="border border-dark-text px-4 py-2 rounded-xl mt-4 mr-4"
					onClick={() => dispatch(reset())}
				>
					Reset
				</button>
			</div>
		</div>
	);
}

export default Counter