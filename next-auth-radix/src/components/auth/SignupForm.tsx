"use client";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("/api/auth/register", data);
    console.log(res);
    if (res.status === 201) {
      const result = await signIn("credentials", {
        redirect: false,
        email: res.data.email,
        password: data.password,
      });

      if (!result?.ok) {
        console.log(result?.error);
        return;
      }
      router.push("/dashboard");
    }
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
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                message: "Email is required",
                value: true,
              },
              minLength: {
                message: "Email must be at least 6 characters",
                value: 6,
              },
            }}
            render={({ field }) => {
              return (
                <TextField.Input
                  type="email"
                  placeholder="email@example.com"
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

export default SignupForm;
