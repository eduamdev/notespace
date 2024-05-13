import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "wouter";

import Login from "@/components/auth/login";
import SignUp from "@/components/auth/signup";
import Dashboard from "@/components/dashboard";
import NoteList from "@/components/note/note-list";
import NoteEditor from "@/components/note/note-editor";
import NoteDetail from "@/components/note/note-detail";

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
    </>
  );
}

export default App;
