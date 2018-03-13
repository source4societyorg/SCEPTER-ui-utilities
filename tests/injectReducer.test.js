/**
 * Test injectors
 */

import { memoryHistory } from 'react-router-dom';
import { shallow } from 'enzyme';
import React from 'react';
import { configureStore } from '@source4society/scepter-app-utilities';
import { reducerInjector } from '../src/index';

// Fixtures
const Component = () => null;

const reducer = () => ({ route: 'route', test: 'test' });

describe('injectReducer decorator', () => {
  let store;
  let ComponentWithReducer;

  it('should set a correct display name', () => {
    ComponentWithReducer = reducerInjector({ key: 'test', reducer })(Component);
    expect(ComponentWithReducer.displayName).toBe('withReducer(Component)');
    expect(reducerInjector({ key: 'test', reducer })(() => null).displayName).toBe('withReducer(Component)');
  });

  it('should propagate props', () => {
    const props = { testProp: 'test' };
    ComponentWithReducer = reducerInjector({ key: 'test', reducer })(Component);
    store = configureStore({}, memoryHistory);
    const renderedComponent = shallow(<ComponentWithReducer {...props} />, { context: { store } });
    expect(renderedComponent.prop('testProp')).toBe('test');
  });
});
