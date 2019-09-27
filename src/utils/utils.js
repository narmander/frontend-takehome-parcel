//Action Constants
export const COLLECTION_DATABASE = 'GEMS';
export const SET_FILTER_TEXT = 'SET_FILTER_TEXT';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SET_EMPTY_STATE_TEXT = "SET_EMPTY_STATE_TEXT";
export const UPDATE_GEM_COLLECTION = 'UPDATE_GEM_COLLECTION';

// Application data reducer
export const reducer = (state, { action, payload }) => {
  switch (action) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: payload,
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: payload,
      };
    case SET_FILTER_TEXT:
      return {
        ...state,
        filterText: payload,
      }
    case UPDATE_GEM_COLLECTION:
      return {
        ...state,
        gemCollection: payload,
      }
    case SET_EMPTY_STATE_TEXT:
      return {
        ...state,
        emptyStateText: payload,
      }
    default:
      return {
        ...state,
      };
  }
};

// Application utility functions
export const fetchGems = searchText => {
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
  let database = JSON.parse(localStorage.getItem(COLLECTION_DATABASE));

  database.push({
    name,
    version,
    info,
    downloads,
    sha,
    project_uri,
  });

  localStorage.setItem(COLLECTION_DATABASE, JSON.stringify(database));
  localStorage.setItem(name, 'true');
};

export const removeGem = gemToRemove => {
  let database = JSON.parse(localStorage[COLLECTION_DATABASE]);

  database = database.filter(gem => gem.name !== gemToRemove);

  localStorage.setItem(COLLECTION_DATABASE, JSON.stringify(database));
  localStorage.removeItem(gemToRemove);
};
