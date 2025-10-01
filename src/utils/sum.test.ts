import { sum } from "~/utils/sum";

describe("<sum() function>", () => {
	it("should return the sum of two numbers positive", () => {
		expect(sum(2, 3)).toBe(5);
	});

	it("should return the sum of two numbers negative", () => {
		expect(sum(-2, -10)).toBe(-12);
	});

	it("should return the sum of positive and negative numbers", () => {
		expect(sum(9, -99)).toBe(-90);
	});
});
