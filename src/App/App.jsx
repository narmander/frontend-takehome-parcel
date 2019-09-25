import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GemList from './GemList/GemList';
import SearchBar from './SearchBar/SearchBar';
import { GlobalStyles, Wrapper } from './styles';
import {
  hasGem,
  saveGem,
  removeGem,
  fetchGems,
  reducer,
  COLLECTION_DATABASE,
  SET_SEARCH_TEXT,
  SET_FILTER_TEXT,
  SET_SEARCH_RESULTS,
  UPDATE_GEM_COLLECTION,
} from '../utils';

const App = () => {
  const [showCollection, setCollectionView] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    searchResults: [],
    filterText: '',
    searchText: '',
    gemCollection: {},
  });
  const { searchResults, filterText, searchText, gemCollection } = state;

  useEffect(() => {
    // we only need this to happen once when app first renders to set "database" array
    // an empty array passed as second argument prevents this effect from running again
    if (!localStorage.length) {
      localStorage.setItem(COLLECTION_DATABASE, JSON.stringify([]));
    }
  }, []);

  function toggle() {
    setCollectionView(!showCollection);
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
    fetchGems(searchText).then(results =>
      dispatch({ action: SET_SEARCH_RESULTS, payload: results })
    );
  }

  function updateGems(gem) {
    if(gemCollection[gem.name]) {
      dispatch({ action: UPDATE_GEM_COLLECTION, payload: removeGem(gem.name)})
    } else {
      dispatch({action: UPDATE_GEM_COLLECTION, payload: saveGem(gem)})
    }
  }

  return (
    <>
      <GlobalStyles />
      <AppStyles className="main-app">
        <Header className="header">
          <Wrapper>
            <h1>Ruby Gems Search</h1>
            <h2>Find, favorite, and filter RubyGems.</h2>
          </Wrapper>
        </Header>
        <Wrapper>
          <button onClick={toggle}>Toggle</button>
          {showCollection ? (
            <>
              <h2>Showing: Collection Results</h2>
              <SearchBar
                setUserInput={updateFilterText}
                placeholder="Filter gem collection..."
                value={filterText}
              />
            </>
          ) : (
            <>
              <h2>Showing: Search Results</h2>
              <SearchBar
                searchAction={queryGems}
                setUserInput={updateSearchText}
                placeholder="Search for new Ruby gems..."
                buttonText="Search!"
                value={searchText}
              />
            </>
          )}
        </Wrapper>
        {showCollection ? (
          <GemList
            id="collection"
            gems={JSON.parse(localStorage[COLLECTION_DATABASE])}
            filterText={filterText}
            updateGems={updateGems}
            gemCollection={gemCollection}
          />
        ) : (
          <GemList
            id="searchResults"
            gems={searchResults}
            updateGems={updateGems}
            gemCollection={gemCollection}
          />
        )}
      </AppStyles>
    </>
  );
};

const AppStyles = styled.div`
  padding: 120px 0 0 0;
  background-color: #f7f5f5;
  margin: 0 auto;
  max-width: 1100px;
  min-height: 100vh;
  font-family: Rubik, sans-serif;
`;

const Header = styled.header`
  @media (max-width: 1000px) {
    header {
      /* Reverse the axis of the header, making it vertical. */
      flex-direction: column;

      /* Align items to the begining (the left) of the header. */
      align-items: flex-start;
    }
  }
  background: #fff;
  width: 100%;
  border-bottom: 1px solid red;
  font-family: Rubik, sans-serif;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 1;
  text-align: center;
  display: block;
`;

App.propTypes = {
  filterText: PropTypes.string,
  queryGems: PropTypes.func,
  searchResults: PropTypes.array,
  searchText: PropTypes.string,
  toggle: PropTypes.func,
  updateFilterText: PropTypes.func,
  updateSearchText: PropTypes.func,
};

export default App;
