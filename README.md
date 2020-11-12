[![Build Status](https://travis-ci.org/ebobzom/elijah-tete-challenge.svg?branch=master)](https://travis-ci.org/ebobzom/elijah-tete-challenge)
[![Coverage Status](https://coveralls.io/repos/github/ebobzom/elijah-tete-challenge/badge.svg?branch=master)](https://coveralls.io/github/ebobzom/elijah-tete-challenge?branch=master)
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
4. create a `.env` file in the root of your directory. Inside it create a variable BASE_URL and assign it your base url also add a MONGODB_URI variable forhosting purposes.
5. Go to `config/mogodb.connect.js` and add your `mongodb url`.
6. run `npm run start` or `yarn start`.