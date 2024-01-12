/* eslint-disable */
import { Box, Button, LinearProgress } from "@mui/material";
import "./App.css";
import SearchBar from "./components/searchbar";
import { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { formatNumber, generateQueryString } from "./utils/helperFunc";
import { RootState, useAppDispatch } from "./redux/store";
import { getCharactersData } from "./redux/slices/charactersSlice";
import { useSelector } from "react-redux";
import CharacterCard from "./components/characterCard";
import { CharacterData, Pagination } from "./interface";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

function App() {
  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState("");

  const dispatch = useAppDispatch();

  const handlePage = (page: number) => setPage(page);

  const handleSearch = (text: string) => setSearchText(text);

  const charactersData: CharacterData[] = useSelector(
    (state: RootState) => state.characters.characterData
  );

  const paginationData: Pagination = useSelector(
    (state: RootState) => state.characters.pagination
  );

  const charactersLoading = useSelector(
    (state: RootState) => state.characters.loading
  );

  useEffect(() => {
    const query = generateQueryString({
      page: page,
      limit: 15,
      q: searchText,
    });

    dispatch(getCharactersData(query));
  }, [page, searchText]);

  return (
    <Box className="flex flex-col w-full h-screen relative">
      {charactersLoading && (
        <LinearProgress className="absolute top-0 w-full" color="primary" />
      )}

      <Box
        className="fixed bottom-16 right-10 bg-blue-600 rounded-full cursor-pointer text-white h-10 w-10 flex items-center justify-center"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <KeyboardDoubleArrowUpIcon
          sx={{
            color: "white",
            fontSize: "25px",
          }}
        />
      </Box>
      <div className="flex flex-col w-full items-center text-4xl">
        <Box
          className="flex justify-center items-center flex-col px-24 py-10"
          sx={{
            width: "100%",
            backgroundImage: "url(./anime.jpg)",
            opacity: 0.8,
            backgroundSize: "cover",
          }}
        >
          <p className="font-bold text-white">Search Anime Characters</p>
          <Box className="flex w-1/2 pt-5">
            <SearchBar handleSearch={handleSearch} />
          </Box>
          <p className="text-xl font-semibold py-5 text-zinc-50">
            Total {formatNumber(paginationData?.items?.total)} matching anime
            characters found
          </p>
        </Box>
        <Box className="flex flex-col w-full items-center justify-center gap-5 px-24 py-10">
          {charactersData.map((data: any, index: number) => (
            <CharacterCard key={index} character={data} />
          ))}
        </Box>
        {paginationData.items?.count > 0 ? (
          <Box className="flex gap-5 w-full justify-center items-center pb-10">
            <Button
              variant="contained"
              color="primary"
              className={`${page !== 1 ? "bg-blue-600 hover:bg-blue-800" : ""}`}
              startIcon={<KeyboardArrowLeftIcon />}
              onClick={() => {
                handlePage(page - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page === 1}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-600 hover:bg-blue-800"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={() => {
                handlePage(page + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={!paginationData.has_next_page}
            >
              Next
            </Button>
          </Box>
        ) : (
          <p className="text-slate-700">No Results Found</p>
        )}
      </div>
    </Box>
  );
}

export default App;
