import { useReduxNavigation } from './navigation-hook';

// wrapping custom hook in component to place inside of app routes without errors
// more info - custom hook uses useNavigate. This can only be used inside of a router component. Therefore BrowserRouter must be defined prior to this hook

export const NavigationListener = () => {
  useReduxNavigation();
  return null;
};
