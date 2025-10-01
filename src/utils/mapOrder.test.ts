import { mapOrder } from "~/utils/mapOrder";

describe("<mapOrder() function>", () => {
	it("should return empty array if originalArray is null", () => {
		expect(mapOrder(null as any, [1, 2, 3, 4], "id")).toEqual([]);
	});

	it("should return empty array if orderArray is null", () => {
		expect(mapOrder([{ id: 1 }, { id: 2 }], null as any, "id")).toEqual([]);
	});

	it("should return empty array if key is null", () => {
		expect(mapOrder([{ id: 1 }, { id: 2 }], [1, 2, 3, 4], "")).toEqual([]);
	});

	it("should return sorted array by given order", () => {
		const originalArray = [
			{ id: 4, name: "D" },
			{ id: 1, name: "A" },
			{ id: 3, name: "C" },
			{ id: 2, name: "B" },
		];

		const orderArray = [1, 2, 3, 4];
		const key = "id";

		const result = mapOrder(originalArray, orderArray, key);

		expect(result.map((item) => item.id)).toEqual([1, 2, 3, 4]);
	});

	it("should push items not in orderArray to the end", () => {
		const originalArray = [
			{ id: 4, name: "D" },
			{ id: 1, name: "A" },
			{ id: 26, name: "E" },
			{ id: 3, name: "C" },
			{ id: 2, name: "B" },
		];

		const orderArray = [1, 2, 3];
		const key = "id";

		const result = mapOrder(originalArray, orderArray, key);

		expect(result.map((item) => item.id)).toEqual([1, 2, 3, 4, 26]);
	});

	it("should return originalArray when all items are not in orderArray", () => {
		const originalArray = [
			{ id: 4, name: "D" },
			{ id: 1, name: "A" },
			{ id: 3, name: "C" },
			{ id: 2, name: "B" },
		];

		const orderArray: number[] = [];
		const key = "id";

		const result = mapOrder(originalArray, orderArray, key);

		expect(result.map((item) => item.id)).toEqual([4, 1, 3, 2]);
	});

	it("should return sorted array with custom key", () => {
		const originalArray = [
			{ name: "A" },
			{ name: "C" },
			{ name: "B" },
			{ name: "D" },
		];

		const orderArray = ["A", "B", "C", "D"];
		const customKey = "Char";

		const result = mapOrder(originalArray, orderArray, customKey);

		expect(result.map((item) => item.name)).toEqual(["A", "C", "B", "D"]);
	});
});
