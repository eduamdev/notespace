import { Redirect, Route, Switch } from "wouter";

import { NotesPage } from "@/pages/notes";
import { CreateNotePage } from "@/pages/create-note";
import { NotePage } from "@/pages/note";
import { NotebooksPage } from "@/pages/notebooks";
import { NotebookPage } from "@/pages/notebook";
import { FavoriteNotesPage } from "@/pages/favorite-notes";
import { FavoriteNotePage } from "@/pages/favorite-note";
import { TagsPage } from "@/pages/tags";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={() => <Redirect to="/notes" />} />
        <Route path="/notes" component={NotesPage} />
        <Route path="/notes/:noteId/create" component={CreateNotePage} />
        <Route path="/notes/:noteId/edit" component={NotePage} />
        <Route path="/notebooks" component={NotebooksPage} />
        <Route path="/notebooks/:notebookId" component={NotebookPage} />
        <Route path="/favorites/notes" component={FavoriteNotesPage} />
        <Route
          path="/favorites/notes/:noteId/edit"
          component={FavoriteNotePage}
        />
        <Route path="/tags" component={TagsPage} />

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
