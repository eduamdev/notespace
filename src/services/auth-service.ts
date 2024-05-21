// import { navigate } from "wouter/use-browser-location";
// import { encryptWithUserKey, decryptWithUserKey } from "@/lib/encryption-new";

// // Simulated token generation
// const generateToken = () => "blablablabla";

// export const AuthService = {
//   signup: (username: string, password: string, confirmPassword: string) => {
//     // Basic validation
//     if (!username || !password || password !== confirmPassword) {
//       throw new Error("Please fill in all fields correctly");
//     }

//     // Here you would handle user registration, for demonstration, let's assume we store user data in localStorage
//     const encryptedPassword = encryptWithUserKey(password, confirmPassword);
//     localStorage.setItem("username", username);
//     localStorage.setItem("password", encryptedPassword);

//     // Registration successful, redirect to login page
//     navigate("/login");
//   },
//   login: (username: string, password: string) => {
//     // Simulated login logic

//     // Here you would perform authentication, for demonstration, let's assume the user data is stored in localStorage
//     const storedUsername = localStorage.getItem("username");
//     const storedEncryptedPassword = localStorage.getItem("password");

//     if (!storedUsername || !storedEncryptedPassword) {
//       throw new Error("User not found");
//     }

//     const storedPassword = decryptWithUserKey(
//       storedEncryptedPassword,
//       password
//     );

//     if (username !== storedUsername || password !== storedPassword) {
//       throw new Error("Invalid username or password");
//     }

//     const token = generateToken();
//     // Authentication successful, redirect to dashboard
//     localStorage.setItem("token", token);
//     navigate("/notes");
//     return token;
//   },
//   logout: () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   },
//   isAuthenticated: () => {
//     return !!localStorage.getItem("token");
//   },
// };
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

const USERS_STORE = "users";
const SESSION_STORE = "session";

interface User {
  id: string;
  username: string;
  password: string; // Ideally, this should be a hashed password
  encryptionKey: string;
  salt: string;
}

const getCurrentUser = async () => {
  await initDB();
  const session = await getItem(SESSION_STORE, "current");
  if (!session) return null;

  const user = await getItem(USERS_STORE, session.userId);
  return user;
};

const login = async (username: string, password: string) => {
  await initDB();
  const users = await getAllItems(USERS_STORE);
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

  const session = { id: "current", userId: user.id };
  await addItem(SESSION_STORE, session);

  return user;
};

const logout = async () => {
  await initDB();
  await deleteItem(SESSION_STORE, "current");
};

const register = async (username: string, password: string) => {
  console.log("registering user...");
  await initDB();
  const users = await getAllItems(USERS_STORE);

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
