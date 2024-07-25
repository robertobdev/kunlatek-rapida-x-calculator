import { Box } from "@chakra-ui/react";
import Image from "next/image";

export const Logo = () => {
  return (
    <Box padding="14">
      <Image width="200" alt="Logo da Kunlatek" src="./logo.png" />
    </Box>
  );
};