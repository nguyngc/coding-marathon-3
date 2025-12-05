# Nhut - Contributions

## Overview
I was responsible for the **Jobs module** and its backend testing across **API V1 and API V2**.  
I also supported the team by **debugging the User/Auth integration** to ensure smooth JWT usage across modules.

## Features / Work I implemented

### Jobs API V1
- Implemented full CRUD endpoints for jobs:
  - `GET /api/jobs`
  - `GET /api/jobs/:id`
  - `POST /api/jobs`
  - `PUT /api/jobs/:id`
  - `DELETE /api/jobs/:id`
- Ensured job schema validation was correctly reflected in controller logic.

### Jobs API V1 Tests (Jest/Supertest)
- Wrote comprehensive tests covering:
  - Create job success & validation error cases
  - Read all jobs
  - Read single job (valid/invalid/not-found)
  - Update job success & invalid enum cases
  - Delete job success
- Used the project test DB setup (`TEST_MONGO_URI`) and ensured cleanup between tests.

### Jobs API V2 (With Authentication)
- Kept the same endpoints as V1.
- Protected write operations:
  - `POST /api/jobs`
  - `PUT /api/jobs/:id`
  - `DELETE /api/jobs/:id`
- Confirmed read operations remained public:
  - `GET /api/jobs`
  - `GET /api/jobs/:id`

### Jobs API V2 Tests
- Added test coverage for protected endpoints:
  - Valid token
  - Missing token
  - Invalid token
- Verified public GET routes remained accessible without authentication.

### Support on User/Auth debugging
- Assisted with debugging authentication integration issues, including:
  - Middleware import/export mismatches (ensuring the handler passed to routes is a function)
  - Environment variable consistency (e.g., aligning JWT secret naming)
  - Validating token flow compatibility between Users and Jobs modules

## Commits and Pull Requests
I authored commits related to:
- Jobs model + controller + router for V1
- Jest/Supertest test suite for Jobs V1
- Route protection for Jobs V2
- Jest/Supertest test suite for Jobs V2
- Minor fixes/support commits related to auth integration

> Note: Commit hashes/PR links can be added here if required.

## My role in the group project
- Owned the **Jobs backend feature area** end-to-end for V1 and V2.
- Ensured Jobs module integrated cleanly with the team’s authentication system.
- Supported teammates by helping troubleshoot User/Auth issues affecting shared API behavior and tests.
