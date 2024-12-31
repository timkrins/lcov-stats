export const toJson = (content: any, pretty?: boolean) => {
  if (pretty) {
    return JSON.stringify(content, null, 2);
  }

  return JSON.stringify(content);
};
