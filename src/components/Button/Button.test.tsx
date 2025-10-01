import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "~/components/Button/Button";

describe("Button component", () => {
	it("should render and click to button", async () => {
		// ARRANGE - Set up test dependencies and render component
		const user = userEvent.setup(); // Create user instance
		const onClick = jest.fn(); // Create mock function
		// Mount Button component into Virtual DOM in Test environment
		render(<Button content="Click Me" onClick={onClick} />);
		// Get Button component in DOM global base on role is `button` and name "click me" based on getByRole() method in screen object
		const button = screen.getByRole("button", { name: /click me/i });

		// ACT - Perform user interaction
		await user.click(button); // Simulate user click button

		// ASSERT - Verify expected behavior
		expect(button).toBeInTheDocument(); // Check Button component not unmount
		expect(onClick).toHaveBeenCalledTimes(1); // Check onClick function be call
	});
});
