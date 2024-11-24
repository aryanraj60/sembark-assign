import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./components";

import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Product/Product";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export { router };
