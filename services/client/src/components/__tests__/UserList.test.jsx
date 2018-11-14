import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import UserList from '../UserList';

const users = [
  {
    active: true,
    email: 'hermanmu@gmail.com',
    id: 1,
    username: 'michael'
  },
  {
    active: true,
    email: 'michael@mherman.org',
    id: 2,
    username: 'michaelherman'
  }
];

test('UserList renders properly', () => {
  // used shallow to create an instance of the comonent, with no children
  const wrapper = shallow(<UserList users={users} />);
  const element = wrapper.find('h4');
  expect(element.length).toBe(2);
  expect(element.get(0).props.children).toBe('michael');
});

test('UserList renders a snapshot properly', () => {
  const tree = renderer.create(<UserList users={users} />).toJSON();
  expect(tree).toMatchSnapshot();
});
