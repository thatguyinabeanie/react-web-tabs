import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabComponent from '../TabComponent';

test('<TabComponent /> should exist', () => {
  const { container } = render(
    <TabComponent tabFor="foo"><span>Tab 1</span></TabComponent>,
  );

  expect(container).toBeDefined();
});

test('<TabComponent /> should be a button', () => {
  render(
    <TabComponent tabFor="foo"><span>Tab 1</span></TabComponent>,
  );

  expect(screen.getByRole('tab')).toBeInTheDocument();
  expect(screen.getByRole('tab').tagName).toBe('BUTTON');
});

test('<TabComponent /> should render children', () => {
  const content = <span id="content">Tab 1</span>;
  render(
    <TabComponent tabFor="foo">{content}</TabComponent>,
  );

  expect(screen.getByText('Tab 1')).toBeInTheDocument();
});

test('<TabComponent /> should call callback on click', async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <TabComponent tabFor="foo" onClick={onClick}><span>Tab 1</span></TabComponent>,
  );

  await user.click(screen.getByRole('tab'));

  expect(onClick).toHaveBeenCalled();
});

test('<TabComponent /> should be selectable', () => {
  const { rerender } = render(
    <TabComponent tabFor="foo"><span>Tab 1</span></TabComponent>,
  );

  expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'false');

  rerender(
    <TabComponent selected tabFor="foo"><span>Tab 1</span></TabComponent>,
  );

  expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true');
});

test('<TabComponent /> that is unselected is not focusable by default', () => {
  const { rerender } = render(
    <TabComponent tabFor="foo"><span>Tab 1</span></TabComponent>,
  );

  expect(screen.getByRole('tab')).toHaveAttribute('tabIndex', '-1');

  rerender(
    <TabComponent selected tabFor="foo"><span>Tab 1</span></TabComponent>,
  );

  expect(screen.getByRole('tab')).toHaveAttribute('tabIndex', '0');
});

test('<TabComponent /> that is focusable should always have tabIndex 0', () => {
  const { rerender } = render(
    <TabComponent focusable tabFor="foo"><span>Tab 1</span></TabComponent>,
  );

  expect(screen.getByRole('tab')).toHaveAttribute('tabIndex', '0');

  rerender(
    <TabComponent focusable selected tabFor="foo"><span>Tab 1</span></TabComponent>,
  );

  expect(screen.getByRole('tab')).toHaveAttribute('tabIndex', '0');
});

test('<TabComponent /> should have the correct aria attributes', () => {
  render(
    <TabComponent tabFor="foo"><span>Tab 1</span></TabComponent>,
  );

  expect(screen.getByRole('tab')).toHaveAttribute('id', 'foo-tab');
  expect(screen.getByRole('tab')).toHaveAttribute('aria-controls', 'foo');
  expect(screen.getByRole('tab')).toHaveAttribute('role', 'tab');
});

test('<TabComponent /> should be able to set any className', () => {
  render(
    <TabComponent tabFor="foo" className="foo"><span>Tab 1</span></TabComponent>,
  );

  expect(screen.getByRole('tab')).toHaveClass('foo');
});
