export function fileFilter(filters: (string | RegExp)[]) {
  return (filename: string): boolean => {
    for (let index = 0; index < filters.length; index++) {
      const filter = filters[index];
      const matches = filename.match(filter);
      if (matches) {
        return true;
      }
    }
    return false;
  };
}
