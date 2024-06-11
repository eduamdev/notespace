import {
  initDB,
  addItem,
  getItem,
  getAllItems,
  deleteItem,
} from "@/services/idb-service";
import {
  encryptData,
  decryptData,
  generateEncryptionKey,
} from "@/services/encryption-service";
import { Session } from "@/models/session";
import { User } from "@/models/user";
import { STORE_NAMES } from "@/lib/constants";

export const register = async (username: string, password: string) => {
  console.log("registering user...");
  await initDB();
  const users = await getAllItems<User>(STORE_NAMES.USERS);
  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    throw new Error("User already exists");
  }

  const { key: encryptionKey, salt } = await generateEncryptionKey(password);
  const encryptedPassword = await encryptData(encryptionKey, password);

  const newUser: User = {
    id: Date.now().toString(),
    username,
    password: encryptedPassword,
    encryptionKey,
    salt,
  };

  await addItem(STORE_NAMES.USERS, newUser);
  return newUser;
};

export const login = async (
  username: string,
  password: string
): Promise<User> => {
  await initDB();
  const users = await getAllItems<User>(STORE_NAMES.USERS);
  const user = users.find((user) => user.username === username);

  if (!user) {
    throw new Error("User not found");
  }

  const decryptedPassword = await decryptData(
    user.encryptionKey,
    user.password
  );
  if (decryptedPassword !== password) {
    throw new Error("Incorrect password");
  }

  const session = { id: "current", userId: user.id };
  await addItem(STORE_NAMES.SESSION, session);

  return user;
};

export const logout = async (): Promise<void> => {
  console.log("log out...");
  await initDB();
  await deleteItem(STORE_NAMES.SESSION, "current");
};

export const getCurrentUser = async () => {
  await initDB();
  const session = await getItem<Session>(STORE_NAMES.SESSION, "current");
  if (!session) return null;

  const user = await getItem<User>(STORE_NAMES.USERS, session.userId);
  return user ?? null;
};
