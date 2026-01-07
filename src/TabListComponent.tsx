import React, { ReactNode } from 'react';

interface TabListComponentProps {
  children: ReactNode;
  className?: string;
  verticalOrientation?: boolean;
}

function TabListComponent({
  children,
  className = '',
  verticalOrientation = false,
  ...props
}: TabListComponentProps): ReactNode {
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

export default TabListComponent;
