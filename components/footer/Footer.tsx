import { Flex } from "@chakra-ui/react";
import Image from "next/image";

export function Footer() {
  return (
    <Flex
      as="footer"
      position="fixed"
      inset="auto 0 0 0"
      direction="column"
      alignItems="center"
      padding="4"
      boxShadow="lg"
      borderTop="1px"
      borderColor="gray.200"
      backgroundColor="white"
    >
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <span>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </Flex>
  );
}
