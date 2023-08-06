/* eslint-disable operator-linebreak */
import { Router } from "./src/services";
import { Login } from "./src/pages/login";
import { ProfileSettings } from "./src/pages/profileSettings";
import { PasswordSettings } from "./src/pages/passwordSettings";
import { Profile } from "./src/pages/profile";
import { Registration } from "./src/pages/registration";
import { Error404 } from "./src/pages/error404";
import { Error500 } from "./src/pages/error500";
import { Messenger } from "./src/pages/messenger";
import { Navigation } from "./src/pages/navigation";
import { Routes } from "./src/constants";
import { authController } from "./src/controllers";

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(Routes.LOGIN, Login)
    .use(Routes.PROFILE_SETTIGS, ProfileSettings)
    .use(Routes.PASSWORD_SETTINGS, PasswordSettings)
    .use(Routes.PROFILE, Profile)
    .use(Routes.REGISTRATION, Registration)
    .use(Routes.ERROR_404, Error404)
    .use(Routes.ERROR_500, Error500)
    .use(Routes.MESSENGER, Messenger)
    .use(Routes.NAVIGATION, Navigation);

  let isProtectedRoute = true;

  if (
    window.location.pathname === Routes.NAVIGATION ||
    window.location.pathname === Routes.LOGIN ||
    window.location.pathname === Routes.REGISTRATION
  ) {
    isProtectedRoute = false;
  }

  try {
    await authController.fetchUser();
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.PROFILE);
    }
  } catch (e) {
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.LOGIN);
    }
  }
});
