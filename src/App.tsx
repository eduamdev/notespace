import { Redirect, Route, Switch } from "wouter";

import { NotesPage } from "@/pages/notes";
import { CreateNotePage } from "@/pages/create-note";
import { EditNotePage } from "@/pages/edit-note";
import { NotebooksPage } from "@/pages/notebooks";
import { NotebookPage } from "@/pages/notebook";
import { CreateNotebookNotePage } from "@/pages/create-notebook-note";
import { EditNotebookNotePage } from "@/pages/edit-notebook-note";
import { FavoriteNotesPage } from "@/pages/favorite-notes";
import { EditFavoriteNotePage } from "@/pages/edit-favorite-note";
import { TagsPage } from "@/pages/tags";
import { TagPage } from "@/pages/tag";
import { CreateTagNotePage } from "@/pages/create-tag-note";
import { EditTagNotePage } from "@/pages/edit-tag-note";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={() => <Redirect to="/notes" />} />
        <Route path="/notes" component={NotesPage} />
        <Route path="/notes/:noteId/create" component={CreateNotePage} />
        <Route path="/notes/:noteId/edit" component={EditNotePage} />
        <Route path="/notebooks" component={NotebooksPage} />
        <Route path="/notebooks/:notebookId" component={NotebookPage} />
        <Route
          path="/notebooks/:notebookId/notes/:noteId/create"
          component={CreateNotebookNotePage}
        />
        <Route
          path="/notebooks/:notebookId/notes/:noteId/edit"
          component={EditNotebookNotePage}
        />
        <Route path="/favorites/notes" component={FavoriteNotesPage} />
        <Route
          path="/favorites/notes/:noteId/edit"
          component={EditFavoriteNotePage}
        />
        <Route path="/tags" component={TagsPage} />
        <Route path="/tags/:tagId" component={TagPage} />
        <Route
          path="/tags/:tagId/notes/:noteId/create"
          component={CreateTagNotePage}
        />
        <Route
          path="/tags/:tagId/notes/:noteId/edit"
          component={EditTagNotePage}
        />

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
