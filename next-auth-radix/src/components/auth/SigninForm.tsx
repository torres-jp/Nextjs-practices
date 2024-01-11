"use client";
import { Button, Flex, TextField, TextFieldInput } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";

function SigninForm() {
  return (
    <Flex>
      <label htmlFor="email">Email</label>
      <TextField.Root>
        <TextField.Slot>
          <EnvelopeClosedIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          type="email"
          placeholder="email@example.com"
          autoFocus
        />
      </TextField.Root>

      <TextField.Root>
        <TextField.Slot>
          <LockClosedIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input type="password" placeholder="*********" />
      </TextField.Root>

      <Button>Sign In</Button>
    </Flex>
  );
}

export default SigninForm;
