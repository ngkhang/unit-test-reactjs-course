// Author: TrungQuanDev: https://youtube.com/@trungquandev
// Import thêm các custom matchers để tiện cho việc viết test, gọi file này ở jest.config.ts. Cũng như thêm cấu hình vào types trong tsconfig.app.json
import "@testing-library/jest-dom";

// File này về sau có thể cấu hình thêm global mock (như mock fetch hoặc mock localStorage...vv) tùy dự án

// Runs a function before any of the tests in this file run
beforeAll(() => {
	// Ví dụ mock fetch toàn cục
	globalThis.fetch = jest.fn();
	// Ghi đè console.error, warn, log, cho toàn bộ test, tránh hiện log khi chạy test, đỡ khó chịu
	console.error = jest.fn();
	console.warn = jest.fn();
	console.log = jest.fn(); // tùy dự án nếu không cần có thể comment lại
});

// Runs a function after each one of the tests in this file completes
afterEach(() => {
	// Reset mocks automatically before each test.
	(fetch as jest.Mock).mockReset();

	// Clears the mock.calls, mock.instances, mock.contexts and mock.results properties of all mocks
	jest.clearAllMocks();

	// Resets the module registry - the cache of all required modules
	jest.resetModules();

	// Restores all mocks and replaced properties back to their original value.
	jest.restoreAllMocks();
});
