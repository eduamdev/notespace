import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "wouter";
import Layout from "@/components/layout/layout";

import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import NoteList from "@/components/note/note-list";
import NoteEditor from "@/components/note/note-editor";
import NoteDetail from "@/components/note/note-detail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // TODO: implement the token logic
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn based on token existence

    const handleOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  // Function to render private routes
  const PrivateRoute = ({
    component: Component,
    ...rest
  }: {
    component: React.ComponentType<any>;
    [x: string]: any;
  }) => (
    <Route {...rest}>
      {isLoggedIn ? <Component /> : <Redirect to="/login" />}
    </Route>
  );

  return (
    <Layout>
      {isOnline ? null : (
        <div className="text-center bg-yellow-300">No internet connection</div>
      )}
      <Switch>
        <Route path="/" component={() => <Redirect to="/notes/all" />} />

        {/* Auth Routes */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* Private Routes */}
        <PrivateRoute path="/notes/all" component={NoteList} />
        <PrivateRoute path="/notes/new" component={NoteEditor} />
        <PrivateRoute path="/notes/:id" component={NoteDetail} />

        {/* Default Route (404) */}
        <Route>
          {(params) => (
            <center>
              <b>404:</b> Sorry, this page{" "}
              <code>&quot;/{params["*"]}&quot;</code> isn&apos;t ready yet!
            </center>
          )}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
