import React, { Component, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import TabComponent from './TabComponent';
import withTabSelection, { WithTabSelectionProps } from './withTabSelection';
import { SelectOptions } from './TabSelection';

export const KeyCode = {
  END: 35,
  HOME: 36,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
};

interface TabProps extends WithTabSelectionProps {
  tabFor: string;
  children: ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

class Tab extends Component<TabProps> {
  static defaultProps = {
    className: '',
    selected: false,
    onClick: undefined,
  };

  private tabComponent?: HTMLButtonElement | null;

  constructor(props: TabProps) {
    super(props);
    this.update = this.update.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    props.selection.register(props.tabFor);
  }

  componentDidMount(): void {
    this.props.selection.subscribe(this.update);
  }

  componentWillUnmount(): void {
    this.props.selection.unsubscribe(this.update);
    this.props.selection.unregister(this.props.tabFor);
  }

  update({ focus }: SelectOptions = {}): void {
    this.forceUpdate();
    if (focus && this.props.selection.isSelected(this.props.tabFor)) {
      this.tabComponent?.focus();
    }
  }

  handleClick(event: MouseEvent<HTMLButtonElement>): void {
    this.props.selection.select(this.props.tabFor);

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  handleKeyDown(e: KeyboardEvent<HTMLButtonElement>): void {
    const verticalOrientation = this.props.selection.isVertical();
    if (e.keyCode === KeyCode.HOME) {
      this.props.selection.selectFirst({ focus: true });
    } else if (e.keyCode === KeyCode.END) {
      this.props.selection.selectLast({ focus: true });
    } else if (e.keyCode === KeyCode.LEFT_ARROW && !verticalOrientation) {
      this.props.selection.selectPrevious({ focus: true });
    } else if (e.keyCode === KeyCode.RIGHT_ARROW && !verticalOrientation) {
      this.props.selection.selectNext({ focus: true });
    } else if (e.keyCode === KeyCode.UP_ARROW && verticalOrientation) {
      e.preventDefault();
      this.props.selection.selectPrevious({ focus: true });
    } else if (e.keyCode === KeyCode.DOWN_ARROW && verticalOrientation) {
      e.preventDefault();
      this.props.selection.selectNext({ focus: true });
    }
  }

  render(): ReactNode {
    const {
      tabFor, children, className, selection, ...props
    } = this.props;
    const isSelected = this.props.selection.isSelected(tabFor);

    return (
      <TabComponent
        {...props}
        tabFor={tabFor}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        selected={isSelected}
        className={className}
        tabRef={(e) => { this.tabComponent = e; }}
      >
        {children}
      </TabComponent>
    );
  }
}

export default withTabSelection(Tab);
