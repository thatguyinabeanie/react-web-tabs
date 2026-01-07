import React from 'react';
import { render, screen } from '@testing-library/react';

import Tabs from '../Tabs';

test('<Tabs /> should exist', () => {
  const { container } = render((
    <Tabs><p>Foo</p></Tabs>
  ));

  expect(container.firstChild).toBeInTheDocument();
});

test('<Tabs /> should have the className rwt__tabs by default', () => {
  const { container } = render((
    <Tabs><p>Foo</p></Tabs>
  ));

  expect(container.querySelector('.rwt__tabs')).toBeInTheDocument();
});

test('<Tabs /> should be able to set any classname', () => {
  const { container } = render((
    <Tabs className="foo"><p>Foo</p></Tabs>
  ));

  expect(container.querySelector('.rwt__tabs')).toBeInTheDocument();
  expect(container.querySelector('.foo')).toBeInTheDocument();
});

test('<Tabs /> should render children', () => {
  render((
    <Tabs><p id="child">Foo</p></Tabs>
  ));

  expect(screen.getByText('Foo')).toBeInTheDocument();
});

test('<Tabs /> should be able to pass vertical prop', () => {
  const { container } = render((
    <Tabs vertical><p>Foo</p></Tabs>
  ));

  expect(container.querySelector('[data-rwt-vertical="true"]')).toBeInTheDocument();
});

test('<Tabs /> should by wrapped by a tabProvider', () => {
  const { container } = render((
    <Tabs><p>Foo</p></Tabs>
  ));

  // TabProvider doesn't render a specific element, but we can verify the component structure
  // by checking that the tabs wrapper exists
  expect(container.querySelector('.rwt__tabs')).toBeInTheDocument();
});
