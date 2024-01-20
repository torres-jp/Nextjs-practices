import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import { Container, Grid } from "@radix-ui/themes";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProjectsCards from "@/components/projects/ProjectsCards";

async function loadProject(userId: number) {
  return await prisma.project.findMany({
    where: {
      userId,
    },
  });
}

async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const projects = await loadProject(parseInt(session?.user.id as string));

  return (
    <Container className="mt-10">
      <HeaderDashboard />

      <Grid columns="3" gap="4" mt="4">
        {projects.map((project) => (
          <ProjectsCards project={project} key={project.id} />
        ))}
      </Grid>
    </Container>
  );
}

export default DashboardPage;
