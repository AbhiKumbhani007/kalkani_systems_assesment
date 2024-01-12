import FavoriteIcon from "@mui/icons-material/Favorite";
import StartIcon from "@mui/icons-material/Start";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { CharacterData } from "../interface";
import { formatNumber } from "../utils/helperFunc";

function CharacterCard({ character }: { character: CharacterData }) {
  const handleContinueClick = () => window.open(character.url, "_blank");

  return (
    <Box
      sx={{
        border: "1px solid gray",
      }}
      className="flex w-full bg-gray-200 rounded-xl justify-between hover:shadow-2xl  duration-500 ease-in-out transition-all min-h-[130px] select-none"
    >
      <Box className="flex items-start justify-start px-4 py-5 w-full">
        <Avatar
          alt={character.name}
          src={character.images.webp.image_url}
          sx={{
            width: 64,
            height: 64,
            borderRadius: "5px",
            border: "2px solid gray",
          }}
        />
        <Box className="flex flex-col items-start justify-center px-5 gap-4 w-full">
          <Box className="flex w-full justify-between items-center">
            <p className="text-2xl font-semibold">{character.name}</p>
            <Box className="text-lg font-semibold flex items-center justify-center gap-2">
              <FavoriteIcon
                sx={{
                  color: "red",
                  "&:hover": {
                    fontSize: "30px",
                    transition: "font-size 0.2s ease-in-out",
                  },
                }}
              />
              <p className="w-10">{formatNumber(character.favorites)}</p>
            </Box>
          </Box>
          <Box className="flex gap-3">
            {character.nicknames.map((nickname: string) => (
              <Typography className="text-lg border-2 border-gray-600 px-2 py-1 rounded-md bg-slate-300 text-slate-800 hover:bg-emerald-400 hover:text-white duration-200 ease-in-out transition-all cursor-pointer select-none">
                {nickname}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        className="flex items-center justify-center border-l-2 px-4 py-5 bg-blue-500 rounded-r-lg cursor-pointer hover:bg-blue-800 duration-500 ease-in-out transition-all"
        onClick={handleContinueClick}
      >
        <IconButton
          className="hover:bg-inherit"
          size="large"
          sx={{
            "&:hover": {
              backgroundColor: "inherit",
              transition: "background-color 0s ease",
            },
          }}
        >
          <StartIcon
            sx={{
              color: "white",
              fontSize: 40,
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CharacterCard;
