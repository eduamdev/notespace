import { useEffect, useState } from "react";
import * as dbService from "@/services/idb-service";

export const useIDB = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeDB = async () => {
      await dbService.initDB();
      setIsInitialized(true);
    };
    void initializeDB();
  }, []);

  const createItem = async <T>(storeName: string, item: T) => {
    await dbService.createItem(storeName, item);
  };

  const getAllItems = async <T>(storeName: string): Promise<T[]> => {
    return await dbService.getAllItems(storeName);
  };

  const getItem = async <T>(
    storeName: string,
    key: string
  ): Promise<T | undefined> => {
    return await dbService.getItem(storeName, key);
  };

  const updateItem = async <T>(storeName: string, item: T) => {
    await dbService.updateItem(storeName, item);
  };

  const deleteItem = async (storeName: string, key: string) => {
    await dbService.deleteItem(storeName, key);
  };

  return {
    isInitialized,
    createItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItem,
  };
};
