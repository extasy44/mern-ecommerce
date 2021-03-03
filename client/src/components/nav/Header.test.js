import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Header from './Header';

// set up enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return shallow(<Header {...props} />);
};

const findByAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

describe('renders', () => {
  test('renders menu without crashing', () => {
    const wrapper = setup();
    const menu = findByAttr(wrapper, 'header_menu');
    expect(menu.length).toBe(1);
  });
});
