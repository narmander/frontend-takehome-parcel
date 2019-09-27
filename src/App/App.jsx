import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GemList from './GemList';
import { SearchBar } from '../shared-components/SearchBar';
import { Button as Toggle } from '../shared-components/Button';
import { OFF_WHITE } from '../assets/colors';
import { GlobalStyles, Wrapper } from '../assets/styles';
import {
  fetchGems,
  reducer,
  removeGem,
  saveGem,
  COLLECTION_DATABASE,
  SET_FILTER_TEXT,
  SET_EMPTY_STATE_TEXT,
  SET_SEARCH_RESULTS,
  SET_SEARCH_TEXT,
  UPDATE_GEM_COLLECTION,
} from '../utils/utils';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    emptyStateText: 'Search for some new Ruby Gems.',
    filterText: '',
    gemCollection: {},
    searchResults: [],
    searchText: '',
  });
  const { searchResults, searchText, filterText, emptyStateText } = state;
  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
    // we only need this to happen once when app first renders to set "database" array
    // an empty array passed as second argument prevents this effect from running again
    if (!localStorage.length) {
      localStorage.setItem(COLLECTION_DATABASE, JSON.stringify([]));
    }
  }, []);

  function toggle() {
    updateSearchText('');
    updateFilterText('');
    updateEmptyStateText('Search for some new Ruby Gems.');
    setShowCollection(!showCollection);
  }

  function updateEmptyStateText(emptyStateText) {
    dispatch({
      action: SET_EMPTY_STATE_TEXT,
      payload: emptyStateText,
    });
  }

  function updateSearchText(searchText) {
    dispatch({ action: SET_SEARCH_TEXT, payload: searchText });
  }

  function updateFilterText(filterText) {
    dispatch({ action: SET_FILTER_TEXT, payload: filterText });
  }

  function queryGems(e) {
    e.preventDefault();
    if (!searchText) return;

    fetchGems(searchText).then(results => {
      if (!results.length)
        dispatch({
          action: SET_EMPTY_STATE_TEXT,
          payload: 'Sorry no gems came back from that query...',
        });
      dispatch({ action: SET_SEARCH_RESULTS, payload: results });
    });
  }

  function updateGems(gem) {
    if (localStorage.getItem(gem.name)) {
      removeGem(gem.name);
    } else {
      saveGem(gem);
    }
    dispatch({
      action: UPDATE_GEM_COLLECTION,
      payload: JSON.parse(localStorage[COLLECTION_DATABASE]),
    });
  }

  return (
    <>
      <GlobalStyles />
      <AppStyles className="main-app">
        <Header className="header">
          <Wrapper>
            <h1>Ruby Gems Search</h1>
            <h2>Find, favorite, and filter Ruby Gems.</h2>
          </Wrapper>
        </Header>
        {showCollection ? (
          <>
            <SearchBar
              setUserInput={updateFilterText}
              placeholder="Filter your collection..."
              value={filterText}
            />
            <Toggle onClick={toggle}>Show Search Results</Toggle>
            <GemList
              id="collection"
              filterText={filterText}
              gems={JSON.parse(localStorage[COLLECTION_DATABASE])}
              updateGems={updateGems}
              emptyStateText="You don't have any gems saved yet! Go search for some!"
            />
          </>
        ) : (
          <>
            <SearchBar
              searchAction={queryGems}
              setUserInput={updateSearchText}
              placeholder="Search for Ruby gems..."
              value={searchText}
            />
            <Toggle onClick={toggle}>Show Collection</Toggle>
            <GemList
              id="searchResults"
              gems={searchResults}
              updateGems={updateGems}
              emptyStateText={emptyStateText}
            />
          </>
        )}
      </AppStyles>
    </>
  );
};

const AppStyles = styled.div`
  padding: 100px 20px 0;
  background-color: ${OFF_WHITE};
  margin: 0 auto;
  max-width: 1100px;
  min-height: 100vh;
  font-family: Rubik, sans-serif;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.3);
`;

const Header = styled.header`
  @media (max-width: 1000px) {
    header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.3);
  background-color: ${OFF_WHITE};
  display: block;
  font-family: Rubik, sans-serif;
  left: 0px;
  position: fixed;
  text-align: center;
  top: 0px;
  width: 100%;
  z-index: 1;
`;

App.propTypes = {
  filterText: PropTypes.string,
  queryGems: PropTypes.func,
  searchResults: PropTypes.array,
  searchText: PropTypes.string,
  toggle: PropTypes.func,
  updateFilterText: PropTypes.func,
  updateSearchText: PropTypes.func,
  emptyStateText: PropTypes.string,
};

export default App;
