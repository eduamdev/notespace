import _sodium from "libsodium-wrappers";

// Initialize libsodium
const initializeSodium = async () => {
  await _sodium.ready;
};

// Generate key pair for a new user
export const generateKeyPair = async (): Promise<{
  publicKey: string;
  privateKey: string;
}> => {
  await initializeSodium();

  const { publicKey, privateKey } = _sodium.crypto_box_keypair();
  const publicKeyBase64 = _sodium.to_base64(
    publicKey,
    _sodium.base64_variants.ORIGINAL
  );
  const privateKeyBase64 = _sodium.to_base64(
    privateKey,
    _sodium.base64_variants.ORIGINAL
  );
  return { publicKey: publicKeyBase64, privateKey: privateKeyBase64 };
};

// Encrypt a note before storing it
export const encryptNote = async (
  note: { title: string; content: string },
  recipientPublicKey: string,
  senderPrivateKey: string
): Promise<{ title: string; content: string; nonce: string }> => {
  await initializeSodium();
  const nonce = _sodium.randombytes_buf(_sodium.crypto_box_NONCEBYTES);
  const message = _sodium.from_string(JSON.stringify(note));
  const encryptedContent = _sodium.crypto_box_easy(
    message,
    nonce,
    _sodium.from_base64(recipientPublicKey, _sodium.base64_variants.ORIGINAL),
    _sodium.from_base64(senderPrivateKey, _sodium.base64_variants.ORIGINAL)
  );

  const nonceBase64 = _sodium.to_base64(
    nonce,
    _sodium.base64_variants.ORIGINAL
  );
  const encryptedContentBase64 = _sodium.to_base64(
    encryptedContent,
    _sodium.base64_variants.ORIGINAL
  );
  return {
    title: note.title,
    content: encryptedContentBase64,
    nonce: nonceBase64,
  };
};

// Decrypt a note after retrieving it
export const decryptNote = async (
  encryptedNote: { title: string; content: string; nonce: string },
  senderPublicKey: string,
  recipientPrivateKey: string
): Promise<{ title: string; content: string }> => {
  await initializeSodium();
  const nonce = _sodium.from_base64(
    encryptedNote.nonce,
    _sodium.base64_variants.ORIGINAL
  );
  const encryptedContent = _sodium.from_base64(
    encryptedNote.content,
    _sodium.base64_variants.ORIGINAL
  );
  const decryptedContent = _sodium.crypto_box_open_easy(
    encryptedContent,
    nonce,
    _sodium.from_base64(senderPublicKey, _sodium.base64_variants.ORIGINAL),
    _sodium.from_base64(recipientPrivateKey, _sodium.base64_variants.ORIGINAL)
  );

  const decryptedNote = JSON.parse(_sodium.to_string(decryptedContent)) as {
    content: string;
  };
  return {
    title: encryptedNote.title,
    content: decryptedNote.content,
  };
};
