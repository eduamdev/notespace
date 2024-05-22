import React, { createContext, useState, useEffect } from "react";
import { encryptData, decryptData } from "@/services/encryption-service";
import { useAuth } from "@/hooks/use-auth";

export interface EncryptionContextType {
  encryptionKey: string | null;
  encrypt: (data: string) => Promise<string>;
  decrypt: (encryptedData: string) => Promise<string>;
}

export const EncryptionContext = createContext<
  EncryptionContextType | undefined
>(undefined);

export const EncryptionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchEncryptionKey = () => {
      if (user) {
        setEncryptionKey(user.encryptionKey);
      } else {
        setEncryptionKey(null);
      }
    };

    fetchEncryptionKey();
  }, [user]);

  const encrypt = async (data: string): Promise<string> => {
    if (!encryptionKey) {
      throw new Error("No encryption key available");
    }
    return await encryptData(encryptionKey, data);
  };

  const decrypt = async (encryptedData: string): Promise<string> => {
    if (!encryptionKey) {
      throw new Error("No encryption key available");
    }
    return await decryptData(encryptionKey, encryptedData);
  };

  return (
    <EncryptionContext.Provider value={{ encryptionKey, encrypt, decrypt }}>
      {children}
    </EncryptionContext.Provider>
  );
};
