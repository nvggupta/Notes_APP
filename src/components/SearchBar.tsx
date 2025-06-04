import { Input } from "@/components/ui/input";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const SearchBar = ({ search, onSearchChange } : SearchBarProps) => {
  return (
    <Input
      className="shadow-md border-2 border-black transition-all duration-200 focus:ring-2 focus:ring-blue-400"
      placeholder="Search notes by title..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;