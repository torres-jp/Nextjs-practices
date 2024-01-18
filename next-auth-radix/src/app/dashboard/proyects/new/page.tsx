"use client";
import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

function TaskNewPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      title: "",
      description: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("/api/projects", data);
    console.log(res);
  });

  return (
    <div>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-screen w-full items-center">
          <Card className="w-full p-7">
            <form onSubmit={onSubmit} className="flex flex-col gap-y-2">
              <Heading>Create Project</Heading>
              <label>Project Title</label>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Title must be at least 6 characters",
                  },
                }}
                render={({ field }) => {
                  return (
                    <TextField.Input
                      size="3"
                      placeholder="search the docs .."
                      {...field}
                    />
                  );
                }}
              />
              {errors.title && <Text color="ruby">{errors.title.message}</Text>}

              <label>Project Description</label>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Desription is required",
                  },
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                }}
                render={({ field }) => {
                  return (
                    <TextArea
                      size="3"
                      placeholder="search the docs .."
                      {...field}
                    />
                  );
                }}
              />
              {errors.description && (
                <Text color="ruby">{errors.description.message}</Text>
              )}

              <Button type="submit" mt="2">
                Create Proyect
              </Button>
            </form>
          </Card>
        </Flex>
      </Container>
    </div>
  );
}

export default TaskNewPage;
