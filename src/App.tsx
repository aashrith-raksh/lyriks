import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/pages/RootLayout";
import HomeLayout from "@/layouts/HomeLayout";

// Eager load homepage (Discover)
import Discover from "@/pages/Discover";
import Loading from "./components/Loading";

// Lazy load the rest
const TopArtists = lazy(() => import("@/pages/TopArtists"));
const AroundYou = lazy(() => import("@/pages/AroundYou"));
const ArtistDetails = lazy(() => import("@/pages/ArtistDetails"));
const SongDetails = lazy(() => import("@/pages/SongDetails"));
const Search = lazy(() => import("@/pages/Search"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          { index: true, element: <Discover /> }, // eager
          { path: "songs/:songId", element: <SongDetails /> }, // lazy
          { path: "artists/:id", element: <ArtistDetails /> }, // lazy
          { path: "around-you", element: <AroundYou /> }, // lazy
          { path: "top-artists", element: <TopArtists /> }, // lazy
          { path: "search/:searchTerm", element: <Search /> }, // lazy
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
