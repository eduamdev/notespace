import { Route, Switch } from "wouter";
import Layout from "@/components/layout/layout";

import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import NoteList from "@/components/note/note-list";
import NoteEditor from "@/components/note/note-editor";
import CreateNoteForm from "@/components/note/create-note-form";

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
        <Route path="/notes/new" component={CreateNoteForm} />
        <Route path="/notes/:id" component={NoteEditor} />

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
