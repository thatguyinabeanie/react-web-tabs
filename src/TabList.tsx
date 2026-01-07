import { ReactNode } from 'react';
import TabListComponent from './TabListComponent';
import withTabSelection, { WithTabSelectionProps } from './withTabSelection';

interface TabListProps extends WithTabSelectionProps {
  children: ReactNode;
  className?: string;
}

function TabList({
  selection,
  children,
  className = '',
  ...props
}: TabListProps): ReactNode {
  const verticalOrientation = selection.isVertical();

  return (
    <TabListComponent
      {...props}
      verticalOrientation={verticalOrientation}
      className={className}
    >
      {children}
    </TabListComponent>
  );
}

export default withTabSelection(TabList);
