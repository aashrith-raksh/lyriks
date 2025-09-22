import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import RootLayout from "@/pages/RootLayout";
import HomeLayout from "@/layouts/HomeLayout";

// 🔹 Lazy load route-level pages
const Discover = lazy(() => import("@/pages/Discover"));
const TopArtists = lazy(() => import("@/pages/TopArtists"));
const AroundYou = lazy(() => import("@/pages/AroundYou"));
const ArtistDetails = lazy(() => import("@/pages/ArtistDetails"));
const SongDetails = lazy(() => import("@/pages/SongDetails"));

// 🔹 Fallback loader while chunks are downloading
function Loader() {
  return <div className="p-4 text-center">Loading…</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <Discover />
              </Suspense>
            ),
          },
          {
            path: "songs/:songId",
            element: (
              <Suspense fallback={<Loader />}>
                <SongDetails />
              </Suspense>
            ),
          },
          {
            path: "artists/:id",
            element: (
              <Suspense fallback={<Loader />}>
                <ArtistDetails />
              </Suspense>
            ),
          },
          {
            path: "around-you",
            element: (
              <Suspense fallback={<Loader />}>
                <AroundYou />
              </Suspense>
            ),
          },
          {
            path: "top-artists",
            element: (
              <Suspense fallback={<Loader />}>
                <TopArtists />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
