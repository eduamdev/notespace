import React, { createContext, useContext, useState, useEffect } from "react";
import { encryptData, decryptData } from "@/services/encryption-service";
import { useAuth } from "@/contexts/auth-context";

interface EncryptionContextType {
  encryptionKey: string | null;
  encrypt: (data: string) => Promise<string>;
  decrypt: (encryptedData: string) => Promise<string>;
}

const EncryptionContext = createContext<EncryptionContextType | undefined>(
  undefined
);

export const useEncryption = (): EncryptionContextType => {
  const context = useContext(EncryptionContext);
  if (!context) {
    throw new Error("useEncryption must be used within an EncryptionProvider");
  }
  return context;
};

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
