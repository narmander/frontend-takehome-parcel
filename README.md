# Ruby Gems search & save app

A search application that takes a user's search query, hits the [Ruby Gems](https://rubygems.org/) search API endpoint, and displays the results in a list view with some added functionality (detailed below). Feel free to fork and play around with this!

The application:

1. has a search box that lets users search for Ruby Gems.
2. displays the results of the search in a list.
3. has a button that lets users "save" and "unsave" Gems.
4. has a way to view saved Gems, even after the browser window is refreshed (localStorage is a fine for this).


### Step 1: Install dependencies

We have a few dependencies necessary to run the build and proxy server, the rest are up to you.

```bash
npm install
```

### Step 2: Start the development server

```bash
npm run dev
```

### Step 4: Start coding

[Parcel](https://parceljs.org/) is used as a bundler, please consult the [documentation](https://parceljs.org/getting_started.html) if you run into any trouble.


### Step 5: Network requests

You may have noticed the server.js file at the root of this application, that's there to solve cross-origin issues when making network requests. The server automatically starts up when running "npm run dev" or "npm run start".

To see a sample request in action, run the following in your command line.

```bash
curl http://localhost:3000/api/v1/search.json?query=rails
```
