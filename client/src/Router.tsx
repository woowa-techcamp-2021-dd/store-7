import {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactElement,
} from "react";
import styled from "styled-components";

type RouterContextPropsType = {
  location: string;
};

type RouteType = {
  exact?: boolean;
  path: string;
  children: ReactElement<unknown>;
};

interface HistoryEvent extends Event {
  detail: {
    pathname: string;
  };
}

const DEFAULT_LOCATION = "/";

const RouterContext = createContext<RouterContextPropsType>({
  location: DEFAULT_LOCATION,
});

export const ETRouter = ({ children }): ReactElement => {
  const [location, setLocation] = useState(window.location.pathname);

  const setCurrentLocation = () => {
    setLocation(window.location.pathname);
  };

  const handlePushState = (e: HistoryEvent) => {
    const path = e.detail.pathname;

    window.history.pushState({}, "", path);
    setCurrentLocation();
  };

  const addEvents = () => {
    window.addEventListener("pushstate", handlePushState);
    window.addEventListener("popstate", setCurrentLocation);
  };

  useEffect(() => {
    addEvents();
  }, []);

  return (
    <RouterContext.Provider value={{ location }}>
      {children}
    </RouterContext.Provider>
  );
};

export const ETRoute = ({ exact, path, children }: RouteType) => {
  const { location } = useContext(RouterContext);

  const checkPath = (): boolean => {
    if (exact) {
      return path === location;
    } else {
      return location.match(path)?.index === 0;
    }
  };

  return checkPath() ? children : null;
};

export const ETLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactChild | React.ReactChild[];
}) => {
  const handleClickLink = () => {
    const routeEvent = new CustomEvent("pushstate", {
      detail: {
        pathname: to,
      },
    });

    window.dispatchEvent(routeEvent);
  };

  return <LinkWrapper onClick={handleClickLink}>{children}</LinkWrapper>;
};

const LinkWrapper = styled.a`
  cursor: pointer;
`;
