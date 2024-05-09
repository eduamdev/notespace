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
  console.log(encryptedData);

  const nonce_and_ciphertext = sodium
    .to_base64(nonce)
    .concat(sodium.to_base64(encryptedData));
  console.log(nonce_and_ciphertext);
  return nonce_and_ciphertext;
}

// Decrypt data using a given key
export function decryptData(encryptedData: string, key: Uint8Array): string {
  const nonce_and_ciphertext = sodium.from_base64(encryptedData);
  console.log(nonce_and_ciphertext);

  if (
    nonce_and_ciphertext.length <
    sodium.crypto_secretbox_NONCEBYTES + sodium.crypto_secretbox_MACBYTES
  ) {
    throw new Error("Short message");
  }

  const nonce = nonce_and_ciphertext.slice(
      0,
      sodium.crypto_secretbox_NONCEBYTES
    ),
    ciphertext = nonce_and_ciphertext.slice(sodium.crypto_secretbox_NONCEBYTES);

  const decryptedData = sodium.crypto_secretbox_open_easy(
    ciphertext,
    nonce,
    key
  );
  return sodium.to_string(decryptedData);
}

function getUserKeyFromLocalStorage(): Uint8Array | null {
  const userKeyString = localStorage.getItem("userKey");
  return userKeyString ? sodium.from_base64(userKeyString) : null;
}

function generateUserKey(password: string): Uint8Array {
  const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);
  return sodium.crypto_pwhash(
    sodium.crypto_secretbox_KEYBYTES,
    password,
    salt,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_ALG_DEFAULT
  );
}

// Store the user key in local storage
function storeUserKeyInLocalStorage(userKey: Uint8Array) {
  localStorage.setItem("userKey", sodium.to_base64(userKey));
}

// Retrieve or generate the user key and store it in local storage
function getUserKey(password: string): Uint8Array {
  let userKey = getUserKeyFromLocalStorage();
  if (!userKey) {
    userKey = generateUserKey(password);
    storeUserKeyInLocalStorage(userKey);
  }
  return userKey;
}

// Derive a key from the user's password and use it to encrypt/decrypt data
export function encryptWithUserKey(data: string, password: string): string {
  const userKey = getUserKey(password);
  console.log(userKey);

  return encryptData(data, userKey);
}

export function decryptWithUserKey(
  encryptedData: string,
  password: string
): string {
  const userKey = getUserKey(password);
  console.log(userKey);

  return decryptData(encryptedData, userKey);
}
