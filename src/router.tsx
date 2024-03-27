import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import AuthGuard from "./components/guards/AuthGuard";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import GuestGuard from "./components/guards/GuestGuard";
import UserLayout from "./components/layout/UserLayout";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <AuthGuard>
            <UserLayout />
          </AuthGuard>
        }
      >
        <Route index element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route
        path="/auth"
        element={
          <GuestGuard>
            <AuthPage />
          </GuestGuard>
        }
      />
    </>

    // i use the guestGuar as children so i use it as parent components
    // but the authGuard i use it as parent route
    // outlet mean the children as routs not components
  )
);

export default router;
