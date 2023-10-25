import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboard from "../components/admin/adminDashboard";
import DashboardContent from "../components/admin/dashboardContent";
import ManagePodcasts from "../components/admin/managePodcasts";
import ManageUsers from "../components/admin/manageusers";
import Login from "../components/authentication/login";
import Signup from "../components/authentication/signup";
import LandingPage from "../components/common/landingPage";
import PodcastForm from "../components/podcast/podcastForm";
import UserForm from "../components/user/userForm";
import { useEffect, useState } from "react";
import SelectedPodcastContext from "../components/podcast/selectedPodcastContext";
import PodcastPlayer from "../components/podcast/podcastPlayer";
import NavbarComponent from "../components/common/navbar";

const routes = [
  {
    path: "/",
    component: LandingPage,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/admin/dashboard/*",
    component: AdminDashboard,
    children: [
      {
        path: "",
        component: DashboardContent,
        exact: true,
      },
      {
        path: "content",
        component: DashboardContent,
      },
      {
        path: "users",
        component: ManageUsers,
        children: [
          {
            path: "action",
            component: UserForm,
          },
        ],
      },
      {
        path: "podcasts",
        component: ManagePodcasts,
        children: [
          {
            path: "action",
            component: PodcastForm,
          },
        ],
      },
    ],
  },
];

const RoutesMap = () => {
  const [scrolled, setScrolled] = useState(false);

  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(true);


    const handleClosePlayer = () => {
        setIsPlayerOpen(false);
    };

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          element={<route.component />}
          exact={route.exact}
        >
          {route.children &&
            route.children.map((childRoute, index) => {
              return (
                <Route
                  key={index}
                  path={childRoute.path}
                  element={<childRoute.component />}
                />
              );
            })}
        </Route>
      );
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY >= 100;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <SelectedPodcastContext.Provider
        value={{ selectedPodcast, setSelectedPodcast }}
      >
        {selectedPodcast && isPlayerOpen && (<PodcastPlayer podcast={selectedPodcast} onClose={handleClosePlayer} />)}
        <NavbarComponent
          bg={scrolled ? "dark" : "transparent"}
          variant={scrolled ? "dark" : "light"}
        />
        <Routes>{renderRoutes(routes)}</Routes>
      </SelectedPodcastContext.Provider>
    </Router>
  );
};

export default RoutesMap;
