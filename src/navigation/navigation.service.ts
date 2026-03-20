import { createNavigationContainerRef, CommonActions, StackActions, TabActions } from '@react-navigation/native';
import type { RootStackParamList, MainTabParamList } from './navigation.types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

function navigate<T extends keyof RootStackParamList>(
  ...args: RootStackParamList[T] extends undefined
    ? [screen: T]
    : [screen: T, params: RootStackParamList[T]]
) {
  if (navigationRef.isReady()) {
    // @ts-expect-error — spread args match overloads correctly at runtime
    navigationRef.navigate(...args);
  }
}

function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

function reset(screen: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screen }],
      }),
    );
  }
}

function replace(screen: keyof RootStackParamList) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(screen));
  }
}

/** Jump to a bottom tab without pushing a new screen onto the stack. */
function jumpToTab(tab: keyof MainTabParamList) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(TabActions.jumpTo(tab));
  }
}

export const NavigationService = { navigate, goBack, reset, replace, jumpToTab };
