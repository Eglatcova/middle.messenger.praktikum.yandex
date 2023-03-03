import { Login } from "../pages/login";
import { ProfileSettings } from "../pages/profileSettings";
import { PasswordSettings } from "../pages/passwordSettings";
import { Profile } from "../pages/profile";
import { Registration } from "../pages/registration";
import { Error404 } from "../pages/error404";
import { Error500 } from "../pages/error500";

const ROUTES = {
  login: Login,
  profileSettings: ProfileSettings,
  passwordSettings: PasswordSettings,
  profile: Profile,
  registration: Registration,
  error404: Error404,
  error500: Error500,
};

function goTo(route: keyof typeof ROUTES) {
  const root = document.querySelector("#app");

  if (root !== null) {
    root.innerHTML = "";
  }

  const PageComponent = ROUTES[route];
  const page = new PageComponent();

  root?.appendChild(page.element);
  page.dispatchComponentDidMount();
}

export { goTo };
