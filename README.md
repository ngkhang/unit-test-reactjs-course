# Unit Test with ReactJS- TypeScript

- [Unit Test with ReactJS- TypeScript](#unit-test-with-reactjs--typescript)
  - [Requirements](#requirements)
  - [Notes](#notes)
    - [Jest](#jest)
      - [Core Concepts](#core-concepts)
        - [Globals](#globals)
        - [Expect](#expect)
      - [Coverage Metrics](#coverage-metrics)
      - [Mock Function](#mock-function)
    - [Testing Library](#testing-library)
      - [Queries](#queries)
      - [User Interactions](#user-interactions)
      - [React Testing Library](#react-testing-library)
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

### Jest

#### Core Concepts

- Jest provides global functions (`describe`, `it`, `expect`, etc.) - no imports needed.

##### Globals

[Jest: Globals](https://jestjs.io/docs/api)

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

##### Expect

[Jest: Expect](https://jestjs.io/docs/expect)

- Used to test values with "matcher" functions
- Provides assertions like `toBe()`, `toEqual()`, `toContain()`, etc.

#### Coverage Metrics

| Metric     |            | Meaning                                                     |
| ---------- | ---------- | ----------------------------------------------------------- |
| `% Stmts`  | Statements | Percentage of executable statements covered                 |
| `% Branch` | Branches   | Percentage of code branches executed (if-else, switch-case) |
| `% Funcs`  | Functions  | Percentage of functions called at least once                |
| `% Lines`  | Lines      | Percentage of source code lines executed                    |

#### Mock Function

[Jest: Mock Function](https://jestjs.io/docs/mock-function-api)

- Also called "spies" - track function calls and behavior
- `jest.fn()` - Creates mock function (returns `undefined` by default)
- Use `.toHaveBeenCalled()`, `.toHaveBeenCalledTimes()`, `.toHaveBeenCalledWith()` to assert

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

#### User Interactions

[Testing Library: User Event](https://testing-library.com/docs/user-event/intro)

- **`userEvent`**: Simulates real browser user interactions
  - `userEvent.setup()` - Initialize user instance
- `user.click()`, `user.type()`, `user.hover()` - Simulate real browser interactions

#### React Testing Library

[Testing Library: React Testing](https://testing-library.com/docs/react-testing-library/intro)

- **`render(component)`**: Mounts component into virtual DOM for testing

### AAA Pattern (Arrange-Act-Assert)

Standard structure for organizing unit tests:

- **Arrange** - Setup: mock data, dependencies, render components
- **Act** - Execute: perform the action being tested
- **Assert** - Verify: check expected outcomes with matchers

## Author

- TrungQuanDev
