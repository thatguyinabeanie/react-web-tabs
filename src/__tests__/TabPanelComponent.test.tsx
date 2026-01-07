import React from 'react';
import { render, screen } from '@testing-library/react';
import TabPanelComponent from '../TabPanelComponent';
import TabSelection from '../TabSelection';

const mockSelection = (): TabSelection => ({
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  isSelected: jest.fn(),
} as any);

test('<TabPanelComponent /> should exist', () => {
  const { container } = render((
    <TabPanelComponent selection={mockSelection()} tabId="foo"><span>Foo</span></TabPanelComponent>
  ));

  expect(container.firstChild).toBeInTheDocument();
});

test('<TabPanelComponent /> should render component', () => {
  function Foo() {
    return <span id="content">Foo</span>;
  }

  const FooComponent = Foo;
  render((
    <TabPanelComponent selection={mockSelection()} tabId="foo" component={FooComponent} />
  ));

  expect(screen.getByText('Foo')).toBeInTheDocument();
});

test('<TabPanelComponent /> should be able to pass a render function', () => {
  render((
    <TabPanelComponent selection={mockSelection()} tabId="foo" render={() => (<span id="content">Foo</span>)} />
  ));

  expect(screen.getByText('Foo')).toBeInTheDocument();
});

test('<TabPanelComponent /> should render children', () => {
  render((
    <TabPanelComponent selection={mockSelection()} tabId="foo"><span id="content">Foo</span></TabPanelComponent>
  ));

  expect(screen.getByText('Foo')).toBeInTheDocument();
});

test('<TabPanelComponent /> should have the correct aria attributes', () => {
  const { container } = render((
    <TabPanelComponent selection={mockSelection()} tabId="foo"><span>Foo</span></TabPanelComponent>
  ));

  const panel = container.querySelector('div');
  expect(panel).toHaveAttribute('id', 'foo');
  expect(panel).toHaveAttribute('aria-labelledby', 'foo-tab');
  expect(panel).toHaveAttribute('role', 'tabpanel');
});

test('<TabPanelComponent /> should have the rwt__tabpanel className by default', () => {
  const { container } = render((
    <TabPanelComponent selection={mockSelection()} tabId="foo"><span>Foo</span></TabPanelComponent>
  ));

  const panel = container.querySelector('div');
  expect(panel!.className.trim()).toEqual('rwt__tabpanel');
});

test('<TabPanelComponent /> should be able to set any className', () => {
  const { container } = render((
    <TabPanelComponent selection={mockSelection()} tabId="foo" className="foo"><span>Foo</span></TabPanelComponent>
  ));

  expect(container.firstChild).toHaveClass('foo');
});
