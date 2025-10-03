import { act, renderHook } from "@testing-library/react";
import { useCount } from "~/hooks/useCounter";

describe("useCounter hook", () => {
	it("should initialize with default value of 0", () => {
		const { result } = renderHook(() => useCount());
		expect(result.current.count).toBe(0);
	});

	it("should initialize with custom initial value", () => {
		const { result } = renderHook(() => useCount(12));
		expect(result.current.count).toBe(12);
	});

	it("should increment count by 1", () => {
		const { result } = renderHook(() => useCount());

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(1);
	});

	it("should increment multiple times", () => {
		const { result } = renderHook(() => useCount());

		act(() => {
			result.current.increment();
			result.current.increment();
			result.current.increment();
		});

		expect(result.current.count).toBe(3);
	});

	it("should decrement count by 1", () => {
		const { result } = renderHook(() => useCount(4));

		act(() => {
			result.current.decrement();
		});

		expect(result.current.count).toBe(3);
	});

	it("should not go below 0 when decrementing from 0", () => {
		const { result } = renderHook(() => useCount());

		act(() => {
			result.current.decrement();
		});

		expect(result.current.count).toBe(0);
	});

	it("should not go negative when decrementing multiple times", () => {
		const { result } = renderHook(() => useCount());

		act(() => {
			result.current.decrement();
			result.current.decrement();
			result.current.decrement();
		});

		expect(result.current.count).toBe(0);
	});

	it("should reset to initial default value", () => {
		const { result } = renderHook(() => useCount());

		act(() => {
			result.current.increment();
			result.current.decrement();
			result.current.increment();
			result.current.increment();
			result.current.increment();

			result.current.reset();
		});

		expect(result.current.count).toBe(0);
	});

	it("should reset to custom initial value", () => {
		const { result } = renderHook(() => useCount(20));

		act(() => {
			result.current.reset();
		});

		expect(result.current.count).toBe(20);
	});

	it("should handle increment and decrement combinations", () => {
		const { result } = renderHook(() => useCount(4));

		act(() => {
			result.current.decrement();
			result.current.decrement();

			result.current.increment();
		});

		expect(result.current.count).toBe(3);
	});

	it("should provide all hook functions", () => {
		const { result } = renderHook(() => useCount(4));

		expect(typeof result.current.increment).toBe("function");
		expect(typeof result.current.decrement).toBe("function");
		expect(typeof result.current.reset).toBe("function");
	});
});
