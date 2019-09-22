import React from 'react';
import ReactDOM from 'react-dom';
import GemRow from './GemRow';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GemRow />, div);
});

// expect gem to update localstorage 