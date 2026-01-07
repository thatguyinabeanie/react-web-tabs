import React, { ReactNode } from 'react';
import TabProvider from './TabProvider';

interface TabsProps {
  children: ReactNode;
  defaultTab?: string;
  className?: string;
  vertical?: boolean;
  collapsible?: boolean;
  onChange?: (tabId: string) => void;
}

function Tabs({
  children,
  defaultTab,
  onChange,
  vertical = false,
  collapsible = false,
  className = '',
  ...props
}: TabsProps): ReactNode {
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

export default Tabs;
