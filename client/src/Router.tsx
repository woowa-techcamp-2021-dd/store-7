import React, {
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

const DEFAULT_LOCATION = "/";

const RouterContext = createContext<RouterContextPropsType>({
  location: DEFAULT_LOCATION,
});

export const ETRouter = ({ children }) => {
  const [location, setLocation] = useState(window.location.pathname);
  const history = window.history;

  const handleLocation = () => {
    setLocation(window.location.pathname);
  };

  const addEvents = () => {
    window.addEventListener("pushstate", (e: any) => {
      const path = e.detail.pathname;

      history.pushState({}, "", path);
      handleLocation();
    });

    window.addEventListener("popstate", (e: any) => {});
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

  if (exact) {
    return path === location ? children : null;
  } else {
    return location.match(path) ? children : null;
  }
};

export const ETLink = ({ to, children }) => {
  const dispatchRouteEvent = () => {
    const routeEvent = new CustomEvent("pushstate", {
      detail: {
        pathname: to,
      },
    });

    window.dispatchEvent(routeEvent);
  };

  return <LinkATag onClick={dispatchRouteEvent}>{children}</LinkATag>;
};

const LinkATag = styled.a`
  cursor: pointer;
`;