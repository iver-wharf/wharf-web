import { SimpleChange, SimpleChanges } from '@angular/core';

type MarkFunctionProperties<Component> = {
  /* eslint-disable-next-line */
  [Key in keyof Component]: Component[Key] extends Function ? never : Key;
};

type ExcludeFunctionPropertyNames<T> = MarkFunctionProperties<T>[keyof T];

type ExcludeFunctions<T> = Pick<T, ExcludeFunctionPropertyNames<T>>;

/**
 * To be used instead of {@link https://angular.io/api/core/SimpleChanges SimpleChanges}
 * from '@angular/core' to get type-safe field mapping in
 * {@link https://angular.io/api/core/OnChanges#ngOnChanges OnChanges#ngOnChanges}.
 * It should even handle rename refactor operations.
 *
 * Originates from {@link https://netbasal.com/create-a-typed-version-of-simplechanges-in-angular-451f86593003
 * Create a Typed Version of SimpleChanges in Angular}
 * over at netbasal.com.
 *
 * @extends {SimpleChanges} SimpleChanges from '@angular/core', referenced in OnChanges#ngOnChanges.
 * @author Netanel Basal
 * @example
 * export class MyComponent implements OnChanges {
 *   someField: string;
 *
 *   ngOnChanges(changes: NgChanges<MyComponent>): void {
 *     if (changes.someField) { // you get autocompletion here
 *     } else if (changes['someField']) { // here as well
 *     }
 *   }
 * }
 */
export type NgChanges<Component, Props = ExcludeFunctions<Component>> = {
  [Key in keyof Props]: SimpleChange
};
