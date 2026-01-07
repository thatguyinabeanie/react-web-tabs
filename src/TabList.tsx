import React, { Component, ReactNode } from 'react';
import TabListComponent from './TabListComponent';
import withTabSelection, { WithTabSelectionProps } from './withTabSelection';

interface TabListProps extends WithTabSelectionProps {
  children: ReactNode;
  className?: string;
}

class TabList extends Component<TabListProps> {
  static defaultProps = {
    className: '',
  };

  render(): ReactNode {
    const { selection, children, className, ...props } = this.props;
    const verticalOrientation = selection.isVertical();

    return (
      <TabListComponent
        {...props}
        verticalOrientation={verticalOrientation}
        className={className}
      >
        {children}
      </TabListComponent>
    );
  }
}

export default withTabSelection(TabList);
