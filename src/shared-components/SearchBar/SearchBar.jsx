import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { RED, GRAY, BLACK, PINK } from '../../assets/colors';
import { Search as SearchIcon } from '../../assets/icons/Search';

// component for generic reuse

export const SearchBar = props => {
  return (
    <SearchBarStyles>
      <label htmlFor="search">
        <Input
          name="search"
          type="search"
          placeholder={props.placeholder}
          onChange={e => props.setUserInput(e.target.value)}
          value={props.value}
        />

        <SubmitButton
          type="submit"
          onClick={props.searchAction}
          className="home__search__icon"
        >
          <SearchIcon />
        </SubmitButton>
      </label>
    </SearchBarStyles>
  );
};

const SearchBarStyles = styled.form`
  margin: 20px auto;
  border: 2px solid ${BLACK};
  border-radius: 25px;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  /* cell phone */
  @media screen and (min-width: 1100px) {
    width: calc(80% - 64px);
  }
`;

const Input = styled.input`
  line-height: 60px;
  border-radius: 25px;
  border: 0;
  padding: 0 60px 0 20px;
  appearance: none;
  display: block;
  font-size: 20px;
  font-family: Rubik, sans-serif;
  caret-color: ${RED};
  color: ${RED};
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    padding: 5px;
    color: ${props => props.theme.background};
    font-family: Lato, sans-serif;
    font-size: 20px;
    font-weight: 900;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  position: absolute;
  background: none;
  border: none;
  width: 50px;
  top: 10px;
  right: 0;

  &:focus {
    outline: none;
  }

  @media screen and (min-width: 955) {
    margin-left: 788px;
  }
`;

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  searchAction: PropTypes.func,
  setUserInput: PropTypes.func,
};