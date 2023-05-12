export const mockVersionFile = { version: '1' };

export function loadVersionFile(): Promise<object> {
  return Promise.resolve(mockVersionFile);
}
