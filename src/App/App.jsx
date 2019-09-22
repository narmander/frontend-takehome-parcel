import React from 'react';
import GemList from './GemList/GemList';
import SearchBar from './SearchBar/SearchBar';

// have on search for gemlist results
// have on filter search for collection list

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      searchResults: [],
      searchText: '',
      showCollection: false,
    };

    this.queryGems = this.queryGems.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateFilterText = this.updateFilterText.bind(this);
    this.updateSearchText = this.updateSearchText.bind(this);
  }

  componentWillMount() {
    if(!localStorage.length) localStorage.setItem('gems', JSON.stringify([]));
  }

  toggle() {
    this.setState({ showCollection: !this.state.showCollection });
  }

  updateSearchText(searchText) {
    this.setState({ searchText });
  }

  updateFilterText(filterText) {
    this.setState({ filterText });
  }

  queryGems(e) {
    e.preventDefault();
    if (!this.state.searchText) return;
    fetch(`${process.env.HOST_SERVER}query=${this.state.searchText}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(searchResults => {
        this.setState({ searchResults });
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        {this.state.showCollection ? (
          <>
            <SearchBar
              setUserInput={this.updateFilterText}
              placeholder="Filter gem collection..."
            />
            <GemList
              id="collection"
              gems={JSON.parse(localStorage.gems)}
              filterText={this.state.filterText}
            />
          </>
        ) : (
          <>
            <SearchBar
              searchAction={this.queryGems}
              setUserInput={this.updateSearchText}
              placeholder="Search for new Ruby gems..."
              buttonText="Search!"
            />
            <GemList
              id="searchResults"
              gems={this.state.searchResults}
              searchResults={true}
            />
          </>
        )}
      </div>
    );
  }
}

export default App;
