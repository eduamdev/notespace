import { useEffect, useState } from "react";
import { decryptNote, encryptNote, generateKeyPair } from "@/services/crypto";
import { useParams } from "wouter";
import { v4 as uuidv4 } from "uuid";

function NotePage() {
  const params = useParams();
  console.log("noteId:", params.id);

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
      const dummyNote = {
        id: uuidv4(),
        title: "Test Note",
        content: "This is a test note.",
      };

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
    <div className="flex flex-col items-center">
      <div className="w-full max-w-none px-5 sm:max-w-[90%] sm:px-0">
        <h1 className="pt-6 text-2xl font-semibold">NoteGuard</h1>
        <div className="pt-12">
          <span>Note Page</span>
          <div>Encrypted note: {encryptedNote}</div>
          <div>Title: {decryptedNote?.title}</div>
          <div>Note: {decryptedNote?.content}</div>
        </div>
      </div>
    </div>
  );
}

export default NotePage;
