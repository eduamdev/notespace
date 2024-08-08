import { useRef } from "react";
import { SearchIcon } from "@/components/icons/search-icon";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
}

const SearchInput = ({
  placeholder,
  value,
  onChange,
  ariaLabel,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      onClick={handleFocus}
      className="flex h-10 w-full items-center rounded-md border border-black/[0.12] bg-white px-3 shadow-sm shadow-black/[0.08] focus-within:ring-2 focus-within:ring-blue-600"
    >
      <SearchIcon
        className="size-4 shrink-0 text-neutral-600"
        aria-hidden="true"
      />
      <label htmlFor="search-input" className="sr-only">
        {ariaLabel ?? "Search"}
      </label>
      <input
        id="search-input"
        ref={inputRef}
        type="search"
        placeholder={placeholder ?? "Search..."}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="ml-2 w-full border-none outline-none placeholder:text-sm"
      />
    </div>
  );
};

export default SearchInput;
