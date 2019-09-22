import React from 'react';

const SearchButton = props => props.searchAction ? <button onClick={props.searchAction}>{props.buttonText}</button> : '';

const SearchBar = props => {
  return (
    <form>
      <input type="text" placeholder={props.placeholder} onChange={e => props.setUserInput(e.target.value)} />
      <SearchButton {...props} />
    </form>
  );
};

export default SearchBar;