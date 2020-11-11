# TETE Challenge

## This is a simple BACKEND API allowing users to perform the follow.
1. Fetch all todos.
Fetching allows the following through query string.
- Filtering.
- Sorting
- Pagination
- Searching

2. Create new todos with unique titles.

3. Update todos given there ID.

4. Deleting of todos.

Documentation for this API is found [HERE](https://documenter.getpostman.com/view/2119879/TVemCAFk).

## To Setup this app locall, do the following
1. clone this repository.
2. `cd` into the directory.
3. run `npm install` or `yarn install`.
4. create a `.env` file in the root of your directory. Inside it create a variable BAE_URL and assign it your base url.
5. Go to `config/mogodb.connect.js` and add your `mongodb url`.
6. run `npm run start` or `yarn start`.