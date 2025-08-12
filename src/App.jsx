import {useState} from "react";
import "./index.css";
import {OktaAuth} from "@okta/okta-auth-js";
import {LoginCallback, Security} from "@okta/okta-react";

import Profile from "./components/Profile";
import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./components/HomePage";

const oktaAuth = new OktaAuth({
  issuer: "https://integrator-4897564.okta.com/oauth2/default",
  clientId: "0oau36ni0kqUwfG8v697",
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "profile", "email", "offline_access"],
});

function App() {
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    window.location.replace(originalUri || "/");
  };

  return (
    <>
      <BrowserRouter>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/login/callback" element={<LoginCallback />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Security>
      </BrowserRouter>
    </>
  );
}

export default App;
