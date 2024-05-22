import { useContext } from "react";
import {
  EncryptionContext,
  EncryptionContextType,
} from "@/contexts/encryption-context";

export const useEncryption = (): EncryptionContextType => {
  const context = useContext(EncryptionContext);
  if (!context) {
    throw new Error("useEncryption must be used within an EncryptionProvider");
  }
  return context;
};
