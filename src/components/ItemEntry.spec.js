import React from 'react';
import {
  TouchableHighlight,
} from 'react-native';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ItemEntry from './ItemEntry';

import uuid from 'uuid';




describe('<ItemEntry />', () => {
  it('single item, 0 progress, has 1. right name, 2. no "congrat" symbol', () => {
    const item = {
      name: 'testTitle',
      id: uuid.v4(),
      progress: 0,
      interval: undefined,
      isTiming: false,
    };

    const wrapper = shallow(<ItemEntry item={item} />);
    expect(wrapper.type()).to.equal(TouchableHighlight);
    expect(wrapper.childAt(0).childAt(0).childAt(0).length).to.equal(1);
    expect(wrapper.childAt(0).childAt(0).childAt(0).childAt(0).text()).to.equal('testTitle');
    expect(wrapper.childAt(0).childAt(1).childAt(0).text()).to.equal('0');
  });

  it('single item, 1000000 progress, has 1. right name, 2. 1 "congrat" symbol, 3. right progress displayed', () => {
    const item = {
      name: 'testTitle',
      id: uuid.v4(),
      progress: 1000000,
      interval: undefined,
      isTiming: false,
    };

    const wrapper = shallow(<ItemEntry item={item} />);
    expect(wrapper.length).to.equal(1);
    expect(wrapper.type()).to.equal(TouchableHighlight);
    expect(wrapper.childAt(0).childAt(0).childAt(1).childAt(0).text()).to.equal('🌟');
    expect(wrapper.childAt(0).childAt(1).childAt(0).text()).to.equal('~278');
  });
});
