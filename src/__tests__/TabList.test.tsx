import React from 'react';
import { render, screen } from '@testing-library/react';

import TabList from '../TabList';
import TabSelection from '../TabSelection';

const mockSelection = (): TabSelection => ({
  isVertical: jest.fn(),
} as unknown as TabSelection);

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
