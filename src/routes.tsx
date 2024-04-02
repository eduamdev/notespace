import { Route, Switch } from "wouter";
import HomePage from "@/pages/home";
import NewNotePage from "@/pages/new-note";
import NotePage from "@/pages/note";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={HomePage}></Route>

      <Route path="/note/new" component={NewNotePage}></Route>

      <Route path="/note/:id" component={NotePage}></Route>

      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  );
}

export default Routes;
