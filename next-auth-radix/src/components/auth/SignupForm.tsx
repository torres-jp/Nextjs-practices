"use client";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useForm, Controller } from "react-hook-form";

function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="2">
        <label htmlFor="name">Username</label>
        <TextField.Root>
          <TextField.Slot>
            <PersonIcon height="16" width="16" />
          </TextField.Slot>
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Name is required",
              },
              minLength: {
                value: 6,
                message: "Name must be at least 6 characters",
              },
            }}
            render={({ field }) => {
              return (
                <TextField.Input
                  type="text"
                  placeholder="Write your username"
                  autoFocus
                  {...field}
                />
              );
            }}
          />
        </TextField.Root>
        {errors.name && <Text color="ruby">{errors.name.message}</Text>}

        <label htmlFor="email">Email</label>
        <TextField.Root>
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input type="email" placeholder="email@example.com" />
        </TextField.Root>

        <label htmlFor="password">Password</label>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Input type="password" placeholder="*********" />
        </TextField.Root>

        <Button type="submit" mt="4">
          Sign In
        </Button>
      </Flex>
    </form>
  );
}

export default SignupForm;
