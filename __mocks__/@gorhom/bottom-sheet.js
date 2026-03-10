/**
 * __mocks__/@gorhom/bottom-sheet.js
 *
 * Stub for @gorhom/bottom-sheet — imported transitively by heroui-native.
 * Returns simple React Native components so tests can render without
 * needing Reanimated's native bindings.
 */

'use strict';

const React = require('react');
const { View, Text } = require('react-native');

const BottomSheet = ({ children }) => React.createElement(View, { testID: 'bottom-sheet' }, children);
const BottomSheetView = ({ children, style }) => React.createElement(View, { style }, children);
const BottomSheetScrollView = ({ children, style }) => React.createElement(View, { style }, children);
const BottomSheetFlatList = ({ data, renderItem, keyExtractor }) => {
  const items = (data ?? []).map((item, index) => {
    const element = renderItem({ item, index });
    return React.createElement(View, { key: keyExtractor ? keyExtractor(item, index) : index }, element);
  });
  return React.createElement(View, null, ...items);
};
const BottomSheetTextInput = (props) => React.createElement(require('react-native').TextInput, props);
const BottomSheetModal = ({ children }) => React.createElement(View, null, children);
const BottomSheetModalProvider = ({ children }) => React.createElement(View, null, children);
const BottomSheetBackdrop = () => null;
const BottomSheetHandle = () => null;

const useBottomSheet = jest.fn(() => ({
  expand: jest.fn(),
  collapse: jest.fn(),
  close: jest.fn(),
  snapToIndex: jest.fn(),
  snapToPosition: jest.fn(),
  forceClose: jest.fn(),
  animatedIndex: { value: -1 },
  animatedPosition: { value: 0 },
}));
const useBottomSheetModal = jest.fn(() => ({
  present: jest.fn(),
  dismiss: jest.fn(),
  dismissAll: jest.fn(),
}));
const useBottomSheetSpringConfigs = jest.fn(() => ({}));
const useBottomSheetTimingConfigs = jest.fn(() => ({}));
const useBottomSheetDynamicSnapPoints = jest.fn(() => ({
  animatedSnapPoints: { value: [] },
  animatedHandleHeight: { value: 0 },
  animatedContentHeight: { value: 0 },
  handleContentLayout: jest.fn(),
}));

module.exports = {
  default: BottomSheet,
  BottomSheet,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetFlatList,
  BottomSheetTextInput,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetHandle,
  useBottomSheet,
  useBottomSheetModal,
  useBottomSheetSpringConfigs,
  useBottomSheetTimingConfigs,
  useBottomSheetDynamicSnapPoints,
};
