export function clsx(...args) {
  return args
    .flatMap(arg => {
      if (!arg) return [];
      if (typeof arg === 'string') return [arg];
      if (typeof arg === 'object' && !Array.isArray(arg)) {
        return Object.entries(arg)
          .filter(([_, val]) => val)
          .map(([key]) => key);
      }
      if (Array.isArray(arg)) {
        return clsx(...arg); // recursive
      }
      return [];
    })
    .join(' ');
}
