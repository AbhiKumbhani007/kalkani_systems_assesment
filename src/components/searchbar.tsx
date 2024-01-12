import SearchIcon from "@mui/icons-material/Search";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface Props {
  handleSearch: (text: string) => void;
}

function SearchBar(props: Props) {
  const { handleSearch } = props;

  const [search, setSearch] = useState("");

  const previousSearchText = useRef("");

  const handleSearchTextChange = (value: string) => setSearch(value);

  useEffect(() => {
    let typingTimer: NodeJS.Timeout;

    if (previousSearchText.current !== search || handleSearch) {
      typingTimer = setTimeout(() => {
        handleSearch(search);
      }, 1000);
    }
    return () => clearTimeout(typingTimer);
  }, [search, handleSearch]);

  return (
    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
      <TextField
        placeholder="search anime"
        sx={{
          width: "100%",
          backgroundColor: "white",
        }}
        size="small"
        value={search}
        onChange={(e) => handleSearchTextChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="filled"
      />
    </FormControl>
  );
}

export default SearchBar;
