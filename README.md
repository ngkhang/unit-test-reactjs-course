# Unit Test with ReactJS- TypeScript

- [Unit Test with ReactJS- TypeScript](#unit-test-with-reactjs--typescript)
  - [Requirements](#requirements)
  - [Notes](#notes)
    - [Jest](#jest)
      - [Core Concepts](#core-concepts)
        - [Globals](#globals)
        - [Expect](#expect)
      - [Coverage Metrics](#coverage-metrics)
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

## Author

- TrungQuanDev
