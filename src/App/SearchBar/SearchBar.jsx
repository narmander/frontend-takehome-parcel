import React from 'react';
import styled from 'styled-components';

const SearchBarStyles = styled.form``;

const SearchBar = props => {
  return (
    <SearchBarStyles>
      <label htmlFor="search"> 
        <input
          name="search"
          type="search"
          placeholder={props.placeholder}
          onChange={e => props.setUserInput(e.target.value)}
        />
        <button
          type="submit"
          onClick={props.searchAction}
          className="home__search__icon"
        >⌕</button>
      </label>
    </SearchBarStyles>
  );
};

export default SearchBar;
