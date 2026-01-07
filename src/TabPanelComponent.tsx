import React, { ReactNode, ComponentType } from 'react';

interface TabPanelComponentProps {
  tabId: string;
  children?: ReactNode;
  className?: string;
  component?: ComponentType<{ selected: boolean }>;
  render?: (props: { selected: boolean }) => ReactNode;
  selected?: boolean;
}

/* eslint-disable no-nested-ternary */
function TabPanelComponent({
  component,
  render,
  tabId,
  children = null,
  className = '',
  selected = false,
  ...props
}: TabPanelComponentProps): ReactNode {
  const childProps = { selected };
  return (
    <div
      {...props}
      id={tabId}
      role="tabpanel"
      aria-expanded={selected}
      aria-hidden={!selected}
      aria-labelledby={`${tabId}-tab`}
      className={`rwt__tabpanel ${className || ''}`}
    >
      {component ? (
        React.createElement(component, childProps)
      ) : render ? (
        render(childProps)
      ) : children}
    </div>
  );
}

export default TabPanelComponent;
