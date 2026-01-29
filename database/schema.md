# Database Schema

## Cities (current in-memory model)

| Field        | Type     | Description                    |
|-------------|----------|--------------------------------|
| id          | string   | Unique identifier              |
| name        | string   | City name                      |
| country     | string   | Country                        |
| population  | number   | Population                     |
| description | string   | Short description              |
| landmarks   | string[] | List of notable landmarks      |

Backend currently uses in-memory data in `backend/src/services/cities.ts`. Can be replaced with a real DB (e.g. PostgreSQL) later.
