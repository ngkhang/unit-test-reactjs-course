import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpForm } from "~/components/SignUpForm/SignUpForm";

const defaultValues = {
	email: "test@gmail.com",
	password: "Test@1234",
};

describe("SignUpForm component", () => {
	it("should render with default values", () => {
		render(
			<SignUpForm onSubmit={jest.fn()} defaultValues={defaultValues} />
		);

		expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue(
			defaultValues.email
		);
		expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue(
			defaultValues.password
		);
	});

	it("should show multiple validation errors", async () => {
		const user = userEvent.setup();
		const mockOnSubmit = jest.fn();

		render(<SignUpForm onSubmit={mockOnSubmit} />);
		const submitBtn = screen.getByText(/submit/i);

		await user.click(submitBtn);

		expect(
			await screen.findByText(/email is required/i)
		).toBeInTheDocument();
		expect(
			await screen.findByText(/password is required/i)
		).toBeInTheDocument();
		expect(mockOnSubmit).not.toHaveBeenCalled();
	});

	it("should show error when email is empty", async () => {
		const mockOnSubmit = jest.fn();
		const user = userEvent.setup();
		render(<SignUpForm onSubmit={mockOnSubmit} />);

		await user.type(
			screen.getByPlaceholderText(/enter password/i),
			defaultValues.password
		);

		await user.click(screen.getByText(/submit/i));

		expect(
			await screen.findByText(/email is required/i)
		).toBeInTheDocument();
		expect(mockOnSubmit).not.toHaveBeenCalled();
	});

	it("should show error when email format is invalid", async () => {
		const mockOnSubmit = jest.fn();
		const user = userEvent.setup();
		render(<SignUpForm onSubmit={mockOnSubmit} />);

		await user.type(
			screen.getByPlaceholderText(/enter email/i),
			"email invalid"
		);
		await user.type(
			screen.getByPlaceholderText(/enter password/i),
			defaultValues.password
		);

		await user.click(screen.getByText(/submit/i));

		expect(
			await screen.findByText(/email is not valid/i)
		).toBeInTheDocument();
		expect(mockOnSubmit).not.toHaveBeenCalled();
	});

	it("should show error when password is empty", async () => {
		const mockOnSubmit = jest.fn();
		const user = userEvent.setup();
		render(<SignUpForm onSubmit={mockOnSubmit} />);

		await user.type(
			screen.getByPlaceholderText(/enter email/i),
			defaultValues.email
		);

		await user.click(screen.getByText(/submit/i));

		expect(
			await screen.findByText(/password is required/i)
		).toBeInTheDocument();
		expect(mockOnSubmit).not.toHaveBeenCalled();
	});

	it("should show error when password is less than 6 characters", async () => {
		const mockOnSubmit = jest.fn();
		const user = userEvent.setup();
		render(<SignUpForm onSubmit={mockOnSubmit} />);

		await user.type(
			screen.getByPlaceholderText(/enter email/i),
			defaultValues.email
		);
		await user.type(screen.getByPlaceholderText(/enter password/i), "123");

		await user.click(screen.getByText(/submit/i));

		expect(
			await screen.findByText(/password must be at least 6 characters/i)
		).toBeInTheDocument();
		expect(mockOnSubmit).not.toHaveBeenCalled();
	});

	it("should render form with all fields and submit button", async () => {
		const mockOnSubmit = jest.fn();
		const user = userEvent.setup();
		render(<SignUpForm onSubmit={mockOnSubmit} />);

		await user.type(
			screen.getByPlaceholderText(/enter email/i),
			defaultValues.email
		);
		await user.type(
			screen.getByPlaceholderText(/enter password/i),
			defaultValues.password
		);

		await user.click(screen.getByText(/submit/i));

		expect(mockOnSubmit).toHaveBeenCalledTimes(1);
		expect(mockOnSubmit).toHaveBeenCalledWith(defaultValues);

		expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue("");
		expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue("");
	});
});
