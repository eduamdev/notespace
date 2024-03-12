import { useEffect, useState } from "react";
import { decryptNote, encryptNote, generateKeyPair } from "@/services/crypto";

function NotePage() {
  const [encryptedNote, setEncryptedNote] = useState<string>("");
  const [decryptedNote, setDecryptedNote] = useState<{
    title: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    const test = async () => {
      // Generate key pair
      const { publicKey, privateKey } = await generateKeyPair();
      console.log("Public Key:", publicKey);
      console.log("Private Key:", privateKey);

      // Dummy note
      const dummyNote = { title: "Test Note", content: "This is a test note." };

      // Encrypt the note
      const encrypted = await encryptNote(dummyNote, publicKey, privateKey);
      console.log("Encrypted Note:", encrypted);
      setEncryptedNote(JSON.stringify(encrypted));

      // Decrypt the note
      const decrypted = await decryptNote(encrypted, publicKey, privateKey);
      console.log("Decrypted Note:", decrypted);
      setDecryptedNote(decrypted);
    };

    void test();
  }, []);

  return (
    <div>
      <h1>Note Page</h1>
      <div>{encryptedNote}</div>
      <div>{decryptedNote?.title}</div>
      <div>{decryptedNote?.content}</div>
    </div>
  );
}

export default NotePage;
