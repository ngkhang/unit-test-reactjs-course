import { validateEmail } from "~/utils/validateEmail";

describe("validateEmail() function", () => {
	const testCases: any[] = [
		["abc@gmail.com", true],
		["abcgmail.com", false],
		["@gmail.com", false],
		[["@gmail.com"], false],
		[{ email: "abc@gmail.com" }, false],
	];

	it.each(testCases)("%p ----> %p", (email, expected) => {
		expect(validateEmail(email)).toBe(expected);
	});
});
