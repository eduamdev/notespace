export interface User {
  id: string;
  username: string;
  password: string; // Encrypted password
  encryptionKey: string;
  salt: string;
}
