import React, { Component, ReactNode, MouseEvent, KeyboardEvent } from 'react';

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

class TabComponent extends Component<TabComponentProps> {
  static defaultProps = {
    className: '',
    selected: false,
    focusable: false,
    onClick: undefined,
    onKeyDown: undefined,
    tabRef: undefined,
  };

  render(): ReactNode {
    const {
      tabFor,
      children,
      className,
      selected,
      focusable,
      tabRef,
      onClick,
      onKeyDown,
      ...props
    } = this.props;

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
}

export default TabComponent;
