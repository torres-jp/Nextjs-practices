"use client";
import { Button, Container, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

function DashboardPage() {
  const router = useRouter();

  return (
    <Container className="mt-10">
      <div className="flex  justify-between">
        <Heading>Projects</Heading>
        <Button onClick={() => router.push("/dashboard/projects/new")}>
          Add Task
        </Button>
      </div>
    </Container>
  );
}

export default DashboardPage;
