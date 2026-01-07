import React, { Component, ReactNode } from 'react';
import TabSelection from './TabSelection';

export const TabSelectionContext = React.createContext<TabSelection>(
  {} as TabSelection,
);

interface TabProviderProps {
  children: ReactNode;
  defaultTab?: string;
  vertical?: boolean;
  collapsible?: boolean;
  onChange?: (tabId: string) => void;
}

class TabProvider extends Component<TabProviderProps> {
  static defaultProps = {
    defaultTab: undefined,
    onChange: undefined,
    vertical: false,
    collapsible: false,
  };

  selection: TabSelection;

  constructor(props: TabProviderProps) {
    super(props);

    this.selection = new TabSelection({
      defaultTab: props.defaultTab,
      vertical: props.vertical,
      collapsible: props.collapsible,
      onChange: props.onChange,
    });
  }

  componentDidUpdate(prevProps: TabProviderProps): void {
    if (this.props.defaultTab !== prevProps.defaultTab && !this.selection.isSelected(this.props.defaultTab as string)) {
      this.selection.select(this.props.defaultTab as string);
    }
  }

  render(): ReactNode {
    const { children } = this.props;
    return (
      <TabSelectionContext.Provider value={this.selection}>
        {children}
      </TabSelectionContext.Provider>
    );
  }
}

export default TabProvider;
