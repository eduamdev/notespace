import sodium from "libsodium-wrappers-sumo";

export const generateEncryptionKey = async (password: string) => {
  console.log("generating encryption key...");
  await sodium.ready;
  const salt = sodium.randombytes_buf(sodium.crypto_pwhash_SALTBYTES);
  const key = sodium.crypto_pwhash(
    sodium.crypto_secretbox_KEYBYTES,
    password,
    salt,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_ALG_DEFAULT
  );
  return {
    key: sodium.to_base64(key, sodium.base64_variants.ORIGINAL),
    salt: sodium.to_base64(salt, sodium.base64_variants.ORIGINAL),
  };
};

export const encryptData = async (
  key: string,
  data: string
): Promise<string> => {
  console.log("encrypting data...");
  await sodium.ready;
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const keyBytes = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
  const ciphertext = sodium.crypto_secretbox_easy(data, nonce, keyBytes);
  return sodium.to_base64(nonce).concat(sodium.to_base64(ciphertext));
};

export const decryptData = async (
  key: string,
  encryptedData: string
): Promise<string> => {
  console.log("decrypting data...");
  await sodium.ready;

  const keyBytes = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
  const nonce_and_ciphertext = sodium.from_base64(encryptedData);

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

  const decrypted = sodium.crypto_secretbox_open_easy(
    ciphertext,
    nonce,
    keyBytes
  );
  return sodium.to_string(decrypted);
};
