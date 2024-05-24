import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { EncryptionProvider } from "@/contexts/encryption-context";

import ProtectedRoute from "@/components/protected-route";
import Login from "@/components/auth/login";
import SignUp from "@/components/auth/signup";
import Dashboard from "@/components/dashboard/dashboard-layout";
import { NotesPage } from "@/pages/notes";
import { NewNotePage } from "@/pages/new-note";
import { NotebooksPage } from "@/pages/notebooks";
import { TagsPage } from "@/pages/tags";
import NoteList from "@/components/dashboard/note/note-list";
import NoteDetail from "@/components/dashboard/note/note-detail";
import FavoriteList from "@/components/dashboard/favorites/favorite-list";

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
                <NotesPage />
              </ProtectedRoute>
            </Route>
            <Route path="/notes/new">
              <ProtectedRoute>
                <NewNotePage />
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
                <NotebooksPage />
              </ProtectedRoute>
            </Route>
            <Route path="/favorites">
              <ProtectedRoute>
                <Dashboard leftPanel={<FavoriteList />} />
              </ProtectedRoute>
            </Route>
            <Route path="/tags">
              <ProtectedRoute>
                <TagsPage />
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
