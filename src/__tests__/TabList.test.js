import React from 'react';
import { render, screen } from '@testing-library/react';

import TabList from '../TabList';

const mockSelection = () => ({
  isVertical: jest.fn(),
});

test('<TabList /> should exist', () => {
  const { container } = render((
    <TabList.WrappedComponent selection={mockSelection()}>
      <span>Foo</span>
    </TabList.WrappedComponent>
  ));

  expect(container.firstChild).toBeInTheDocument();
});

test('<TabList /> should render children', () => {
  render((
    <TabList.WrappedComponent selection={mockSelection()}>
      <span id="content">Foo</span>
    </TabList.WrappedComponent>
  ));

  expect(screen.getByText('Foo')).toBeInTheDocument();
});
