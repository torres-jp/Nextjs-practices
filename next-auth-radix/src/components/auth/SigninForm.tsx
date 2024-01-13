"use client";
import { Button, Flex, TextField, Text } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function SigninForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onsubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (!res?.ok) {
      console.log(res);
    }

    router.push("/dashboard");
  });

  return (
    <form onSubmit={onsubmit}>
      <Flex direction="column" gap="2">
        <label htmlFor="email">Email</label>
        <TextField.Root>
          <TextField.Slot>
            <EnvelopeClosedIcon height="16" width="16" />
          </TextField.Slot>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                message: "Email is required",
                value: true,
              },
            }}
            render={({ field }) => {
              return (
                <TextField.Input
                  type="email"
                  placeholder="email@example.com"
                  autoFocus
                  {...field}
                />
              );
            }}
          />
        </TextField.Root>
        {errors.email && <Text color="ruby">{errors.email.message}</Text>}

        <label htmlFor="password">Password</label>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon height="16" width="16" />
          </TextField.Slot>
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                message: "Password is required",
                value: true,
              },
              minLength: {
                message: "Password must be at least 6 characters",
                value: 6,
              },
            }}
            render={({ field }) => {
              return (
                <TextField.Input
                  type="password"
                  placeholder="*********"
                  {...field}
                />
              );
            }}
          />
        </TextField.Root>
        {errors.password && <Text color="ruby">{errors.password.message}</Text>}

        <Button type="submit" mt="4">
          Sign In
        </Button>
      </Flex>
    </form>
  );
}

export default SigninForm;
