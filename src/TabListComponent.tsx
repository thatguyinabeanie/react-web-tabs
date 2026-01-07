import React, { Component, ReactNode } from 'react';

interface TabListComponentProps {
  children: ReactNode;
  className?: string;
  verticalOrientation?: boolean;
}

/* eslint-disable jsx-a11y/role-supports-aria-props */
class TabListComponent extends Component<TabListComponentProps> {
  static defaultProps = {
    className: '',
    verticalOrientation: false,
  };

  render(): ReactNode {
    const { children, className, verticalOrientation, ...props } = this.props;

    return (
      <div
        {...props}
        role="tablist"
        aria-orientation={verticalOrientation ? 'vertical' : undefined}
        className={`rwt__tablist ${className || ''}`}
      >
        {children}
      </div>
    );
  }
}

export default TabListComponent;
