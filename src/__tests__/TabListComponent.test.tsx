import React from 'react';
import { render, screen } from '@testing-library/react';

import TabListComponent from '../TabListComponent';

test('<TabListComponent /> should exist', () => {
  const { container } = render((
    <TabListComponent>
      <span>Foo</span>
    </TabListComponent>
  ));

  expect(container.firstChild).toBeInTheDocument();
});

test('<TabListComponent /> should render children', () => {
  render((
    <TabListComponent>
      <span id="content">Foo</span>
    </TabListComponent>
  ));

  expect(screen.getByText('Foo')).toBeInTheDocument();
});

test('<TabListComponent /> should have the correct aria attributes', () => {
  const { container } = render((
    <TabListComponent>
      <span>Foo</span>
    </TabListComponent>
  ));

  expect(container.firstChild).toHaveAttribute('role', 'tablist');
});

test('<TabListComponent /> should be able to set any className', () => {
  const { container } = render((
    <TabListComponent className="foo">
      <span>Foo</span>
    </TabListComponent>
  ));

  expect(container.firstChild).toHaveClass('foo');
});

test('<TabListComponent /> should be set aria-orientation when vertical', () => {
  const { container } = render((
    <TabListComponent verticalOrientation><span>Foo</span></TabListComponent>
  ));

  expect(container.firstChild).toHaveAttribute('aria-orientation', 'vertical');
});
