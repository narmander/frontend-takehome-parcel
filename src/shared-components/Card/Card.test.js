import React from 'react';
import renderer from 'react-test-renderer';

import { Card } from './Card.jsx';

test('Icon turns red when clicked', () => {

    const props = {toggled: false}

  const component = renderer.create(
    <Card {...props}/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
