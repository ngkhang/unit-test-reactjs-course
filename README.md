# Unit Test with ReactJS - TypeScript

- [Unit Test with ReactJS - TypeScript](#unit-test-with-reactjs---typescript)
  - [Requirements](#requirements)
  - [Notes](#notes)
    - [JavaScript](#javascript)
    - [Jest](#jest)
      - [Globals](#globals)
      - [Expect](#expect)
      - [Mock Function](#mock-function)
      - [The Jest object](#the-jest-object)
    - [Testing Library](#testing-library)
      - [Queries](#queries)
      - [User Actions](#user-actions)
      - [User Interactions](#user-interactions)
      - [React Testing Library](#react-testing-library)
    - [Coverage Metrics](#coverage-metrics)
    - [AAA Pattern (Arrange-Act-Assert)](#aaa-pattern-arrange-act-assert)
  - [Author](#author)

This a repository about learning to write unit tests in React.js with TypeScript. The tutorial and codebase were created by TrungQuanDev.

## Requirements

```bash
* nodejs >= v22.12.2
* npm >= v10.5.0
* yarn >= v1.22.19
```

## Notes

### JavaScript

- `globalThis`: global variable (ES2020)

### Jest

#### Globals

[Jest: Globals](https://jestjs.io/docs/api)

- Jest provides global functions (`describe`, `it`, `expect`, etc.) - no imports needed.

- **`beforeAll(fn, timeout)`**
  - Runs before any tests in the file
  - Waits for promises/generators to resolve
  - `timeout`: optional, default 5s (milliseconds)

- **`afterEach(fn, timeout)`**
  - Runs after each test completes
  - Waits for promises/generators to resolve
  - `timeout`: optional, default 5s (milliseconds)

- **`describe(name, fn)`**
  - Groups related tests into a block
  - Optional but recommended
  - Can nest for test hierarchies

- **`test(name, fn, timeout)` / `it(name, fn, timeout)`**
  - Runs a test
  - `timeout`: optional, default 5s (milliseconds)

- **`test.each(table)(name, fn, timeout)` / `it.each(table)(name, fn, timeout)`**
  - Run the same test with different data
  - `table`: Array of Arrays with test arguments
  - `name`: supports printf formatting for parameter injection
  - `fn`: receives each row as arguments

#### Expect

[Jest: Expect](https://jestjs.io/docs/expect)

- Used to test values with "matcher" functions
- Provides assertions like `toBe()`, `toEqual()`, `toContain()`, etc.

#### Mock Function

[Jest: Mock Function](https://jestjs.io/docs/mock-function-api)

- Mock functions (also called "spies") track function calls and control behavior

- Return Values
  - `mockFn.mockResolvedValueOnce(value)`
    - Useful to resolve different values over multiple async calls
  - `mockFn.mockRejectedValueOnce(value)`
    - Useful together with `.mockResolvedValueOnce()` or to reject with different exceptions over multiple async calls

- Reset
  - `mockFn.mockReset()`
    - Clears history and replaces implementation with empty function

- Assertions
  - `.toHaveBeenCalled()`, `.toHaveBeenCalledTimes()`, `.toHaveBeenCalledWith()`

#### The Jest object

[Jest: The Jest Object](https://jestjs.io/docs/jest-object)

- The `jest` object is automatically in scope within every test file.
- The methods in the `jest` object help create mocks and let you control Jest's overall behavior.

- Mock function:
  - `jest.fn()`: returns a new, unused mock function.
  - `jest.spyOn(object, methodName)`: creates a mock function similar to `jest.fn` but also tracks calls to `object[methodName]`. Returns a [Jest mock function](#mock-function).
  - `jest.clearAllMocks()`
    - Clear all mock history (calls, instances, results)
    - Equivalent to calling `.mockClear()` on every mocked function.
  - `jest.resetModules()`
    - Reset module registry cache
    - Isolate modules where local state might conflict between tests
  - `jest.restoreAllMocks()`
    - Restore all mocks to original values
    - Equivalent to calling `.mockRestore()` on every mocked function and `.restore()` on every replaced property

### Testing Library

#### Queries

[Testing Library: Queries](https://testing-library.com/docs/queries/about)

- **`screen`**
  - Pre-bound to `document.body` with all query methods
  - Access rendered elements

- Types of Queries:
  - Single: `getBy...`, `queryBy...`, `findBy...`
  - Multiple: `getAllBy...`, `queryAllBy...`, `findAllBy...`

- When to use:
  - `getBy...` - Element expected (throws if not found)
  - `queryBy...` - Element may not exist (returns null)
  - `findBy...` - Element appears asynchronously (returns Promise)

- **Priority Order** (most accessible → least)
  1. Queries Accessible to Everyone
     - `getByRole` (best - includes accessibility)
     - `getByLabelText`, `getByPlaceholderText`, `getByText`, `getByDisplayValue`
  2. Semantic Queries
     - `getByAltText`, `getByTitle`
  3. Test IDs
     - `getByTestId`

#### User Actions

- Async methods:
  - `findBy` queries:
    - A combination of `getBy` queries and `waitFor`
    - Usage: expect an element to appear but the change to the DOM might not happen immediately (e.g. call API, setTimeout,...)

#### User Interactions

[Testing Library: User Event](https://testing-library.com/docs/user-event/intro)

- **`userEvent`**: simulates real browser user interactions
  - `userEvent.setup()`: initialize user instance
  - Common Interactions:
    - `user.click()`, `user.type()`, `user.hover()`

#### React Testing Library

[Testing Library: React Testing](https://testing-library.com/docs/react-testing-library/intro)

- **`render(component)`**: mounts component into virtual DOM for testing

### Coverage Metrics

| Metric     | Name       | Meaning                                                     |
| ---------- | ---------- | ----------------------------------------------------------- |
| `% Stmts`  | Statements | Percentage of executable statements covered                 |
| `% Branch` | Branches   | Percentage of code branches executed (if-else, switch-case) |
| `% Funcs`  | Functions  | Percentage of functions called at least once                |
| `% Lines`  | Lines      | Percentage of source code lines executed                    |

### AAA Pattern (Arrange-Act-Assert)

Standard structure for organizing unit tests:

- **Arrange** - Setup: mock data, dependencies, render components
- **Act** - Execute: perform the action being tested
- **Assert** - Verify: check expected outcomes with matchers

## Author

- TrungQuanDev
