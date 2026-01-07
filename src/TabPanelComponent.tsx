import React, { Component, ReactNode, ComponentType } from 'react';

interface TabPanelComponentProps {
  tabId: string;
  children?: ReactNode;
  className?: string;
  component?: ComponentType<{ selected: boolean }>;
  render?: (props: { selected: boolean }) => ReactNode;
  selected?: boolean;
}

/* eslint-disable no-nested-ternary */
class TabPanelComponent extends Component<TabPanelComponentProps> {
  static defaultProps = {
    className: '',
    component: null,
    children: null,
    render: null,
    selected: false,
  };

  render(): ReactNode {
    const {
      component,
      render,
      tabId,
      children,
      className,
      selected,
      ...props
    } = this.props;

    const childProps = { selected: selected || false };
    return (
      <div
        {...props}
        id={tabId}
        role="tabpanel"
        aria-expanded={selected}
        aria-hidden={!selected}
        aria-labelledby={`${tabId}-tab`}
        hidden={!selected}
        className={`rwt__tabpanel ${className || ''}`}
      >
        {component ? (
          React.createElement(component, childProps)
        ) : render ? (
          render(childProps)
        ) : children ? (
          children
        ) : null}
      </div>
    );
  }
}

export default TabPanelComponent;
