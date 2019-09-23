import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GemList from './GemList/GemList';
import SearchBar from './SearchBar/SearchBar';
import { fetchGems, COLLECTION_DATABASE } from '../utils';

const AppStyles = styled.div`
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
  font-family: Rubik, sans-serif;
  top: 0px;
  left: 50%;
  position: fixed;
  z-index: 1;
  text-align: center;
  display: block;
`;

const App = () => {
  const [filterText, setFilterText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [gemCollection, updateGemCollection] = useState(localStorage);
  const [showCollection, setCollectionView] = useState(false);

  useEffect(() => {
    if (!gemCollection.length) {
        localStorage.setItem(COLLECTION_DATABASE, JSON.stringify([]));
    }
  }, []);

  function toggle() {
    setCollectionView(!showCollection);
  }

  function updateSearchText(searchText) {
    setSearchText(searchText);
  }

  function updateFilterText(filterText) {
    setFilterText(filterText);
  }

  function queryGems(e) {
    e.preventDefault();
    if (!searchText) return;
    fetchGems(searchText).then(searchResults =>
      setSearchResults(searchResults)
    );
  }

  return (
    <AppStyles className="main-app">
      <Header className="header">
        <h1>Ruby Gems Search</h1>
        <h2>Find, favorite, and filter RubyGems.</h2>
      </Header>
      <h2>Showing: Gem Collection</h2>
      <button onClick={toggle}>Toggle</button>
      {showCollection ? (
        <>
          <SearchBar
            setUserInput={updateFilterText}
            placeholder="Filter gem collection..."
            value={filterText}
          />
          <GemList
            id="collection"
            gems={JSON.parse(localStorage[COLLECTION_DATABASE])}
            filterText={filterText}
          />
        </>
      ) : (
        <>
          <SearchBar
            searchAction={queryGems}
            setUserInput={updateSearchText}
            placeholder="Search for new Ruby gems..."
            buttonText="Search!"
            value={searchText}
          />
          <GemList
            id="searchResults"
            gems={searchResults}
            searchResults={true}
          />
        </>
      )}
    </AppStyles>
  );
};

export default App;
