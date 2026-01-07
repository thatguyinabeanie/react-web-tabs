import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Tab, TabProvider, TabPanel, TabList,
} from '..';
import { KeyCode } from '../Tab';

test('<TabProvider /> should exist', () => {
  const { container } = render((
    <TabProvider><p>Foo</p></TabProvider>
  ));

  expect(container.firstChild).toBeInTheDocument();
});

test('<TabProvider /> should select correct tab by default', () => {
  render((
    <TabProvider defaultTab="second">
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  const firstTab = document.getElementById('first-tab');
  const firstPanel = document.getElementById('first');
  const secondTab = document.getElementById('second-tab');
  const secondPanel = document.getElementById('second');

  expect(firstTab).toHaveAttribute('aria-selected', 'false');
  expect(firstPanel).toHaveAttribute('aria-expanded', 'false');

  expect(secondTab).toHaveAttribute('aria-selected', 'true');
  expect(secondPanel).toHaveAttribute('aria-expanded', 'true');
});

test('<TabProvider /> should update to new tab on click', async () => {
  const user = userEvent.setup();

  render((
    <TabProvider defaultTab="second">
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  const firstTab = document.getElementById('first-tab');
  const firstPanel = document.getElementById('first');
  const secondTab = document.getElementById('second-tab');
  const secondPanel = document.getElementById('second');

  await user.click(firstTab!);

  expect(firstTab).toHaveAttribute('aria-selected', 'true');
  expect(firstPanel).toHaveAttribute('aria-expanded', 'true');

  expect(secondTab).toHaveAttribute('aria-selected', 'false');
  expect(secondPanel).toHaveAttribute('aria-expanded', 'false');
});

test('<TabProvider /> should not reset to default tab when parent updates', async () => {
  const user = userEvent.setup();

  /* eslint-disable react/no-unused-state */
  class TestComponent extends React.Component<Record<string, never>> {
    constructor(props: Record<string, never>) {
      super(props);
      this.state = {
        value: 'one',
      };
    }
    /* eslint-enable react/no-unused-state */

    render() {
      return (
        <TabProvider defaultTab="second">
          <div className="rwt__tabs">
            <TabList>
              <Tab tabFor="first"><span>Tab 1</span></Tab>
              <Tab tabFor="second"><span>Tab 2</span></Tab>
            </TabList>
            <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
            <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
          </div>
        </TabProvider>
      );
    }
  }
  const { rerender } = render((
    <TestComponent />
  ));

  const firstTab = document.getElementById('first-tab');
  const firstPanel = document.getElementById('first');
  const secondTab = document.getElementById('second-tab');
  const secondPanel = document.getElementById('second');

  expect(secondTab).toHaveAttribute('aria-selected', 'true');
  expect(secondPanel).toHaveAttribute('aria-expanded', 'true');

  await user.click(firstTab!);

  expect(firstTab).toHaveAttribute('aria-selected', 'true');
  expect(firstPanel).toHaveAttribute('aria-expanded', 'true');

  rerender(<TestComponent />);

  expect(firstTab).toHaveAttribute('aria-selected', 'true');
  expect(firstPanel).toHaveAttribute('aria-expanded', 'true');

  expect(secondTab).toHaveAttribute('aria-selected', 'false');
  expect(secondPanel).toHaveAttribute('aria-expanded', 'false');
});

test('<TabProvider /> should call onChange callback on selection', async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  render((
    <TabProvider defaultTab="second" onChange={onChange}>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  const firstTab = document.getElementById('first-tab');
  await user.click(firstTab!);

  expect(onChange).toHaveBeenCalledWith('first');
});

test('<TabProvider /> should select correct tab when default tab prop changes', () => {
  const onChange = jest.fn();

  const { rerender } = render((
    <TabProvider defaultTab="second" onChange={onChange}>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  const firstTab = document.getElementById('first-tab');
  const firstPanel = document.getElementById('first');
  const secondTab = document.getElementById('second-tab');
  const secondPanel = document.getElementById('second');

  expect(secondTab).toHaveAttribute('aria-selected', 'true');
  expect(secondPanel).toHaveAttribute('aria-expanded', 'true');

  rerender(
    <TabProvider defaultTab="first" onChange={onChange}>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>,
  );

  expect(firstTab).toHaveAttribute('aria-selected', 'true');
  expect(firstPanel).toHaveAttribute('aria-expanded', 'true');
  expect(secondTab).toHaveAttribute('aria-selected', 'false');
  expect(secondPanel).toHaveAttribute('aria-expanded', 'false');
});

test('<TabProvider /> should not change tab when props are unchanged', () => {
  const onChange = jest.fn();

  const { rerender } = render((
    <TabProvider defaultTab="second" onChange={onChange}>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  const secondTab = document.getElementById('second-tab');
  const secondPanel = document.getElementById('second');

  rerender(
    <TabProvider defaultTab="second" onChange={onChange}>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>,
  );

  expect(secondTab).toHaveAttribute('aria-selected', 'true');
  expect(secondPanel).toHaveAttribute('aria-expanded', 'true');
});

test('<TabProvider /> should not change selection when prop updates to currently selected', async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();

  const { rerender } = render((
    <TabProvider defaultTab="first" onChange={onChange}>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  const secondTab = document.getElementById('second-tab');
  const secondPanel = document.getElementById('second');

  await user.click(secondTab!);

  rerender(
    <TabProvider defaultTab="second" onChange={onChange}>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>,
  );

  expect(secondTab).toHaveAttribute('aria-selected', 'true');
  expect(secondPanel).toHaveAttribute('aria-expanded', 'true');
});

test('<TabProvider /> should shift tab using keyboard navigation', () => {
  render((
    <TabProvider defaultTab="second">
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  const firstTab = document.getElementById('first-tab');
  const secondTab = document.getElementById('second-tab');

  fireEvent.keyDown(secondTab!, { keyCode: KeyCode.LEFT_ARROW });
  expect(firstTab).toHaveAttribute('aria-selected', 'true');
});

test('<TabProvider /> should shift tab using keyboard navigation when vertical', () => {
  render((
    <TabProvider defaultTab="second" vertical>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  const firstTab = document.getElementById('first-tab');
  const secondTab = document.getElementById('second-tab');

  fireEvent.keyDown(secondTab!, { keyCode: KeyCode.UP_ARROW });
  expect(firstTab).toHaveAttribute('aria-selected', 'true');
});

test('<TabProvider /> should set correct aria properties on <TabList> when vertical', () => {
  render((
    <TabProvider defaultTab="second" vertical>
      <div className="rwt__tabs">
        <TabList>
          <Tab tabFor="first"><span>Tab 1</span></Tab>
          <Tab tabFor="second"><span>Tab 2</span></Tab>
        </TabList>
        <TabPanel tabId="first"><p>TabPanel 1</p></TabPanel>
        <TabPanel tabId="second"><p>TabPanel 2</p></TabPanel>
      </div>
    </TabProvider>
  ));

  const tabList = document.querySelector('.rwt__tablist');
  expect(tabList).toHaveAttribute('aria-orientation', 'vertical');
});
