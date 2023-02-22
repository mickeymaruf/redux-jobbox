import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import Main from "../layout/main/Main";
import AccountCreator from "../pages/register/AccountCreator";
import Home from "../pages/home/Home";
import JobDetails from "../pages/JobDetails";
import Jobs from "../pages/Jobs";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "../utils/PrivateRoute";
import AddJob from "../pages/employeeDashboard/AddJob";
import EmployerDashboard from "../pages/employeeDashboard/EmployerDashboard";
import CandidateDashboard from "../pages/candidateDashboard/CandidateDashboard";
import AppliedJobs from "../pages/candidateDashboard/AppliedJobs";
import PostedJobs from "../pages/employeeDashboard/PostedJobs";
import DashboardHomeRedirect from "../layout/dashboard/DashboardHomeRedirect";
import CandidatesDetails from "../pages/employeeDashboard/CandidatesDetails";
import Inbox from "../pages/employeeDashboard/Inbox";
import Chat from "../pages/employeeDashboard/Chat";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/job-details/:id",
        element: <JobDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/register",
        element: (
          <PrivateRoute>
            <AccountCreator />
          </PrivateRoute>
        ),
      },
      {
        path: "/register/:type",
        element: (
          <PrivateRoute>
            <AccountCreator />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardHomeRedirect />,
      },
      {
        path: "add-job",
        element: <AddJob />,
      },
      {
        path: "applied-job",
        element: <AppliedJobs />,
      },
      {
        path: "candidates-details/:jobId",
        element: <CandidatesDetails />,
      },
      {
        path: "posted-job",
        element: <PostedJobs />,
      },
      {
        path: "employer",
        element: <EmployerDashboard />,
      },
      {
        path: "candidate",
        element: <CandidateDashboard />,
      },

      {
        path: "inbox",
        element: <Inbox />,
      },
      {
        path: "inbox/:id",
        element: <Chat />,
      },

    ],
  },
]);

export default routes;
