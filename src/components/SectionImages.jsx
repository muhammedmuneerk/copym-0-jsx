import { Box } from "@mui/material";

const SectionImage = ({ src, alt }) => {
  return (
    <Box className="w-full py-8">
      <Box className="flex justify-center">
        <img
          src={src}
          alt={alt}
          className="w-[90%] max-w-xl opacity-80 transition duration-500 hover:opacity-100"
        />
      </Box>
    </Box>
  );
};

export default SectionImage;
