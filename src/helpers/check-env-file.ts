import { existsSync } from 'fs';

export const getEnvFileName = (): string => {
  const defaultFile = `${process.cwd()}/.env`;
  if (!existsSync(defaultFile)) {
    console.warn(
      'Default environment .env not found default process env variables would be utilized',
    );
  }

  return defaultFile;
};
