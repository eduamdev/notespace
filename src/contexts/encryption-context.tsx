import React, { createContext, useContext, useState } from "react";
import {
  generateEncryptionKey,
  encryptData,
  decryptData,
} from "@/services/encryption-service";

const EncryptionContext = createContext(null);

export const useEncryption = () => {
  return useContext(EncryptionContext);
};

export const EncryptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null);

  const initializeKeys = async (password: string) => {
    const { key } = await generateEncryptionKey(password);
    setEncryptionKey(key);
  };

  const encrypt = async (data: string): Promise<string> => {
    if (!encryptionKey) throw new Error("User key not initialized");
    return await encryptData(encryptionKey, data);
  };

  const decrypt = async (encryptedData: string): Promise<string> => {
    if (!encryptionKey) throw new Error("User key not initialized");
    return await decryptData(encryptionKey, encryptedData);
  };

  return (
    <EncryptionContext.Provider value={{ initializeKeys, encrypt, decrypt }}>
      {children}
    </EncryptionContext.Provider>
  );
};
