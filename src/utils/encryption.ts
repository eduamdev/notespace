import _sodium from "libsodium-wrappers";

export const initializeEncryption = async () => {
  await _sodium.ready;
  console.log("Sodium initialized successfully");
};

export const encrypt = (message: string, key: Uint8Array): Uint8Array => {
  console.log(key);

  return _sodium.crypto_secretbox_easy(
    _sodium.from_string(message),
    _sodium.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES),
    _sodium.crypto_secretbox_keygen()
  );
};

export const decrypt = (ciphertext: Uint8Array, key: Uint8Array): string => {
  const decrypted = _sodium.crypto_secretbox_open_easy(
    ciphertext,
    _sodium.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES),
    key
  );
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!decrypted) {
    throw new Error("Decryption failed");
  }
  return _sodium.to_string(decrypted);
};
