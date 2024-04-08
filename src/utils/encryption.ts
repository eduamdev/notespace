import sodium from "libsodium-wrappers";

export const initializeEncryption = async () => {
  await sodium.ready;
  console.log("Sodium initialized successfully");
};

export const encrypt = (message: string, key: Uint8Array): Uint8Array => {
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);

  return new Uint8Array(
    Array.from(nonce).concat(
      Array.from(sodium.crypto_secretbox_easy(message, nonce, key))
    )
  );
};

export const decrypt = (
  nonce_and_ciphertext: Uint8Array,
  key: Uint8Array
): string => {
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
  const decrypted = sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);

  return sodium.to_string(decrypted);
};

export const getEncryptionKey = () => {
  const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY;

  if (!encryptionKey) {
    throw new Error(
      "Encryption key not found. Please set ENCRYPTION_KEY environment variable."
    );
  }

  // Decode the Base64 string into binary data
  const binaryString = atob(encryptionKey);

  // Create a Uint8Array from the binary data
  const key = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    key[i] = binaryString.charCodeAt(i);
  }

  return key;
};
