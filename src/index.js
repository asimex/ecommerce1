import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import routes from "./asimex/routes/asimex-routes";
import * as EnkindlComponentPages from "./asimex/components";
import EnkindlRoutesTable from "./asimex/pages/Enkindl";
import Webpages from "./asimex/pages/Webpages";

import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from "./pages";

import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";


window.localStorage.clear();

const pageComponents = {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
  Webpages,
  ...EnkindlComponentPages,
};

const getComponent = (name) => {
  // Try direct match
  if (pageComponents[name]) return pageComponents[name];
  // Try removing slashes and matching
  if (pageComponents[name.replace(/\//g, "")]) return pageComponents[name.replace(/\//g, "")];
  // Try last segment (e.g., "enkindl/components/pages/footer" -> "footer")
  const lastSegment = name.split("/").pop();
  if (pageComponents[lastSegment]) return pageComponents[lastSegment];
  // Try PascalCase last segment (Footer)
  const pascalCase = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  if (pageComponents[pascalCase]) return pageComponents[pascalCase];
  // Try lowercased last segment
  const lowerLast = lastSegment && lastSegment.toLowerCase();
  if (pageComponents[lowerLast]) return pageComponents[lowerLast];
  return PageNotFound;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <Routes>
          <Route path="/asimex" element={<EnkindlRoutesTable />} />
          <Route path="/webpages" element={<Webpages />} />
          {routes.map(({ path, name }) => {
            console.log("Route:", { path, name });
            return (
              <Route
                key={path}
                path={path}
                element={React.createElement(getComponent(name))}
              />
            );
          })}
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Provider>
    </ScrollToTop>
    <Toaster />
  </BrowserRouter>
);
