import React, { ComponentType } from 'react';
import { TabSelectionContext } from './TabProvider';
import TabSelection from './TabSelection';

function getDisplayName(WrappedComponent: ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export interface WithTabSelectionProps {
  selection: TabSelection;
}

const withTabSelection = <P extends WithTabSelectionProps>(
  Component: ComponentType<P>,
): ComponentType<Omit<P, 'selection'>> & {
  WrappedComponent: ComponentType<P>;
} => {
  const TabSelectionComponent = (props: Omit<P, 'selection'>) => (
    <TabSelectionContext.Consumer>
      {(selection) => <Component {...(props as P)} selection={selection} />}
    </TabSelectionContext.Consumer>
  );

  TabSelectionComponent.displayName = `withTabSelection(${getDisplayName(Component)})`;

  return Object.assign(TabSelectionComponent, {
    WrappedComponent: Component,
  });
};

export default withTabSelection;
