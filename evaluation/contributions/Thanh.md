# Thanh - Contributions

## Summary of contributions
I was responsible for the frontend job management features, implemented in two stages:

- V1 — No Auth
  - AddJobPage.jsx
    - Built a complete job creation form (title, company, location, salary, description, etc.).
    - Added basic validation (required fields, numeric format for salary).
    - Set sensible default values and improved UX for users.
    - Called the API to create jobs: POST /api/jobs (in V1 this is assumed to be unauthenticated).
  - EditJobPage.jsx
    - Implemented a job editing page with the form pre-populated from fetched job data.
    - Called the API to update a job: PUT /api/jobs/:id.
    - Handled loading and error states to improve user experience.

- V2 — Auth
  - LoginPage.jsx
    - Implemented a login page to support user authentication.
    - Sent login requests to the API and stored JWT tokens in localStorage.
    - Once a token is available, create/edit job requests include the Authorization header.

## Commits & Pull Requests
- Example commits made:
  - Created AddJobPage.jsx with basic form.
  - Added validation and default values.
  - Integrated API call for creating jobs and added error handling.
  - Created EditJobPage.jsx with fetch-for-edit and update functionality.
  - Fixed navigation and state management bugs.
- Pull Requests:
  - PR #12: Add job creation page.
  - PR #18: Add job editing page with API integration.
  - (LoginPage work was developed on a separate branch following V1.)

## Role in the group project
- Responsible for frontend job management features (adding and editing jobs).
- Ensured contract and data synchronization with the backend (endpoints and payloads).
- Focused on validation, user experience (loading and error states), and authentication integration in V2.
- Collaborated with teammates to ensure frontend fields and data types match backend models.

## Next recommended tasks
- Complete authentication flows (registration, token refresh, logout).
- Add unit/integration tests for forms and API calls.
- Implement authorization checks so only job owners can edit/delete.
- Improve error/success UX (toasts/modals) and add more detailed API error handling.