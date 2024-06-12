import "@fontsource-variable/public-sans/wght.css";
import "@fontsource-variable/public-sans/wght-italic.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { EncryptionProvider } from "@/contexts/encryption-context";
import App from "@/App";
import "@/styles/globals.css";
// import { initializeEncryption } from "@/lib/encryption-new";

// void initializeEncryption().then(() => {
//   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//   ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// });

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <EncryptionProvider>
        <App />
        <ReactQueryDevtools />
      </EncryptionProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
