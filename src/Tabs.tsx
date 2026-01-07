import React, { Component, ReactNode } from 'react';
import TabProvider from './TabProvider';

interface TabsProps {
  children: ReactNode;
  defaultTab?: string;
  className?: string;
  vertical?: boolean;
  collapsible?: boolean;
  onChange?: (tabId: string) => void;
}

class Tabs extends Component<TabsProps> {
  static defaultProps = {
    defaultTab: undefined,
    className: '',
    vertical: false,
    collapsible: false,
    onChange: undefined,
  };

  render(): ReactNode {
    const {
      children,
      defaultTab,
      onChange,
      vertical,
      collapsible,
      className,
      ...props
    } = this.props;

    return (
      <TabProvider
        defaultTab={defaultTab}
        onChange={onChange}
        vertical={vertical}
        collapsible={collapsible}
      >
        <div {...props} data-rwt-vertical={vertical} className={`rwt__tabs ${className || ''}`}>
          {children}
        </div>
      </TabProvider>
    );
  }
}

export default Tabs;
