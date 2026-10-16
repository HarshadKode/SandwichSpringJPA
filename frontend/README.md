# Sandwich frontend (Angular)

Source of the frontend that is bundled in the Spring Boot app. See the main `README.md`.

* `npm start` - dev server on http://localhost:4200, proxies `/api` to http://localhost:8080
* `npm run publish-to-spring` - production build, copied to `../src/main/resources/static` (commit the result)
* API URLs: `src/app/api.service.ts`
