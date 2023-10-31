import * as crypto from 'crypto';

export const generateMD5Hash = async (password: string) => {
  const hash = crypto.createHash('md5').update(password).digest('hex');
  return hash;
};
