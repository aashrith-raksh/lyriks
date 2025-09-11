import type { TrackDetailsResponse } from "@/redux/services/types/get-track-details-response";

export type LyricsArgs = {
  data?: TrackDetailsResponse;
};


const Lyrics = ({ data }: LyricsArgs) => {
  const lyrics =
    Object.values(data?.resources.lyrics || {})[0]?.attributes?.text || [];

  const formattedLyrics = lyrics.length > 0 ? formatLyrics(lyrics) : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Lyrics</h1>
      <ol>
        {formattedLyrics.map((line: string) => (
          <li>
            <pre className="text-foreground/70 font-normal">{line}</pre>
          </li>
        ))}
      </ol>
    </div>
  );
};

function formatLyrics(lyrics: string[]) {
  let para: string[] = [];
  const formatedLyrics: string[] = [];

  lyrics.forEach((line) => {
    if (line == "") {
      formatedLyrics.push(para.join("\n"));
      para = [];
    }

    para.push(line);
  });

  return formatedLyrics;
}

export default Lyrics;
