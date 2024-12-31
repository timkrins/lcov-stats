export function fileFilter(filters: (string | RegExp)[]) {
  return (filename: string): boolean => {
    for (let index = 0; index < filters.length; index++) {
      const element = filters[index];
      const matches = filename.match(element);
      if (matches) {
        return true;
      }
    }
    return false;
  };
}
