import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "~/components/Counter/Counter";

describe("Counter component", () => {
	it("should render with initial value of 0", () => {
		render(<Counter />);
		expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
	});

	it("should increment value when + button is clicked", async () => {
		const user = userEvent.setup();
		render(<Counter />);
		const incrementBtn = screen.getByRole("button", { name: "+" });

		await user.click(incrementBtn);
		await user.click(incrementBtn);

		expect(screen.getByText(/count: 2/i)).toBeInTheDocument();
	});

	it("should decrement value when - button is clicked", async () => {
		const user = userEvent.setup();
		render(<Counter />);
		const decrementBtn = screen.getByRole("button", { name: "-" });
		const incrementBtn = screen.getByRole("button", { name: "+" });

		await user.click(incrementBtn);
		await user.click(incrementBtn);
		await user.click(decrementBtn);

		expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
	});

	it("should not go negative when decrementing multiple times from low value", async () => {
		const user = userEvent.setup();
		render(<Counter />);
		const decrementBtn = screen.getByRole("button", { name: "-" });
		const incrementBtn = screen.getByRole("button", { name: "+" });

		await user.click(incrementBtn);
		await user.click(decrementBtn);
		await user.click(decrementBtn);

		expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
	});

	it("should allow incrementing after reaching 0", async () => {
		const user = userEvent.setup();
		render(<Counter />);
		const decrementBtn = screen.getByRole("button", { name: "-" });
		const incrementBtn = screen.getByRole("button", { name: "+" });

		await user.click(incrementBtn);
		await user.click(decrementBtn);
		await user.click(decrementBtn);
		await user.click(incrementBtn);

		expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
	});
});
