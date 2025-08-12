import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { genres } from "@/assets/constants";
import { useAppDispatch } from "@/redux/hook";
import { setGenre, setSearchTerm } from "@/redux/features/songsFilterSlice";
import type { ChangeEvent } from "react";

const DiscoverPageHeader = () => {
  const dispatch = useAppDispatch();
  const handleGenreChange = (val: string) => {
    dispatch(setGenre(val));
  };
  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    dispatch(setSearchTerm(event.target.value.toLowerCase()));
  }

  return (
    <div className="flex gap-8">
      <Input
        className="border-none placeholder:opacity-70"
        placeholder="Search for a song"
        onChange={handleInputChange}
      />
      <Select onValueChange={handleGenreChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent>
          {genres.map((item) => (
            <SelectItem value={item.value}>{item.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DiscoverPageHeader;
