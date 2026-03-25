import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import WebPage from "./components/WebPage";
import SocialPage from "./components/SocialPage";
import CrmPage from "./components/CrmPage";
import TrafficPage from "./components/TrafficPage";
import PortfolioPage from "./components/PortfolioPage";
import AboutPage from "./components/AboutPage";
import VideosPage from "./components/VideosPage";
import ContactPage from "./components/ContactPage";
import ServicesPage from "./components/ServicesPage";
import ProjectDetailPage from "./components/ProjectDetailPage";
import BlogDetailPage from "./components/BlogDetailPage";
import BlogPage from "./components/BlogPage";
import MarqueiPage from "./components/MarqueiPage";
import AgenciaSystemPage from "./components/AgenciaSystemPage";
import MobileEcommercePage from "./components/MobileEcommercePage";
import AppAgendamentoPage from "./components/AppAgendamentoPage";
import SistemaGestaoPage from "./components/SistemaGestaoPage";
import AppEcommercePage from "./components/AppEcommercePage";
import PropostaPage from "./components/PropostaPage";

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
      { path: "trafego", Component: TrafficPage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "portfolio/:id", Component: ProjectDetailPage },
      { path: "sobre", Component: AboutPage },
      { path: "videos", Component: VideosPage },
      { path: "contato", Component: ContactPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:id", Component: BlogDetailPage },
      { path: "marquei", Component: MarqueiPage },
      { path: "sistema-gestao-agencias", Component: AgenciaSystemPage },
      { path: "mobile-ecommerce", Component: MobileEcommercePage },
      { path: "servico-app-agendamento", Component: AppAgendamentoPage },
      { path: "servico-sistema-gestao", Component: SistemaGestaoPage },
      { path: "servico-app-ecommerce", Component: AppEcommercePage },
    ],
  },
  {
    path: "/proposta",
    Component: PropostaPage,
  },
]);