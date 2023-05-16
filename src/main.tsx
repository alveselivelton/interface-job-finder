import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Home from "./routes/Home";
import Search from "./routes/Search";
import JobDetails from "./routes/JobDetails";
import Login from "./routes/Auth/Login";
import Register from "./routes/Auth/Register";
import Dashboard from "./routes/Dashboard";
import JobForm from "./routes/JobForm";
import Edit from "./routes/Edit";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/post/:userId",
        element: <JobForm />,
      },
      {
        path: "/edit/:id/:userId",
        element: <Edit />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
