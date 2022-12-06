import { Card, CardBody } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function NoContents({ children }: PropsWithChildren) {
  return (
    <Card w="full" textAlign="center">
      <CardBody>{children}</CardBody>
    </Card>
  );
}
