# react-e-products

This is a 3-page Single Page Application (SPA) built using [React](https://react.dev/) and [Vite](https://vitejs.dev/guide/). The application is mobile responsive and consists of the following pages: ProductListing, ProductDetail, and Forms. It utilizes various plugins and libraries to handle routing, network calls, form management, and UI components.

## Pages

### ProductListing

- Implement List + Grid to show products
- Grid will have paginated products
- List can show all products and will be Virtualized
- Search input to search products by name
- Categories dropdown to filter products by Category
- Allow user to add a new product


### ProductDetail

- Show complete Product information
- Contains Edit & Delete buttons with relevant icons
- Ask for confirmation before deleting the product
- Let user edit the product


### Add/Edit From

- User can add title, decription, pricing, discount for the product
- Browse and attach image to the product
- Show all the best suited controls based on data
- Let user reset the form
- Can add multiple products while remaining at the form page
- Form will be refilled when try to edit the existing product


## Plugins Used

- [React Router](https://reactrouter.com/en/main) to navigate among pages.
- [Axios](https://axios-http.com/docs/intro) & [React Query](https://tanstack.com/query/v3/docs/react/overview) to handle network calls, cache, refetching, etc.
- [React Hook Form](https://react-hook-form.com/) to manage form state, validate inputs, handle form submission.
- [React MaterialUI](https://mui.com/material-ui/getting-started/) for UI components.
- [React Virtuoso](https://virtuoso.dev/) for implementing Virtualization.


## APIs

- Use [Products APIs from dummyjson](https://dummyjson.com/docs/products). Following APIs will be integrated into the system:

   - Get all products in paginated form
   - Get a single product
   - Get all product categories
   - Search products by Category
   - Add/Update/Delete Product (CRUD APIs do not perform real actions on the server but only mimics the behavior)


## Database

- Localstorage will be used as a database to keep track of all the data changes done.


## Documentation

Documentation for the following things will be provided separately:

### APIs:
   - Working Postman collection will be provided for all APIs
   - Static document containing API URLs, payloads & responses to cross-check any new changes in the APIs


### UI & UX:
   - Document containing screenshots of the UI
   - Pointers explaining both UI & UX


## Setup and Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application using `npm run dev`.

For detailed instructions and more information, please refer to the provided documentation.

## License

[MIT License](LICENSE)
