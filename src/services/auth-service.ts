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

const USERS_STORE = "users";
const SESSION_STORE = "session";

const getCurrentUser = async (): Promise<User | null> => {
  await initDB();
  const session = await getItem<Session>(SESSION_STORE, "current");
  if (!session) return null;

  const user = await getItem<User>(USERS_STORE, session.userId);
  return user ?? null;
};

const login = async (username: string, password: string): Promise<User> => {
  await initDB();
  const users = await getAllItems<User>(USERS_STORE);
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
  await addItem(SESSION_STORE, session);

  return user;
};

const logout = async (): Promise<void> => {
  console.log("log out...");
  await initDB();
  await deleteItem(SESSION_STORE, "current");
};

const register = async (username: string, password: string): Promise<void> => {
  console.log("registering user...");
  await initDB();
  const users = await getAllItems<User>(USERS_STORE);

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

  await addItem(USERS_STORE, newUser);
};

export { getCurrentUser, login, logout, register };
