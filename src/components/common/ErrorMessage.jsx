import React from "react";
import { Callout } from "@radix-ui/themes";
import { GoInfo } from "react-icons/go";

function ErrorMessage({ message = "An unexpected error occurred" }) {
  return (
    <Callout.Root color="red" variant="surface">
      <Callout.Icon>
        <GoInfo />
      </Callout.Icon>
      <Callout.Text>{message}</Callout.Text>
    </Callout.Root>
  );
}

export default ErrorMessage;
