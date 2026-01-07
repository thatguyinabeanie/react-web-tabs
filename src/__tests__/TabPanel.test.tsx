import React from 'react';
import { render, screen } from '@testing-library/react';
import TabPanel from '../TabPanel';
import TabSelection from '../TabSelection';

const mockSelection = (): TabSelection => ({
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  isSelected: jest.fn(),
} as any);

test('<TabPanel /> should exist', () => {
  const { container } = render((
    <TabPanel.WrappedComponent selection={mockSelection()} tabId="foo"><span>Foo</span></TabPanel.WrappedComponent>
  ));

  expect(container.firstChild).toBeInTheDocument();
});

test('<TabPanel /> should render children', () => {
  render((
    <TabPanel.WrappedComponent selection={mockSelection()} tabId="foo"><span id="content">Foo</span></TabPanel.WrappedComponent>
  ));

  expect(screen.getByText('Foo')).toBeInTheDocument();
});

test('<TabPanel /> should subscribe and unsubscribe for context changes', () => {
  const selection = mockSelection();

  const { unmount } = render(
    <TabPanel.WrappedComponent selection={selection} tabId="foo"><span>Foo</span></TabPanel.WrappedComponent>,
  );

  expect(selection.subscribe).toHaveBeenCalledTimes(1);
  unmount();
  expect(selection.subscribe).not.toHaveBeenCalledTimes(2);
  expect(selection.unsubscribe).toHaveBeenCalledTimes(1);
});

test('<TabPanel /> should unsubscribe with the same function as subscribed with', () => {
  const selection = mockSelection();

  const { unmount } = render(
    <TabPanel.WrappedComponent selection={selection} tabId="foo"><span>Foo</span></TabPanel.WrappedComponent>,
  );

  unmount();
  const subscribeArgs = selection.subscribe.mock.calls[0];
  const unsubscribeArgs = selection.unsubscribe.mock.calls[0];

  expect(subscribeArgs).toEqual(unsubscribeArgs);
});
