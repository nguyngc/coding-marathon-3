# Thanh - Self-Assessment

## Goals at the start
- Provide intuitive, stable interfaces for adding and editing jobs.
- Ensure the forms include basic client-side validation to reduce invalid data sent to the backend.
- Integrate API calls for create/update and later add authentication (LoginPage).

## What went well
- AddJobPage and EditJobPage implement the main required flows: users can create and update jobs.
- Client-side validation prevents form submission with missing or invalid data.
- Loading and error states are handled and displayed to the user, improving UX.
- Prepared authentication integration (V2) and implemented LoginPage to obtain tokens.

## Challenges encountered
- Aligning frontend fields with backend model required some adjustments as the backend evolved.
- Handling edge cases such as slow networks or 5xx errors needs better retry/error reporting.
- Limited time prevented writing comprehensive automated tests for all components.

## Improvements planned
- Add unit tests for form components and mock API calls.
- Implement frontend authorization checks (in coordination with backend) to prevent unauthorized edits.
- Refactor forms into reusable components and adopt a shared validation schema (e.g., yup with Formik or react-hook-form).
- Increase frequency and depth of code reviews and document the API contract more explicitly.

## Lessons learned
- Defining the API contract early reduces rework.
- Breaking UI into smaller, reusable components improves maintainability.
- Small UX improvements such as loading indicators and clear error messages greatly improve perceived product quality.