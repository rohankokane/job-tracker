export const callAll =
  <Args extends readonly unknown[]>(
    ...fns: readonly ((...args: Args) => void | undefined)[]
  ) =>
  (...args: Args): void =>
    fns.forEach((fn) => fn?.(...args))
