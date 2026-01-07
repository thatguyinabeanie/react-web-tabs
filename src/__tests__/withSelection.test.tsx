import React from 'react';
import { render } from '@testing-library/react';

import { TabProvider } from '..';
import withTabSelection from '../withTabSelection';

function Foo() {
  return <p>Foo</p>;
}

test('<WrappedComponent /> should exist', () => {
  const WrappedComponent = withTabSelection(Foo);
  const { container } = render((
    <TabProvider>
      <div>
        <WrappedComponent />
      </div>
    </TabProvider>
  ));

  expect(container.firstChild).toBeInTheDocument();
});

test('<WrappedComponent /> should return WrappedComponent', () => {
  const WrappedComponent = withTabSelection(Foo);

  expect(WrappedComponent.WrappedComponent).toEqual(Foo);
});

test('<WrappedComponent /> should set correct displayName', () => {
  const WrappedComponent = withTabSelection(Foo);

  expect(WrappedComponent.displayName).toEqual('withTabSelection(Foo)');
});
