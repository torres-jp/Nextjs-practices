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
import { useRouter, useParams } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useEffect } from "react";

function TaskNewPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    values: {
      title: "",
      description: "",
    },
  });

  const router = useRouter();
  const params = useParams() as { projectId: string };

  const onSubmit = handleSubmit(async (data) => {
    if (!params.projectId) {
      const res = await axios.post("/api/projects", data);
      if (res.status === 201) {
        router.push("/dashboard");
        router.refresh();
      }
    } else {
      const res = await axios.put(`/api/projects/${params.projectId}`, data);
      if (res.status === 200) {
        router.push("/dashboard");
        router.refresh();
      }
    }
  });

  const handleDelete = async (projectId: string) => {
    const res = await axios.delete(`/api/projects/${projectId}`);

    if (res.status === 200) {
      toast.success("Project deleted successfully");
    }

    router.push("/dashboard");
    router.refresh();
  };

  useEffect(() => {
    if (params.projectId) {
      axios.get(`/api/projects/${params.projectId}`).then((res) => {
        console.log(res);
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      });
    }
  }, []);

  return (
    <div>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-[calc(100vh-10rem)] w-full items-center">
          <Card className="w-full p-7">
            <form onSubmit={onSubmit} className="flex flex-col gap-y-2">
              <Heading>
                {params.projectId ? "Edit Project" : "New Project"}
              </Heading>
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
                {params.projectId ? "Edit Project" : "New Project"}
              </Button>
            </form>
            <div className="flex justify-end my-4">
              {params.projectId && (
                <Button
                  color="red"
                  onClick={() => handleDelete(params.projectId)}
                >
                  <TrashIcon />
                  Delete Project
                </Button>
              )}
            </div>
          </Card>
        </Flex>
      </Container>
    </div>
  );
}

export default TaskNewPage;
