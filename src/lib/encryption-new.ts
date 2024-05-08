import sodium from "libsodium-wrappers-sumo";

export const initializeEncryption = async () => {
  await sodium.ready;
  console.log("Sodium initialized successfully");
};

// Generate a random key for database encryption
export function generateDatabaseKey(): Uint8Array {
  return sodium.randombytes_buf(sodium.crypto_secretbox_KEYBYTES);
}

// Encrypt data using a given key
export function encryptData(data: string, key: Uint8Array): string {
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const encryptedData = sodium.crypto_secretbox_easy(data, nonce, key);
  return sodium.to_base64(nonce) + sodium.to_base64(encryptedData);
}

// Decrypt data using a given key
export function decryptData(encryptedData: string, key: Uint8Array): string {
  const nonce = sodium.from_base64(
    encryptedData.slice(0, sodium.crypto_secretbox_NONCEBYTES * 4)
  );
  const ciphertext = sodium.from_base64(
    encryptedData.slice(sodium.crypto_secretbox_NONCEBYTES * 4)
  );
  const decryptedData = sodium.crypto_secretbox_open_easy(
    ciphertext,
    nonce,
    key
  );
  return decryptedData.toString();
}

// Generate a key from a user's password
export function generateUserKey(password: string): Uint8Array {
  console.log(sodium);
  console.log(
    sodium.crypto_pwhash_SALTBYTES,
    sodium.crypto_secretbox_KEYBYTES,
    password,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_ALG_DEFAULT
  );
  const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);
  console.log(salt);

  return sodium.crypto_pwhash(
    sodium.crypto_secretbox_KEYBYTES,
    password,
    salt,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_ALG_DEFAULT
  );
}

// Derive a key from the user's password and use it to encrypt/decrypt data
export function encryptWithUserKey(data: string, password: string): string {
  const key = generateUserKey(password);
  console.log({ "key: ": key });
  return encryptData(data, key);
}

export function decryptWithUserKey(
  encryptedData: string,
  password: string
): string {
  const key = generateUserKey(password);
  return decryptData(encryptedData, key);
}
