import { useIsLoggedIn, useRefreshSession } from "./hooks/auth";
import LoginPage from "./pages/Login";
import UserList from "./pages/UserList";

import "./App.css";

function App() {
  const { loading } = useRefreshSession();
  const isLoggedIn = useIsLoggedIn();

  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  return <div className="App">{isLoggedIn ? <UserList /> : <LoginPage />}</div>;
}

export default App;
