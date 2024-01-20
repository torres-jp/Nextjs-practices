"use client";
import { Button, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

function HeaderDashboard() {
  const router = useRouter();
  return (
    <div>
      <div className="flex  justify-between items-center">
        <Heading>Projects</Heading>
        <Button onClick={() => router.push("/dashboard/projects/new")}>
          Add Task
        </Button>
      </div>
    </div>
  );
}

export default HeaderDashboard;
