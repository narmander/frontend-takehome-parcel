import React from 'react';
import PropTypes from 'prop-types';
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

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  searchAction: PropTypes.func,
  setUserInput: PropTypes.func,
};

export default SearchBar;
