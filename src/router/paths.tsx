import { RouteObject } from "react-router-dom";

import SignUp from "../pages/SignUp";
import Todo from "../pages/Todo";

const paths: RouteObject[] = [
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
];

export default paths;
