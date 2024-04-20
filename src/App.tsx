import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "wouter";

import Login from "@/components/auth/login";
import SignUp from "@/components/auth/sign-up";
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

  const handleLogin = (username: string, password: string) => {
    try {
      AuthService.login(username, password);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
      }
    }
  };

  // Function to render private routes
  const PrivateRoute = ({
    component: Component,
    ...rest
  }: {
    component: React.ComponentType<unknown>;
    [x: string]: unknown;
  }) => {
    return (
      <Route {...rest}>
        {AuthService.isAuthenticated() ? (
          <Component />
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
        <Route path="/" component={() => <Redirect to="/notes/all" />} />

        {/* Auth Routes */}
        <Route path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/sign-up" component={SignUp} />

        {/* Private Routes */}
        <PrivateRoute path="/notes/all" component={NoteList} />
        <PrivateRoute path="/notes/new" component={NoteEditor} />
        <PrivateRoute path="/notes/:id" component={NoteDetail} />

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
