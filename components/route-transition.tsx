import { ViewTransition, type ReactElement, type ReactNode } from 'react';

type RouteTransitionProps = Readonly<{
  children: ReactNode;
  transitionKey: string;
}>;

/** Maps typed Next.js navigations to directional page transitions. */
export function RouteTransition({ children, transitionKey }: RouteTransitionProps): ReactElement {
  return (
    <ViewTransition
      key={transitionKey}
      enter={{ 'topic-forward': 'route-forward', 'topic-swap': 'route-swap', 'nav-back': 'route-back', default: 'route-enter' }}
      exit={{ 'topic-forward': 'route-forward', 'topic-swap': 'route-swap', 'nav-back': 'route-back', default: 'route-enter' }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
