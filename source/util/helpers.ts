export function env(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined || value === null) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    //Todo: throw an error if the environment variable is not set and no default value is provided
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}
