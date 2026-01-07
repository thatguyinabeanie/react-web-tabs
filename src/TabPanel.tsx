import React, { Component, ReactNode, ComponentType } from 'react';
import TabPanelComponent from './TabPanelComponent';
import withTabSelection, { WithTabSelectionProps } from './withTabSelection';
import { SelectOptions } from './TabSelection';

interface TabPanelProps extends WithTabSelectionProps {
  tabId: string;
  children?: ReactNode;
  className?: string;
  component?: ComponentType<{ selected: boolean }>;
  render?: (props: { selected: boolean }) => ReactNode;
}

/* eslint-disable no-nested-ternary */
class TabPanel extends Component<TabPanelProps> {
  constructor(props: TabPanelProps) {
    super(props);
    this.update = this.update.bind(this);
  }

  componentDidMount(): void {
    this.props.selection.subscribe(this.update);
  }

  componentWillUnmount(): void {
    this.props.selection.unsubscribe(this.update);
  }

  update(_options?: SelectOptions): void {
    this.forceUpdate();
  }

  render(): ReactNode {
    const {
      tabId,
      selection,
      ...props
    } = this.props;

    const selected = selection.isSelected(tabId);

    return (
      <TabPanelComponent
        tabId={tabId}
        selected={selected}
        {...props}
      />
    );
  }
}

export default withTabSelection(TabPanel);
