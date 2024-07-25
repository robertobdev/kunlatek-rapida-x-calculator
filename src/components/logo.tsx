import { prefix } from "@/utils/prefix";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

export const Logo = () => {
  return (
    <Box padding="14" className="flex justify-center">
      <Image width="200" height="200" alt="Logo da Kunlatek" src={`${prefix}/logo.png`} />
    </Box>
  );
};