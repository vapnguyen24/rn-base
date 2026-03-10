/**
 * __mocks__/react-native-reanimated.js
 *
 * Self-contained Reanimated mock — no imports from the real Reanimated source.
 * Covers the public API surface used by this project and its dependencies
 * (heroui-native, @gorhom/bottom-sheet, react-native-gesture-handler).
 *
 * Why not use react-native-reanimated/mock?
 *   The built-in mock.js requires src/mock.ts which imports the full Reanimated
 *   source chain. That chain instantiates react-native-worklets native Turbo
 *   Modules at import time → crash in Jest's Node environment.
 */

'use strict';

const React = require('react');

// ─── Animated components ──────────────────────────────────────────────────────
const createAnimatedComponent = (Component) => Component;

const Animated = {
  View: 'View',
  Text: 'Text',
  Image: 'Image',
  ScrollView: 'ScrollView',
  FlatList: 'FlatList',
  createAnimatedComponent,
};

// ─── Shared values ────────────────────────────────────────────────────────────
const useSharedValue = (init) => ({ value: init });
const useDerivedValue = (fn) => ({ value: fn() });
const useAnimatedStyle = () => ({});
const useAnimatedScrollHandler = () => ({});
const useAnimatedRef = () => ({ current: null });
const useAnimatedReaction = jest.fn();
const useScrollViewOffset = () => ({ value: 0 });
const useAnimatedKeyboard = () => ({ height: { value: 0 }, state: { value: 0 } });

// ─── Animation builders ───────────────────────────────────────────────────────
const withTiming = (toValue, _config, callback) => {
  if (callback) callback(true);
  return toValue;
};
const withSpring = (toValue, _config, callback) => {
  if (callback) callback(true);
  return toValue;
};
const withDecay = (_config, callback) => {
  if (callback) callback(true);
  return 0;
};
const withDelay = (_delay, animation) => animation;
const withRepeat = (animation) => animation;
const withSequence = (...animations) => animations[animations.length - 1];
const cancelAnimation = jest.fn();
const stopAnimation = jest.fn();

// ─── Run on helpers ───────────────────────────────────────────────────────────
const runOnUI = (fn) => (...args) => fn(...args);
const runOnJS = (fn) => (...args) => fn(...args);
const executeOnUIRuntimeSync = (fn) => (...args) => fn(...args);

// ─── Interpolation ────────────────────────────────────────────────────────────
const interpolate = (value, input, output) => {
  if (value <= input[0]) return output[0];
  if (value >= input[input.length - 1]) return output[output.length - 1];
  const index = input.findIndex((v, i) => i < input.length - 1 && value >= v && value <= input[i + 1]);
  if (index === -1) return output[0];
  const t = (value - input[index]) / (input[index + 1] - input[index]);
  return output[index] + t * (output[index + 1] - output[index]);
};
const interpolateColor = (_value, _input, _output) => 'rgba(0,0,0,0)';

const Extrapolation = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' };
const ExtrapolationType = Extrapolation;

// ─── Easing ───────────────────────────────────────────────────────────────────
const Easing = {
  linear: (t) => t,
  ease: (t) => t,
  quad: (t) => t,
  cubic: (t) => t,
  poly: () => (t) => t,
  sin: (t) => t,
  circle: (t) => t,
  exp: (t) => t,
  elastic: () => (t) => t,
  back: () => (t) => t,
  bounce: (t) => t,
  bezier: () => (t) => t,
  bezierFn: () => (t) => t,
  in: (fn) => fn,
  out: (fn) => fn,
  inOut: (fn) => fn,
};

// ─── Gestures ─────────────────────────────────────────────────────────────────
const useAnimatedGestureHandler = () => ({});

// ─── Layout animations ────────────────────────────────────────────────────────
const FadeIn = { duration: jest.fn().mockReturnThis(), delay: jest.fn().mockReturnThis() };
const FadeOut = { duration: jest.fn().mockReturnThis(), delay: jest.fn().mockReturnThis() };
const FadeInUp = FadeIn;
const FadeInDown = FadeIn;
const FadeOutUp = FadeOut;
const FadeOutDown = FadeOut;
const SlideInRight = FadeIn;
const SlideOutRight = FadeOut;
const Layout = { duration: jest.fn().mockReturnThis(), springify: jest.fn().mockReturnThis() };
const ZoomIn = FadeIn;
const ZoomOut = FadeOut;

// ─── Misc ─────────────────────────────────────────────────────────────────────
const measure = jest.fn(() => ({ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }));
const scrollTo = jest.fn();
const setNativeProps = jest.fn();
const getRelativeCoords = jest.fn();
const isReanimated2 = true;
const enableLayoutAnimations = jest.fn();

module.exports = {
  // Default export for CJS
  default: Animated,
  // Named exports
  Animated,
  createAnimatedComponent,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedReaction,
  useScrollViewOffset,
  useAnimatedKeyboard,
  useAnimatedGestureHandler,
  withTiming,
  withSpring,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  cancelAnimation,
  stopAnimation,
  runOnUI,
  runOnJS,
  executeOnUIRuntimeSync,
  interpolate,
  interpolateColor,
  Extrapolation,
  ExtrapolationType,
  Easing,
  FadeIn, FadeOut, FadeInUp, FadeInDown, FadeOutUp, FadeOutDown,
  SlideInRight, SlideOutRight,
  Layout,
  ZoomIn, ZoomOut,
  measure,
  scrollTo,
  setNativeProps,
  getRelativeCoords,
  isReanimated2,
  enableLayoutAnimations,
  // SharedValue constructor (used by type checks)
  makeShareable: (v) => v,
  makeShareableCloneRecursive: (v) => v,
};
