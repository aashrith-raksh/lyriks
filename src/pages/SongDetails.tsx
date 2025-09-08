import { useGetTrackDetailsByIdQuery } from "@/redux/services/shazamCore";
import { useParams } from "react-router-dom";
import Loader from "@/assets/loader.svg";
import SongDetailsHeader from "@/components/song-details/SongDetailsHeader";
import Lyrics from "@/components/song-details/Lyrics";


function SongDetails() {
  const { songId } = useParams();

  const { data, isFetching, isError } = useGetTrackDetailsByIdQuery({ songId });
  if (isFetching) {
    return <img src={Loader} width={130} />;
  }

  if (isError) {
    return <p>Error</p>;
  }


  return (
    <>
    <SongDetailsHeader data={data}/>
    <Lyrics data={data}/>
    </>
    
  );
}

export default SongDetails;
