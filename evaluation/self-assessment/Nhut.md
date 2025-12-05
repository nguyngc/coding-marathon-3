# Nhut - Self-Assessment

## Code quality & functionality
For my assigned scope, the Jobs module, I believe my implementation is solid and meets the requirements.

### API V1
- Delivered all required CRUD endpoints.
- Maintained clear separation of model, controller, and routes.
- Ensured schema rules (required fields, enums, defaults) were respected.

### Testing
- Implemented comprehensive Jest/Supertest tests for Jobs V1.
- Added authentication-focused tests for Jobs V2.
- Ensured tests were stable by cleaning database state between runs.

### API V2 authentication
- Correctly protected write operations and kept read endpoints public.
- Integrated middleware in a way that did not depend on modifying teammates’ User code.

## Challenges and how I overcame them
- **Validation status code differences**
  - Some validation errors initially returned 500 due to global middleware behavior.
  - I adapted test expectations to match project-level implementation and discussed best practices with the team.

- **Auth integration issues**
  - Helped debug middleware import/export mismatches and token verification issues.
  - Coordinated with the team to ensure consistent JWT secret usage across modules.

- **Route protection scope**
  - Carefully followed the requirement that only POST/PUT/DELETE are protected while GET remains public.

## What I learned
- Stronger understanding of end-to-end API development with Express/Mongoose.
- Writing meaningful integration tests that reflect requirements.
- Practical experience integrating JWT authentication into an existing codebase.
- The importance of consistency in shared middleware and environment configuration in team projects.
