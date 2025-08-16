import { createBrowserRouter } from "react-router-dom";
import React from "react";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ListingDetails = React.lazy(() => import("./pages/ListingDetails"));
const SafetyProtocols = React.lazy(() => import("./pages/SafetyProtocols"));

const basename = import.meta.env.DEV ? undefined : "/";

export default createBrowserRouter(
  [
    { path: "/", element: <HomePage /> },
    { path: "/listings/:id", element: <ListingDetails /> },
    { path: "/safety-protocols", element: <SafetyProtocols /> },
    { path: "*", element: <div>Not found</div> },
  ],
  { basename }
);
