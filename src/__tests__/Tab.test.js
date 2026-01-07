import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tab, { KeyCode } from '../Tab';

const mockSelection = () => ({
  register: jest.fn(),
  unregister: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  isSelected: jest.fn(),
  select: jest.fn(),
  selectPrevious: jest.fn(),
  selectNext: jest.fn(),
  selectFirst: jest.fn(),
  selectLast: jest.fn(),
  isVertical: jest.fn(),
});

test('<Tab /> should exist', () => {
  const { container } = render(
    <Tab.WrappedComponent selection={mockSelection()} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  expect(container).toBeDefined();
});

test('<Tab /> should render children', () => {
  const content = <span id="content">Tab 1</span>;
  render(
    <Tab.WrappedComponent selection={mockSelection()} tabFor="foo">{content}</Tab.WrappedComponent>,
  );

  expect(screen.getByText('Tab 1')).toBeInTheDocument();
});

test('<Tab /> should call callback on click', async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <Tab.WrappedComponent selection={mockSelection()} tabFor="foo" onClick={onClick}><span>Tab 1</span></Tab.WrappedComponent>,
  );

  await user.click(screen.getByRole('tab'));

  expect(onClick).toHaveBeenCalled();
});

test('<Tab /> should be selectable', () => {
  const selection = mockSelection();
  selection.isSelected = () => false;
  const { rerender } = render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'false');

  selection.isSelected = () => true;
  rerender(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true');
});

test('<Tab /> should be able to select previous tab with LEFT_ARROW key', () => {
  const selection = mockSelection();
  render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.LEFT_ARROW });

  expect(selection.selectPrevious).toHaveBeenCalled();
});

test('<Tab /> should be able to select next tab RIGHT_ARROW key', () => {
  const selection = mockSelection();
  render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.RIGHT_ARROW });

  expect(selection.selectNext).toHaveBeenCalled();
});

test('<Tab /> should not be able to select prev/next tab with UP_ARROW/DOWN_ARROW key when horizontal', () => {
  const selection = mockSelection();

  render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.UP_ARROW });
  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.DOWN_ARROW });

  expect(selection.selectPrevious).not.toHaveBeenCalled();
  expect(selection.selectNext).not.toHaveBeenCalled();
});

test('<Tab /> should be able to select previous tab with UP_ARROW key when vertical', () => {
  const selection = mockSelection();

  selection.isVertical = jest.fn(() => true);

  render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.UP_ARROW });

  expect(selection.selectPrevious).toHaveBeenCalled();
});

test('<Tab /> should be able to select next tab DOWN_ARROW key when vertical', () => {
  const selection = mockSelection();

  selection.isVertical = jest.fn(() => true);

  render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.DOWN_ARROW });

  expect(selection.selectNext).toHaveBeenCalled();
});

test('<Tab /> should not be able to select prev/next tab with LEFT_ARROW/RIGHT_ARROW key when vertical', () => {
  const selection = mockSelection();

  selection.isVertical = jest.fn(() => true);

  render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.LEFT_ARROW });
  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.RIGHT_ARROW });

  expect(selection.selectPrevious).not.toHaveBeenCalled();
  expect(selection.selectNext).not.toHaveBeenCalled();
});

test('<Tab /> should be able to select first tab with HOME key', () => {
  const selection = mockSelection();
  render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.HOME });

  expect(selection.selectFirst).toHaveBeenCalled();
});

test('<Tab /> should be able to select last tab with END key', () => {
  const selection = mockSelection();
  render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.END });

  expect(selection.selectLast).toHaveBeenCalled();
});

test('<Tab /> should not change selection on unrecognized key event', () => {
  const selection = mockSelection();
  render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: 65 }); // 'A' key

  expect(selection.selectFirst).not.toHaveBeenCalled();
  expect(selection.selectLast).not.toHaveBeenCalled();
  expect(selection.selectPrevious).not.toHaveBeenCalled();
  expect(selection.selectNext).not.toHaveBeenCalled();
  expect(selection.select).not.toHaveBeenCalled();
});

test('<Tab /> should shift focus if selecting a different tab using keyboard navigation', () => {
  const selection = mockSelection();
  render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  fireEvent.keyDown(screen.getByRole('tab'), { keyCode: KeyCode.LEFT_ARROW });

  expect(selection.selectPrevious).toHaveBeenCalledWith({ focus: true });
});

test('<Tab /> should subscribe and unsubscribe for context changes', () => {
  const selection = mockSelection();
  const { unmount } = render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  expect(selection.register).toHaveBeenCalledTimes(1);
  expect(selection.subscribe).toHaveBeenCalledTimes(1);
  unmount();
  expect(selection.register).not.toHaveBeenCalledTimes(2);
  expect(selection.subscribe).not.toHaveBeenCalledTimes(2);
  expect(selection.unsubscribe).toHaveBeenCalledTimes(1);
  expect(selection.unregister).toHaveBeenCalledTimes(1);
});

test('<Tab /> should unsubscribe with the same function as subscribed with', () => {
  const selection = mockSelection();
  const { unmount } = render(
    <Tab.WrappedComponent selection={selection} tabFor="foo"><span>Tab 1</span></Tab.WrappedComponent>,
  );

  unmount();
  const subscribeArgs = selection.subscribe.mock.calls[0];
  const unsubscribeArgs = selection.unsubscribe.mock.calls[0];
  const registerArgs = selection.register.mock.calls[0];
  const unregisterArgs = selection.unregister.mock.calls[0];

  expect(subscribeArgs).toEqual(unsubscribeArgs);
  expect(registerArgs).toEqual(unregisterArgs);
});
