import {
  initDB,
  addItem,
  getItem,
  getAllItems,
  deleteItem,
} from "@/services/storage-service";
import {
  encryptData,
  decryptData,
  generateEncryptionKey,
} from "@/services/encryption-service";
import { Session } from "@/models/session";
import { User } from "@/models/user";
import { STORE_NAMES } from "@/lib/constants";

const getCurrentUser = async (): Promise<User | null> => {
  await initDB();
  const session = await getItem<Session>(STORE_NAMES.SESSION, "current");
  if (!session) return null;

  const user = await getItem<User>(STORE_NAMES.USERS, session.userId);
  return user ?? null;
};

const login = async (username: string, password: string): Promise<User> => {
  await initDB();
  const users = await getAllItems<User>(STORE_NAMES.USERS);
  const user = users.find((user: User) => user.username === username);

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

  const session: Session = { id: "current", userId: user.id };
  await addItem(STORE_NAMES.SESSION, session);

  return user;
};

const logout = async (): Promise<void> => {
  console.log("log out...");
  await initDB();
  await deleteItem(STORE_NAMES.SESSION, "current");
};

const register = async (username: string, password: string): Promise<void> => {
  console.log("registering user...");
  await initDB();
  const users = await getAllItems<User>(STORE_NAMES.USERS);

  if (users.find((user: User) => user.username === username)) {
    throw new Error("User already exists");
  }

  const userId = Date.now().toString();
  console.log("password", password);
  const { key: encryptionKey, salt } = await generateEncryptionKey(password);
  console.log("key", encryptionKey);
  console.log("salt", salt);
  const encryptedPassword = await encryptData(encryptionKey, password);
  console.log("encrypted password", encryptedPassword);

  const newUser: User = {
    id: userId,
    username,
    password: encryptedPassword,
    encryptionKey,
    salt,
  };

  console.log(newUser);

  await addItem(STORE_NAMES.USERS, newUser);
};

export { getCurrentUser, login, logout, register };
