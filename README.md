# SnappPay Assignment (Frontend)

SnappPay Assignment (Frontend) is a React-based SPA for managing passenger contacts. It includes a searchable contact list, a details page for each contact, and a system to track and display the four most recently visited contacts. Visit tracking is handled on the client side, and the app interacts with a provided backend API.

## Clone Repository

```sh
git clone https://github.com/pedrogrammer/frontend.git
```

## Prerequisites

Ensure you have the following installed:

- Node.js v16+
- npm v8+

## Getting Started

This React application is set up from scratch using Webpack and TypeScript.

### Install Dependencies

Navigate to the project directory and install the dependencies:

```sh
npm install
```

### Available Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm start`     | Runs the app in development mode. |
| `npm test`      | Launches the test runner.         |
| `npm run build` | Builds the app for production.    |

### Start Development Server

```sh
npm start
```

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Run Tests

```sh
npm test
```

Runs the test suite.

### Build for Production

```sh
npm run build
```

Builds the app for production in the `dist` folder.

## Project Structure

```
frontend/
├── src/
│   ├── __tests__/         # Tests
│   ├── assets/            # Images
│   ├── components/        # React components
│   ├── core/              # API, utils, theme, custom hooks, localize
│   ├── routes/            # App routes
├── webpack.config.js      # Webpack configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
└── ...
```

`core` folder consists of these items:

- #### hooks: Some custom hooks.
- #### localize: Holds the useTranslation keys.
- #### services: Holds the logic of Rest API calling (includes react-query hooks, etc.).
- #### theme
- #### utils: Some utility functions.

## Services Directory

This section documents the API interactions and data-fetching mechanisms used in the Snapp Contacts application.

### Axios Configuration (`config.ts`)

The `config.ts` file sets up the Axios instance for making HTTP requests to the backend API.

- **Base URL:** The backend server runs on `http://localhost:1337`.
- **Default Headers:** All requests include the following headers:

  ```json
  {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
  ```

- **Authentication:** No authentication is required for API requests in this assignment.

### React Query Hooks (`hooks.ts`)

Custom React Query hooks are used for managing API requests efficiently.

#### `useGetContact({ id })`

- **Purpose:** Fetches the details of a specific contact.
- **Query Key:** `[CONTACT_QUERY_KEY, id]`
- **API Endpoint:** `GET /passenger/:id`
- **Return Type:** `ContactResponseType`
- **Example Usage:**

  ```typescript
  const { data, isLoading, error } = useGetContact({ id: "123" });
  ```

#### `useGetContactList({ filter })`

- **Purpose:** Fetches a paginated list of contacts based on the provided filter.
- **Query Key:** `[CONTACT_LIST_QUERY_KEY, filter]`
- **API Endpoint:** `GET /passenger`
- **Pagination:** Uses infinite scrolling with `limit = 8` per request.
- **Return Type:** `ContactListResponseType`
- **Example Usage:**

  ```typescript
  const { data, fetchNextPage, isFetchingNextPage } = useGetContactList({
    filter: { ... },
  });
  ```

  To load more contacts:

  ```typescript
  fetchNextPage();
  ```

- **Pagination Logic:**
  - Fetches the next batch based on the `skipped`, `limit`, and `total` values.
  - Stops requesting more data when all contacts are loaded.

## Frequent Contacts Hook (`useFrequentContacts.ts`)

The `useFrequentContacts` hook manages frequently visited contacts using `localStorage`.

- **Key:** `"frequentContacts"`
- **Stored Format:** An array of up to 4 recently visited contacts.

#### `frequentContacts`

- **Type:** `ContactType[]`
- **Description:** A stateful array of frequently visited contacts, automatically loaded from `localStorage`.

#### `addContactVisit(contact: ContactType)`

- **Purpose:** Adds a contact to the frequently visited list.
- **Storage Behavior:**
  - The contact moves to the top of the list.
  - The list maintains a maximum of 4 contacts.
- **Example Usage:**

  ```typescript
  const { frequentContacts, addContactVisit } = useFrequentContacts();

  useEffect(() => {
    addContactVisit({
      id: 1,
      name: "John Doe",
      phone: "+123456789",
    });
  }, []);
  ```

## Key Dependencies

| Category         | Packages                                    |
| ---------------- | ------------------------------------------- |
| **UI Framework** | `antd`, `@ant-design/icons`                 |
| **State Mgmt**   | `@tanstack/react-query`                     |
| **Routing**      | `react-router-dom`                          |
| **TypeScript**   | `typescript`, `@types/react`, `@types/node` |
| **Build Tools**  | `webpack`, `babel-loader`, `ts-loader`      |

## Code Quality

- **Linting**: ESLint (`@typescript-eslint`)
- **Formatting**: Prettier

Run the following command to check for linting issues:

```sh
npm run lint
```

To format files:

```sh
npm run format
```

## Localization

- Multilingual setup with `i18next`

## Testing

- Component testing with `@testing-library/react`
- Accessibility-focused testing approach

To run tests with coverage:

```sh
npm test -- --coverage
```

## License

This project is licensed under the ISC License.