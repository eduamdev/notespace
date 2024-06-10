import { useEffect } from "react";
import { Redirect, Route, Switch } from "wouter";
import { useLoadAuthFromStorage } from "@/hooks/use-auth-new";
import { Toaster } from "@/components/ui/sonner";

import ProtectedRoute from "@/components/protected-route";
import { LoginPage } from "@/pages/login";
import { SignupPage } from "@/pages/signup";
import { NotesPage } from "@/pages/notes";
import { NewNotePage } from "@/pages/new-note";
import { NotePage } from "@/pages/note";
import { NotebooksPage } from "@/pages/notebooks";
import { TagsPage } from "@/pages/tags";

function App() {
  // const [isOnline, setIsOnline] = useState(navigator.onLine);
  const loadAuthFromStorage = useLoadAuthFromStorage();

  // useEffect(() => {
  //   const handleOnlineStatus = () => {
  //     setIsOnline(navigator.onLine);
  //   };

  //   window.addEventListener("online", handleOnlineStatus);
  //   window.addEventListener("offline", handleOnlineStatus);

  //   return () => {
  //     window.removeEventListener("online", handleOnlineStatus);
  //     window.removeEventListener("offline", handleOnlineStatus);
  //   };
  // }, []);

  useEffect(() => {
    void loadAuthFromStorage();
  }, [loadAuthFromStorage]);

  return (
    <>
      {/* {isOnline ? null : (
              <div className="bg-yellow-100 py-1 text-center">
                No internet connection
              </div>
            )} */}
      <Switch>
        <Route path="/" component={() => <Redirect to="/notes" />} />

        {/* Auth Routes */}
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />

        {/* Protected Routes */}
        <ProtectedRoute path="/notes">
          <NotesPage />
        </ProtectedRoute>
        <ProtectedRoute path="/notes/new">
          <NewNotePage />
        </ProtectedRoute>
        <ProtectedRoute path="/notes/:id">
          <NotePage />
        </ProtectedRoute>
        <ProtectedRoute path="/notebooks">
          <NotebooksPage />
        </ProtectedRoute>
        <ProtectedRoute path="/favorites">
          <NotesPage />
        </ProtectedRoute>
        <ProtectedRoute path="/tags">
          <TagsPage />
        </ProtectedRoute>

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
  );
}

export default App;
