# Sandwich skeleton

Skeleton project for the Abis sandwich ordering exercise (Spring Boot 4, Java 17+).

You build the **backend** (REST API). The Angular frontend is already finished and bundled.

## Requirements

* A JDK (17 or newer)
* Nothing else: **no Node.js, npm or Angular CLI needed**.

## Run it

```bash
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
```

Open <http://localhost:8080>. At first the pages show a message like
*"GET /api/sandwiches returned 404: this endpoint does not exist (yet) in your API"*. That is expected:
the frontend is waiting for **your** API. Implement the endpoints below and the screens come to life.

## Faster restarts (optional: Spring Boot DevTools)

Slow computer? You can switch on DevTools. After a change it restarts only your own classes, which is much faster than a full start. It is **off by default**.

**Switch it on**

* IntelliJ: open the *Maven* tool window, expand *Profiles* and tick **devtools**, then click *Reload All Maven Projects*.
* Command line: add `-Pdevtools`, e.g. `./mvnw spring-boot:run -Pdevtools`.

**Use it (IntelliJ):** start the app with the Run button, then after a change press **Build → Build Project** (Ctrl+F9). The app restarts by itself in a few seconds.
Want this to happen on save? Enable *Settings → Build, Execution, Deployment → Compiler → Build project automatically*, and tick *Allow auto-make to start even if developed application is currently running* under *Advanced Settings*.

**Switch it off:** untick the profile and reload Maven.

Either way, press **F5** in the browser after a restart: the frontend loads its data when a page opens, so a page that showed an error has to be reloaded once.

## The API the frontend expects

All JSON. Field names follow the model classes in `be.abis.sandwich.model`.

| Screen | Request | Body / answer |
|---|---|---|
| Menu, Order, Admin | `GET /api/sandwiches` | list of sandwiches. Optional `?category=Vlees` and/or `?name=Pinky` |
| Admin | `POST /api/sandwiches` | body: `{ "name", "description", "category", "basePrice" }` (the `id` is yours to generate) |
| Admin | `PUT /api/sandwiches/{id}/price` | body: `{ "basePrice": 3.5 }` |
| Admin | `DELETE /api/sandwiches/{id}` | |
| Order | `POST /api/orders/details` | body: a `SandwichOrderDetail` (see below). Max 2 sandwiches per person: answer with a 4xx and a `message` if exceeded |
| Admin | `POST /api/orders/print` | body: a `SandwichOrder`. Write the order to a .txt file; the answer text (if any) is shown on screen |
| Admin | `POST /api/orders/price` | body: a `SandwichOrder`. Answer: the total price, as a plain number (`12.6`) or `{ "totalPrice": 12.6 }` |
| Admin (optional) | `GET /api/courses` | list of courses, e.g. `[{ "title": "Spring Boot" }]`. The admin panel then lets you pick the course from a dropdown; without this endpoint you type the title of the course |

Sandwich:

```json
{ "id": 6, "name": "Pinky", "description": "Sla, tomaat, ei, haringfilet, tartaar", "category": "Specials", "basePrice": 4.5 }
```

SandwichOrderDetail (sent by the order form):

```json
{
  "sandwich": { "id": 6, "name": "Pinky", "description": "...", "category": "Specials", "basePrice": 4.5 },
  "amount": 1,
  "breadType": "WHITE",
  "vegetables": true,
  "comment": "",
  "person": { "firstName": "Ada", "lastName": "Lovelace" },
  "sandwichOrder": { "orderDate": "2026-10-16", "course": { "title": "Spring Boot" } }
}
```

Error messages: when your API answers with an error, the frontend shows the `message` of the JSON body
(Spring's `@ResponseStatus` / `ResponseStatusException` / `@ExceptionHandler`), so good messages help you debug.

> The categories shown on the menu are simply the distinct `category` values of your sandwiches
> (the Pinky's list: Vlees, Kip, Kaas, Vis, Specials, Vegetarisch).
> Feel free to change the design, and then change the URLs in `frontend/src/app/api.service.ts`
> (see the instructor section below).

## How the frontend is served

* The built Angular app lives in `src/main/resources/static`. **Don't edit those files**.
* Spring Boot serves it from `/`. It calls your API on the same origin (relative `/api/...` URLs), so no CORS config is needed.
* Your controllers always win over the frontend: an `/api/**` URL you didn't map returns 404.
* `AngularFrontendConfig` makes a browser refresh on `/order` or `/admin` work. You don't need to change it.

## For instructors: changing the frontend

The Angular source (Angular 22, standalone components, plain CSS) is in `frontend/`. Students never need it;
the compiled result is committed in `src/main/resources/static`.

```bash
cd frontend
npm install                  # once
npm start                    # dev server on http://localhost:4200 (needs the Spring app on :8080, see proxy.conf.json)
npm run publish-to-spring    # production build -> copied into ../src/main/resources/static
```

Commit the updated `src/main/resources/static` afterwards.
