export interface TabSelectionOptions {
  defaultTab?: string;
  vertical?: boolean;
  collapsible?: boolean;
  onChange?: (tabId: string) => void;
}

export interface SelectOptions {
  focus?: boolean;
}

type Callback = (options: SelectOptions) => void;

class TabSelection {
  selected: string | undefined;

  tabs: string[];

  subscriptions: Callback[];

  onChange: ((tabId: string) => void) | undefined;

  vertical: boolean;

  collapsible: boolean;

  constructor({
    defaultTab, vertical = false, collapsible = false, onChange,
  }: TabSelectionOptions = {}) {
    this.selected = defaultTab;
    this.tabs = [];
    this.subscriptions = [];
    this.onChange = onChange;
    this.vertical = vertical;
    this.collapsible = collapsible;
  }

  select(tabId: string, { focus = false }: SelectOptions = {}): void {
    if (!this.tabs.includes(tabId) || (!this.collapsible && this.isSelected(tabId))) {
      return;
    }

    if (this.isSelected(tabId)) {
      this.selected = undefined;
    } else {
      this.selected = tabId;
    }

    this.subscriptions.forEach((callback) => callback({ focus }));

    if (this.onChange) {
      this.onChange(tabId);
    }
  }

  selectPrevious(options?: SelectOptions): void {
    const prevIndex = this.tabs.indexOf(this.selected as string) - 1;

    this.select(this.tabs[prevIndex >= 0 ? prevIndex : this.tabs.length - 1], options);
  }

  selectNext(options?: SelectOptions): void {
    const nextIndex = (this.tabs.indexOf(this.selected as string) + 1) % this.tabs.length;

    this.select(this.tabs[nextIndex], options);
  }

  selectFirst(options?: SelectOptions): void {
    this.select(this.tabs[0], options);
  }

  selectLast(options?: SelectOptions): void {
    this.select(this.tabs[this.tabs.length - 1], options);
  }

  isSelected(tabId: string): boolean {
    return tabId === this.selected;
  }

  isVertical(): boolean {
    return this.vertical;
  }

  register(tabId: string): void {
    if (this.tabs.includes(tabId)) {
      return;
    }

    this.tabs.push(tabId);

    // set the first registered tab as select if no tab was assigned as default
    if (!this.selected) {
      this.select(tabId);
    }
  }

  unregister(tabId: string): void {
    this.tabs = this.tabs.filter((id) => id !== tabId);
  }

  subscribe(callback: Callback): void {
    this.subscriptions.push(callback);
  }

  unsubscribe(callback: Callback): void {
    this.subscriptions = this.subscriptions.filter((cb) => cb !== callback);
  }
}

export default TabSelection;
