export const writeStringToStdout = async (stringContent: string) => {
  await new Promise<void>((resolve, reject) => {
    process.stdout.write(stringContent + '\n', (err) => {
      if (err) reject(err);

      resolve();
    });
  });
};
