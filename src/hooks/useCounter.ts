import { useState } from "react";

export const useCount = (initialValue: number = 0) => {
	const [count, setCount] = useState<number>(initialValue);

	const increment = () => setCount((val) => val + 1);
	const decrement = () => setCount((val) => Math.max(0, val - 1));
	const reset = () => setCount(initialValue);

	return {
		count,
		increment,
		decrement,
		reset,
	};
};
