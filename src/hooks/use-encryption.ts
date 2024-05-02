import { useEffect, useState } from "react";
import sodium from "libsodium-wrappers";

const useEncryption = () => {
  const [keyPair, setKeyPair] = useState<{
    publicKey: Uint8Array;
    privateKey: Uint8Array;
  } | null>(null);

  useEffect(() => {
    const generateKeyPair = async () => {
      console.log("running generateKeyPair fn");
      await sodium.ready;
      const keyPair = sodium.crypto_box_keypair();
      setKeyPair({
        publicKey: keyPair.publicKey,
        privateKey: keyPair.privateKey,
      });
      console.log(keyPair);
    };

    void generateKeyPair();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  const encrypt = (plainText: string, publicKey: Uint8Array) => {
    if (!keyPair) {
      throw new Error("Key pair not generated yet");
    }

    const nonce = sodium.randombytes_buf(sodium.crypto_box_NONCEBYTES);
    const cipherText = sodium.crypto_box_easy(
      plainText,
      nonce,
      publicKey,
      keyPair.privateKey
    );
    return { cipherText, nonce };
  };

  const decrypt = (
    cipherText: Uint8Array,
    nonce: Uint8Array,
    publicKey: Uint8Array
  ) => {
    if (!keyPair) {
      throw new Error("Key pair not generated yet");
    }

    const plainText = sodium.crypto_box_open_easy(
      cipherText,
      nonce,
      publicKey,
      keyPair.privateKey
    );
    return plainText;
  };

  return { encrypt, decrypt };
};

export default useEncryption;
