import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockResponse } from "../../../jest.setup";
import { DebounceSearch } from "~/components/DebounceSearch/DebounceSearch";

const mockUsers = [
	{
		id: 1,
		name: "Leanne Graham",
		username: "Bret",
		email: "Sincere@april.biz",
		address: {
			street: "Kulas Light",
			suite: "Apt. 556",
			city: "Gwenborough",
			zipcode: "92998-3874",
			geo: {
				lat: "-37.3159",
				lng: "81.1496",
			},
		},
		phone: "1-770-736-8031 x56442",
		website: "hildegard.org",
		company: {
			name: "Romaguera-Crona",
			catchPhrase: "Multi-layered client-server neural-net",
			bs: "harness real-time e-markets",
		},
	},
	{
		id: 2,
		name: "Ervin Howell",
		username: "Antonette",
		email: "Shanna@melissa.tv",
		address: {
			street: "Victor Plains",
			suite: "Suite 879",
			city: "Wisokyburgh",
			zipcode: "90566-7771",
			geo: {
				lat: "-43.9509",
				lng: "-34.4618",
			},
		},
		phone: "010-692-6593 x09125",
		website: "anastasia.net",
		company: {
			name: "Deckow-Crist",
			catchPhrase: "Proactive didactic contingency",
			bs: "synergize scalable supply-chains",
		},
	},
	{
		id: 3,
		name: "Clementine Bauch",
		username: "Samantha",
		email: "Nathan@yesenia.net",
		address: {
			street: "Douglas Extension",
			suite: "Suite 847",
			city: "McKenziehaven",
			zipcode: "59590-4157",
			geo: {
				lat: "-68.6102",
				lng: "-47.0653",
			},
		},
		phone: "1-463-123-4447",
		website: "ramiro.info",
		company: {
			name: "Romaguera-Jacobson",
			catchPhrase: "Face to face bifurcated interface",
			bs: "e-enable strategic applications",
		},
	},
];

describe("DebounceSearch component", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	it("should render search input and initial empty state", async () => {
		jest.spyOn(globalThis, "fetch").mockResolvedValueOnce(mockResponse([]));

		render(<DebounceSearch />);

		expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
		expect(await screen.findByText(/no result!/i)).toBeInTheDocument();
	});

	it("should fetch and display users on mount", async () => {
		jest.spyOn(globalThis, "fetch").mockResolvedValueOnce(
			mockResponse(mockUsers)
		);

		render(<DebounceSearch />);

		for (const user of mockUsers) {
			expect(await screen.findByText(user.name)).toBeInTheDocument();
		}
		expect(globalThis.fetch).toHaveBeenCalledWith(
			"https://jsonplaceholder.typicode.com/users?q="
		);
	});

	it("should show loading state during fetch", async () => {
		jest.spyOn(globalThis, "fetch").mockImplementation(async () => {
			return new Promise((resolve) => {
				setTimeout(
					() => resolve({ json: async () => mockUsers } as any),
					100
				);
			});
		});

		render(<DebounceSearch />);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();
		for (const user of mockUsers) {
			expect(await screen.findByText(user.name)).toBeInTheDocument();
		}
		expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
	});

	it("should debounce search input and fetch after 500ms", async () => {
		const user = userEvent.setup({ delay: null });
		jest.spyOn(globalThis, "fetch")
			.mockResolvedValueOnce(mockResponse(mockUsers))
			.mockResolvedValueOnce(mockResponse([mockUsers[0]]));

		render(<DebounceSearch />);

		expect(await screen.findByText(mockUsers[0].name)).toBeInTheDocument();

		const searchInput = screen.getByPlaceholderText(/search/i);
		await user.type(searchInput, "Leanne");

		expect(globalThis.fetch).toHaveBeenCalledTimes(1);

		jest.advanceTimersByTime(500);
		expect(globalThis.fetch).toHaveBeenCalledTimes(2);
		expect(globalThis.fetch).toHaveBeenLastCalledWith(
			"https://jsonplaceholder.typicode.com/users?q=Leanne"
		);
	});

	it("should cancel previous debounced calls when typing rapidly", async () => {
		jest.spyOn(globalThis, "fetch")
			.mockResolvedValueOnce(mockResponse(mockUsers))
			.mockResolvedValueOnce(mockResponse([mockUsers[0]]));

		render(<DebounceSearch />);
		expect(await screen.findByText(mockUsers[0].name)).toBeInTheDocument();

		const user = userEvent.setup({ delay: null });
		const searchInput = screen.getByPlaceholderText(/search/i);

		await user.type(searchInput, "L");
		jest.advanceTimersByTime(200);
		await user.type(searchInput, "e");
		jest.advanceTimersByTime(200);
		await user.type(searchInput, "a");
		jest.advanceTimersByTime(200);
		await user.type(searchInput, "n");
		jest.advanceTimersByTime(200);
		await user.type(searchInput, "n");
		jest.advanceTimersByTime(200);
		await user.type(searchInput, "e");
		jest.advanceTimersByTime(500);

		expect(globalThis.fetch).toHaveBeenCalledTimes(2);
		expect(globalThis.fetch).toHaveBeenLastCalledWith(
			"https://jsonplaceholder.typicode.com/users?q=Leanne"
		);
	});

	it('should show "No result!" when search returns empty array', async () => {
		jest.spyOn(globalThis, "fetch")
			.mockResolvedValueOnce(mockResponse(mockUsers))
			.mockResolvedValueOnce(mockResponse([]));

		const user = userEvent.setup({ delay: null });
		render(<DebounceSearch />);

		expect(await screen.findByText(mockUsers[0].name)).toBeInTheDocument();

		const searchInput = screen.getByPlaceholderText(/search/i);

		await user.type(searchInput, "NonExistent");
		jest.advanceTimersByTime(500);

		expect(await screen.findByText(/no result!/i)).toBeInTheDocument();

		expect(screen.queryByText(mockUsers[0].name)).not.toBeInTheDocument();
	});

	it("should handle fetch errors gracefully", async () => {
		const consoleSpy = jest.spyOn(console, "log").mockImplementation();
		jest.spyOn(globalThis, "fetch").mockRejectedValueOnce(
			new Error("Network Error")
		);

		render(<DebounceSearch />);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();
		expect(await screen.findByText(/no result!/i)).toBeInTheDocument();
		expect(consoleSpy).toHaveBeenCalledWith(
			"fetchUsers error",
			expect.any(Error)
		);
		consoleSpy.mockRestore();
	});

	it("should render users in ul with li elements", async () => {
		jest.spyOn(globalThis, "fetch").mockResolvedValueOnce(
			mockResponse(mockUsers)
		);

		const { container } = render(<DebounceSearch />);

		for (const user of mockUsers) {
			expect(await screen.findByText(user.name)).toBeInTheDocument();
		}

		const ulElement = container.querySelector("ul");
		const liElements = container.querySelectorAll("li");

		expect(ulElement).toBeInTheDocument();
		expect(liElements).toHaveLength(mockUsers.length);
	});
});
