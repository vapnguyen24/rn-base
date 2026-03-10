import en from "@core/i18n/locales/en";

/** Represents a value that can be `T` or `null`. */
export type Nullable<T> = T | null;

/** Represents a value that can be `T` or `undefined`. */
export type Optional<T> = T | undefined;

/**
 * A single option item used in dropdowns, radio groups, and similar selectors.
 * @template T - The type of the option value. Defaults to `string`.
 */
export interface SelectOption<T = string> {
  /** Human-readable label displayed to the user. */
  label: string;
  /** The underlying value submitted or stored when this option is selected. */
  value: T;
}

/**
 * A labelled group of `SelectOption` items, used for grouped dropdowns.
 * @template T - The type of the option value. Defaults to `string`.
 */
export interface GroupedSelectOption<T = string> {
  /** Label for the option group. */
  label: string;
  /** List of options belonging to this group. */
  options: SelectOption<T>[];
}

/** A generic identifier that can be either a string or a number. */
export type ID = string | number;

/** A UUID represented as a plain string. */
export type UUID = string;

/**
 * A plain key-value map where every key is a `string`.
 * @template T - The type of the values.
 */
export type Dictionary<T> = Record<string, T>;

/**
 * A strongly-typed key-value map with a constrained key type.
 * @template K - The key type, must be `string` or `number`.
 * @template V - The value type.
 */
export type KeyValue<K extends string | number, V> = Record<K, V>;

/**
 * Represents the lifecycle state of an asynchronous operation.
 * - `idle`    – not yet started
 * - `loading` – in progress
 * - `success` – completed successfully
 * - `error`   – completed with an error
 */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * An array guaranteed to have at least one element.
 * @template T - The element type.
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Removes `readonly` from all properties of `T`, making them mutable.
 * @template T - The source type.
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

/**
 * Makes the specified keys of `T` required while keeping the rest unchanged.
 * @template T - The source type.
 * @template K - The keys to make required.
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * A synchronous function that returns `T`.
 * @template T - The return type. Defaults to `void`.
 */
export type Fn<T = void> = () => T;

/**
 * An asynchronous function that resolves to `T`.
 * @template T - The resolved type. Defaults to `void`.
 */
export type AsyncFn<T = void> = () => Promise<T>;


/**
 * Recursively converts all properties of `T` to `string`. Useful for typing translation objects where all values are strings.
 * @template T - The source type.
 */
export type DeepString<T> = { [K in keyof T]: T[K] extends object ? DeepString<T[K]> : string };

/**
 * The shape of the translation object used in i18n. It is derived from the English locale, but all values are typed as `string` to reflect that translations will also be strings.
 * This allows us to use translation keys (e.g., 'auth.welcomeBack') in our code with proper type safety, while ensuring that the actual values can be any string.
 */
export type Translations = DeepString<typeof en>;