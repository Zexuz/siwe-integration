export const getEnvOrThrow = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
}

export const getEnvOrDefault = <T>(key: string, defaultValue: T): T => {
  const value = process.env[key];
  if (!value) {
    console.warn(`Missing environment variable ${key}, using default value ${defaultValue}`);
    return defaultValue;
  }
  return value as unknown as T;
}
