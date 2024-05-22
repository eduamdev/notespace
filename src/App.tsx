import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "wouter";

import { Toaster } from "@/components/ui/sonner";
import Login from "@/components/auth/login";
import SignUp from "@/components/auth/signup";
import Dashboard from "@/components/dashboard/dashboard-layout";
import NotebookList from "@/components/dashboard/notebook/notebook-list";
import NoteList from "@/components/dashboard/note/note-list";
import NoteEditor from "@/components/dashboard/note/note-editor";
import NoteDetail from "@/components/dashboard/note/note-detail";
import FavoriteList from "@/components/dashboard/favorites/favorite-list";
import TagList from "@/components/dashboard/tags/tag-list";

import { AuthProvider } from "@/contexts/auth-context";
import { EncryptionProvider } from "@/contexts/encryption-context";
import ProtectedRoute from "@/components/protected-route";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return (
    <AuthProvider>
      <EncryptionProvider>
        <>
          {isOnline ? null : (
            <div className="bg-yellow-100 py-1 text-center">
              No internet connection
            </div>
          )}
          <Switch>
            <Route path="/" component={() => <Redirect to="/notes" />} />

            {/* Auth Routes */}
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup" component={SignUp} />

            {/* Protected Routes */}
            <Route path="/notes">
              <ProtectedRoute>
                <Dashboard leftPanel={<NoteList />} />
              </ProtectedRoute>
            </Route>
            <Route path="/notes/new">
              <ProtectedRoute>
                <Dashboard
                  leftPanel={<NoteList />}
                  rightPanel={<NoteEditor />}
                />
              </ProtectedRoute>
            </Route>
            <Route path="/notes/:id">
              <ProtectedRoute>
                <Dashboard
                  leftPanel={<NoteList />}
                  rightPanel={<NoteDetail />}
                />
              </ProtectedRoute>
            </Route>
            <Route path="/notebooks">
              <ProtectedRoute>
                <Dashboard leftPanel={<NotebookList />} />
              </ProtectedRoute>
            </Route>
            <Route path="/favorites">
              <ProtectedRoute>
                <Dashboard leftPanel={<FavoriteList />} />
              </ProtectedRoute>
            </Route>
            <Route path="/tags">
              <ProtectedRoute>
                <Dashboard leftPanel={<TagList />} />
              </ProtectedRoute>
            </Route>

            {/* Default Route (404) */}
            <Route>
              {(params: { "*": string }) => (
                <center>
                  <b>404:</b> Sorry, this page{" "}
                  <code>&quot;/{params["*"]}&quot;</code> isn&apos;t ready yet!
                </center>
              )}
            </Route>
          </Switch>
          <Toaster richColors />
        </>
      </EncryptionProvider>
    </AuthProvider>
  );
}

export default App;
