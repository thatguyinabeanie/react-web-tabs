import React, {
  ReactNode, MouseEvent, KeyboardEvent,
} from 'react';

interface TabComponentProps {
  tabFor: string;
  children: ReactNode;
  className?: string;
  selected?: boolean;
  focusable?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  tabRef?: (element: HTMLButtonElement | null) => void;
}

function TabComponent({
  tabFor,
  children,
  className = '',
  selected = false,
  focusable = false,
  tabRef,
  onClick,
  onKeyDown,
  ...props
}: TabComponentProps): ReactNode {
  return (
    <button
      {...props}
      id={`${tabFor}-tab`}
      role="tab"
      aria-selected={selected}
      aria-controls={tabFor}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={focusable || selected ? 0 : -1}
      className={`rwt__tab ${className || ''}`}
      ref={tabRef}
      type="button"
    >
      {children}
    </button>
  );
}

export default TabComponent;
