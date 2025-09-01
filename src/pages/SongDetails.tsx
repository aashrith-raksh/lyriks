import { useGetTrackDetailsByIdQuery } from "@/redux/services/shazamCore";
import { useParams } from "react-router-dom";
import Loader from "@/assets/loader.svg";
import SongDetailsHeader from "@/components/song-details/SongDetailsHeader";


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
    </>
    
  );
}

export default SongDetails;
