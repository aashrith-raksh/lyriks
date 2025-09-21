import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/pages/RootLayout";
import Discover from "@/pages/Discover";
import TopArtists from "@/pages/TopArtists";
import AroundYou from "@/pages/AroundYou";
import ArtistDetails from "./pages/ArtistDetails";
import SongDetails from "@/pages/SongDetails";
import Search from "@/pages/Search";
import HomeLayout from "@/layouts/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          { index: true, element: <Discover /> },
          { path: "songs/:songId", element: <SongDetails /> },
          { path: "artists/:id", element: <ArtistDetails /> },
          { path: "around-you", element: <AroundYou /> },
          { path: "top-artists", element: <TopArtists /> },
          { path: "search/:searchTerm", element: <Search /> },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
