/**
 * __mocks__/heroui-native/index.js
 *
 * Lightweight stub for heroui-native and all its subpaths (button, input, etc.).
 *
 * All `heroui-native/*` imports are mapped here via jest.config.js moduleNameMapper.
 * Components render as plain React Native primitives so business-logic assertions
 * work without ever touching Reanimated / Nitro native bindings.
 *
 * Add exports here as your tests reference new heroui-native components.
 */

'use strict';

const React = require('react');
const RN = require('react-native');

// ─── Generic passthrough factory ──────────────────────────────────────────────
/**
 * Returns a React component that renders as a plain View/TouchableOpacity
 * and forwards testID, onPress, children, and all other props.
 * String children are wrapped in a Text component (required by React Native
 * and needed so @testing-library/react-native's getByText can find them).
 */
function stub(displayName, Base = RN.View) {
  const Component = ({ children, onPress, testID, isDisabled, disabled, ...rest }) => {
    const isBtn = !!onPress;
    const wrappedChildren =
      typeof children === 'string'
        ? React.createElement(RN.Text, null, children)
        : children;

    if (isBtn) {
      return React.createElement(
        RN.TouchableOpacity,
        {
          testID,
          onPress: isDisabled || disabled ? undefined : onPress,
          disabled: isDisabled || disabled,
          accessibilityRole: 'button',
          ...rest,
        },
        wrappedChildren,
      );
    }
    return React.createElement(Base, { testID, ...rest }, wrappedChildren);
  };
  Component.displayName = displayName;
  return Component;
}

function inputStub(displayName) {
  const Component = ({ testID, label, error, ...rest }) =>
    React.createElement(
      RN.View,
      { testID: testID ?? label },
      label ? React.createElement(RN.Text, null, label) : null,
      React.createElement(RN.TextInput, { testID: testID ?? label, ...rest }),
      error ? React.createElement(RN.Text, { testID: `${testID ?? label}-error` }, error) : null,
    );
  Component.displayName = displayName;
  return Component;
}

// ─── Components ───────────────────────────────────────────────────────────────
const Button = stub('Button');
const IconButton = stub('IconButton');
const Input = inputStub('Input');
const Textarea = inputStub('Textarea');
const Text = ({ children, ...rest }) => React.createElement(RN.Text, rest, children);
const View = ({ children, ...rest }) => React.createElement(RN.View, rest, children);
const Badge = stub('Badge');
const Avatar = stub('Avatar');
const Image = (props) => React.createElement(RN.Image, props);
const Divider = () => React.createElement(RN.View, null);
const Spinner = () => React.createElement(RN.ActivityIndicator, null);
const Chip = stub('Chip');
const Card = stub('Card');
const CardBody = stub('CardBody');
const CardHeader = stub('CardHeader');
const CardFooter = stub('CardFooter');
const Modal = ({ children, isOpen }) =>
  isOpen ? React.createElement(RN.View, { testID: 'modal' }, children) : null;
const ModalContent = stub('ModalContent');
const ModalHeader = stub('ModalHeader');
const ModalBody = stub('ModalBody');
const ModalFooter = stub('ModalFooter');
const Select = inputStub('Select');
const Checkbox = ({ isSelected, onValueChange, label, ...rest }) =>
  React.createElement(
    RN.View,
    rest,
    React.createElement(RN.Switch, { value: !!isSelected, onValueChange }),
    label ? React.createElement(RN.Text, null, label) : null,
  );
const Switch = ({ isSelected, onValueChange, ...rest }) =>
  React.createElement(RN.Switch, { value: !!isSelected, onValueChange, ...rest });
const Accordion = stub('Accordion');
const AccordionItem = stub('AccordionItem');
const Tabs = stub('Tabs');
const Tab = stub('Tab');
const Tooltip = stub('Tooltip');
const Popover = stub('Popover');
const PopoverContent = stub('PopoverContent');
const PopoverTrigger = stub('PopoverTrigger');
const Progress = () => React.createElement(RN.View, null);
const Slider = () => React.createElement(RN.View, null);

// ─── Hooks ────────────────────────────────────────────────────────────────────
const useDisclosure = jest.fn(() => ({
  isOpen: false,
  onOpen: jest.fn(),
  onClose: jest.fn(),
  onOpenChange: jest.fn(),
}));
const useTheme = jest.fn(() => ({ colors: {}, spacing: {} }));

module.exports = {
  Button,
  IconButton,
  Input,
  Textarea,
  Text,
  View,
  Badge,
  Avatar,
  Image,
  Divider,
  Spinner,
  Chip,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  Checkbox,
  Switch,
  Accordion,
  AccordionItem,
  Tabs,
  Tab,
  Tooltip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  Slider,
  useDisclosure,
  useTheme,
};
