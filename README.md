Playwright Automated Test Suite

This repository contains an automated test suite using Playwright to test the login functionality of the Herokuapp Login Page. The tests validate both successful and unsuccessful login attempts.

1. Prerequisites

Before running the tests, ensure you have the following installed:

Node.js (>=16.x.x) - Download from nodejs.org

npm (included with Node.js)



2. Installation

To set up Playwright and its dependencies, run:

npm init playwright@latest

Follow the prompts to configure your Playwright setup.

Alternatively, if you already have a project, install Playwright manually:

npm install @playwright/test
npx playwright install

This will install the required browsers and dependencies for Playwright to run.



3.Running the Test Cases

To execute the test suite, use:

npx playwright test

This runs all tests in headless mode (without opening a browser). To run tests in a visible browser, use:

npx playwright test --headed

To run a specific test file:

npx playwright test login.spec.ts



4. Understanding test.describe()

Playwright provides test.describe() to group related tests. It allows us to:

Organize test cases logically

Reuse setup logic for multiple tests

Improve test execution and maintainability

In this project, all login-related tests are grouped inside:

test.describe('Login Scenarios', () => { ... });

This groups both valid and invalid login tests under a single test suite.

Test Case Details



5. Login with Correct Credentials

Test Name: Login with correct credentials

Steps:

Open the login page

Enter a valid username: tomsmith

Enter a valid password: SuperSecretPassword!

Click on the Login button

Verify the success message: You logged into a secure area!

Ensure the logout button is visible



6.Login with Incorrect Credentials

Each negative test verifies how the system behaves when invalid data is entered:

Incorrect Password: Verifies error message Your password is invalid!

Incorrect Username: Verifies error message Your username is invalid!

Both Username & Password Incorrect: Should return Your username is invalid!

Empty Username: Should return Your username is invalid!

Empty Password: Should return Your password is invalid!

No Credentials Entered: Should return Your username is invalid!

Special Characters in Username: Should return Your username is invalid!

Each test ensures proper validation and security against invalid login attempts.


 
7. Generating Playwright Reports

Playwright provides built-in support for HTML reports to visualize test results.

Generate and Open the Report

Run tests with:

npx playwright test --reporter=html

After execution, generate and open the report:

npx playwright show-report

This opens an interactive report in the browser.

Other Report Formats

To generate reports in multiple formats (HTML, JSON, JUnit), modify playwright.config.ts:

export default defineConfig({
  reporter: [['html'], ['json', { outputFile: 'report.json' }], ['junit', { outputFile: 'report.xml' }]]
});


8. Why Playwright?

Playwright is a powerful testing framework for modern web applications. Key reasons for choosing Playwright:

Cross-Browser Support: Works with Chromium, Firefox, and WebKit.

Fast and Reliable: Supports parallel execution and auto-wait for elements.

Built-in Report Generation: HTML reports make debugging easier.

API Testing Support: Can test both UI and API functionalities.

Headless Mode: Enables faster execution in CI/CD environments.

By using Playwright, we ensure robust and scalable test automation for web applications.


9.Conclusion

This project demonstrates how to use Playwright for automated UI testing of login functionality. It covers:

Setting up Playwright

Writing structured test cases

Running tests efficiently

Generating detailed test reports



