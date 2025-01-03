export const generateJson = (content: any, pretty?: boolean) => {
  if (pretty) {
    return JSON.stringify(content, null, 2);
  }

  return JSON.stringify(content);
};
