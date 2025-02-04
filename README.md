# the-internet and jsonplaceholder

This repository is created for WEB UI autotests for the-internet project (a publicly available website that offers various testing scenarios) and API tests for jsonplaceholder (a public API for testing and prototyping)

WEB UI and API Tests were created using Playwright+TypeScript

**GETTING STARTED**

Prerequisites

Before setting up the project, ensure you have the following installed:
- Node.js (LTS) (https://nodejs.org/)
- Git (https://git-scm.com/)
- A package manager: npm

**Setup Instructions**
 1. Clone the repository
`git clone https://github.com/LucasTsar/the-internet
cd the-internet`

 2. Install dependencies
`npm install`

 3. Install Playwright browsers
`npx playwright install`

**To run tests:**

for WEB UI or API tests you should go to according directory:
**for web**: `cd WEB-UI-autotests`
**for API**: `cd api-tests`

To run all tests:
`npx playwright test`

To run specific test file, f.e. login tests:
`npx playwright test login.spec.ts`

Run tests with UI mode for web tests (interactive)
`npx playwright test --ui`

To view detailed test reports:
`npx playwright show-report`

**IMPORTANT!** for API tests resources will not be really updated on the server but it will be faked as if so some tests can work not as expected on real project (f.e. api test for deleting post and validating that it's not available anymore) 
