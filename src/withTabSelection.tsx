import  { ComponentType } from 'react';
import { TabSelectionContext } from './TabProvider';
import TabSelection from './TabSelection';

function getDisplayName<P>(WrappedComponent: ComponentType<P>): string {
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
  function TabSelectionComponent(props: Omit<P, 'selection'>) {
    return (
      <TabSelectionContext.Consumer>
        {(selection) => <Component {...(props as P)} selection={selection} />}
      </TabSelectionContext.Consumer>
    );
  }

  TabSelectionComponent.displayName = `withTabSelection(${getDisplayName(Component)})`;

  return Object.assign(TabSelectionComponent, {
    WrappedComponent: Component,
  });
};

export default withTabSelection;
