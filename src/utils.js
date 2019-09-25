//application constants
export const COLLECTION_DATABASE = 'GEMS';
export const SET_FILTER_TEXT = 'SET_FILTER_TEXT';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const UPDATE_GEM_COLLECTION = 'UPDATE_GEM_COLLECTION';

// application data reducer
export const reducer = (state, { action, payload }) => {
  switch (action) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: payload,
      };
    case SET_FILTER_TEXT:
      return {
        ...state,
        filterText: payload,
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: payload,
      };
    case UPDATE_GEM_COLLECTION:
      return {
        ...state,
        gemCollection: Object.assign({}, state.gemCollection, payload),
      }
    default:
      return {
        ...state,
      };
  }
};

// application utility functions
export const fetchGems = searchText => {
  // add error handling
  // add loading state?
  return fetch(`${process.env.HOST_SERVER}query=${searchText}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(searchResults => searchResults);
};

export const saveGem = ({
  name,
  version,
  info,
  downloads,
  sha,
  project_uri,
}) => {
  const database = JSON.parse(localStorage[COLLECTION_DATABASE]);

  database.push({
    name,
    version,
    info,
    downloads,
    sha,
    project_uri,
  });

  localStorage.setItem(COLLECTION_DATABASE, JSON.stringify(database));

  return { [name]: true };
};

export const removeGem = gemToRemove => {
  const database = JSON.parse(localStorage[COLLECTION_DATABASE]).filter(
    gem => gem.name !== gemToRemove
  );

  localStorage.setItem(COLLECTION_DATABASE, JSON.stringify(database));

  return { [gemToRemove]: false };
};
