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
        gemCollection: payload,
      };
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
    .then(searchResults => {
      dispatch({ action: SET_SEARCH_RESULTS, payload: searchResults });
    });
};

export const saveGem = ({
  name,
  version,
  info,
  downloads,
  sha,
  project_uri,
  saved,
}) => {
  const gemCollection = JSON.parse(localStorage[COLLECTION_DATABASE]);
  gemCollection.push({
    name,
    version,
    info,
    downloads,
    sha,
    project_uri,
    saved,
  });
  dispatch({ action: UPDATE_GEM_COLLECTION, payload: gemCollection});
  localStorage.setItem(COLLECTION_DATABASE, JSON.stringify(gemCollection));
};

export const removeGem = gemToBeRemoved => {
  let gemCollection = JSON.parse(localStorage[COLLECTION_DATABASE]);

  gemCollection = gemCollection.filter(gem => gem.name !== gemToBeRemoved);
  dispatch({ action: UPDATE_GEM_COLLECTION, payload: gemCollection});
  localStorage.setItem(COLLECTION_DATABASE, JSON.stringify(gemCollection));
};
