import { createContext, ReactNode } from "react";
import * as encryptionService from "@/services/encryption-service";

export interface EncryptionContextType {
  generateEncryptionKey: (
    password: string
  ) => Promise<{ key: string; salt: string }>;
  encryptData: (key: string, data: string) => Promise<string>;
  decryptData: (key: string, encryptedData: string) => Promise<string>;
}

export const EncryptionContext = createContext<
  EncryptionContextType | undefined
>(undefined);

export const EncryptionProvider = ({ children }: { children: ReactNode }) => {
  return (
    <EncryptionContext.Provider
      value={{
        generateEncryptionKey: encryptionService.generateEncryptionKey,
        encryptData: encryptionService.encryptData,
        decryptData: encryptionService.decryptData,
      }}
    >
      {children}
    </EncryptionContext.Provider>
  );
};
