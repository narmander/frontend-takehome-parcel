import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import GemList from './GemList/GemList';
import { SearchBar } from '../shared-components/SearchBar/SearchBar';
import { Button } from '../shared-components/Button';
import { GlobalStyles, Wrapper } from '../assets/styles';
import {
  saveGem,
  removeGem,
  fetchGems,
  reducer,
  COLLECTION_DATABASE,
  SET_SEARCH_TEXT,
  SET_SEARCH_RESULTS,
  UPDATE_GEM_COLLECTION,
  SET_FILTER_TEXT,
} from '../utils';

import { themes, BLACK, WHITE, RED, BLUE } from '../assets/colors';

const App = () => {
  const [showCollection, setCollectionView] = useState(false);
  const [emptyStateText, setEmptyStateText] = useState(
    'Search for some new Ruby Gems.'
  );
  const [theme, setTheme] = useState(themes.red);
  const [state, dispatch] = useReducer(reducer, {
    filterText: '',
    searchResults: [],
    searchText: '',
    gemCollection: {},
  });
  const { searchResults, searchText, filterText } = state;

  useEffect(() => {
    // we only need this to happen once when app first renders to set "database" array
    // an empty array passed as second argument prevents this effect from running again
    if (!localStorage.length) {
      localStorage.setItem(COLLECTION_DATABASE, JSON.stringify([]));
    }
  }, []);

  function toggle() {
    updateFilterText('');
    updateSearchText('');
    setEmptyStateText('Search for some new Ruby Gems.');
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
    fetchGems(searchText).then(results => {
      if (!results.length)
        setEmptyStateText('Sorry no gems came back from that query...');
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
      <ThemeProvider theme={theme}>
        <AppStyles className="main-app">
          <Header className="header">
            <Wrapper>
              <h1>Ruby Gems Search</h1>
              <h2>Find, favorite, and filter Ruby Gems.</h2>
              <ThemeToggle
                onClick={() => setTheme(themes.red)}
                style={{ background: RED }}
              />
              <ThemeToggle
                onClick={() => setTheme(themes.dark)}
                style={{ background: BLACK }}
              />
              <ThemeToggle
                onClick={() => setTheme(themes.light)}
                style={{ background: WHITE }}
              />
              <ThemeToggle
                onClick={() => setTheme(themes.blue)}
                style={{ background: BLUE }}
              />
            </Wrapper>
          </Header>
          {showCollection ? (
            <>
              <SearchBar
                setUserInput={updateFilterText}
                placeholder="Filter your collection..."
                value={filterText}
              />
            </>
          ) : (
            <>
              <SearchBar
                searchAction={queryGems}
                setUserInput={updateSearchText}
                placeholder="Search for new Ruby gems..."
                value={searchText}
              />
            </>
          )}
          <Button onClick={toggle} children={['Search', 'Collection']} />
          {showCollection ? (
            <GemList
              id="collection"
              filterText={filterText}
              gems={JSON.parse(localStorage[COLLECTION_DATABASE])}
              updateGems={updateGems}
              emptyStateText="You don't have any gems saved yet! Go search for some!"
            />
          ) : (
            <GemList
              id="searchResults"
              gems={searchResults}
              updateGems={updateGems}
              emptyStateText={emptyStateText}
            />
          )}
        </AppStyles>
      </ThemeProvider>
    </>
  );
};

const AppStyles = styled.div`
  padding: 100px 20px 0;
  background-color: ${props => props.theme.background};
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
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.color};
  display: block;
  font-family: Rubik, sans-serif;
  left: 0px;
  position: fixed;
  text-align: center;
  top: 0px;
  width: 100%;
  z-index: 1;
`;

const ThemeToggle = styled.button`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 10px;
  border: 1px solid ${BLACK};
`;

const ToggleButton = styled.button``;

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
