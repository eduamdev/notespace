import { Route, Switch } from "wouter";
import Layout from "@/components/layout/layout";

import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import NoteList from "@/components/note/note-list";
import NoteEditor from "@/components/note/note-editor";
import NoteDetail from "@/components/note/note-detail";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/">
          {/* Home Page */}
          <div>
            <h1 className="py-3 text-xl font-semibold">Home</h1>
          </div>
        </Route>

        {/* Auth Routes */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* Note Routes */}
        <Route path="/notes/all" component={NoteList} />
        <Route path="/notes/new" component={NoteEditor} />
        <Route path="/notes/:id" component={NoteDetail} />

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
