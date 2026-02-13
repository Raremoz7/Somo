import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import WebPage from "./components/WebPage";
import SocialPage from "./components/SocialPage";
import CrmPage from "./components/CrmPage";
import PortfolioPage from "./components/PortfolioPage";
import AboutPage from "./components/AboutPage";
import VideosPage from "./components/VideosPage";
import ContactPage from "./components/ContactPage";
import ServicesPage from "./components/ServicesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "servicos", Component: ServicesPage },
      { path: "web", Component: WebPage },
      { path: "social", Component: SocialPage },
      { path: "crm", Component: CrmPage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "sobre", Component: AboutPage },
      { path: "videos", Component: VideosPage },
      { path: "contato", Component: ContactPage },
    ],
  },
]);