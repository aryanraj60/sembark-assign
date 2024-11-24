import ReactDOM from "react-dom/client";
import { router } from "./App";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import StateContext from "./context/StateContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StateContext>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={router} />
  </StateContext>
);
