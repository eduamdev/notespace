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

import { AuthService } from "@/services/auth-service";

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

  const PrivateRoute = ({
    component: Component,
    children,
    ...rest
  }: {
    component?: React.ComponentType<unknown>;
    children?: React.ReactNode;
    [x: string]: unknown;
  }) => {
    return (
      <Route {...rest}>
        {AuthService.isAuthenticated() ? (
          Component ? (
            <Component />
          ) : (
            children
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
    );
  };

  return (
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

        {/* Private Routes */}
        <PrivateRoute path="/notes">
          <Dashboard leftPanel={<NoteList />} />
        </PrivateRoute>
        <PrivateRoute path="/notes/new">
          <Dashboard leftPanel={<NoteList />} rightPanel={<NoteEditor />} />
        </PrivateRoute>
        <PrivateRoute path="/notes/:id">
          <Dashboard leftPanel={<NoteList />} rightPanel={<NoteDetail />} />
        </PrivateRoute>

        <PrivateRoute path="/notebooks">
          <Dashboard leftPanel={<NotebookList />} />
        </PrivateRoute>

        <PrivateRoute path="/favorites">
          <Dashboard leftPanel={<FavoriteList />} />
        </PrivateRoute>

        <PrivateRoute path="/tags">
          <Dashboard leftPanel={<TagList />} />
        </PrivateRoute>

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
