import { HTMLAttributes } from "react";
import { Button, ButtonProps } from "../ui/button";
import { ChevronRight } from "lucide-react";

export default function EventRegisterButton(props: ButtonProps & HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button {...props}>
      {props.children || (
        <>
          Register
          <ChevronRight />
        </>
      )}
    </Button>
  );
}
