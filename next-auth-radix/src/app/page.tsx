import { Container } from "@radix-ui/themes";
import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metada: Metadata = {
  title: "home page",
  description: "home page",
};

async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <Container className="px-5 md:px-0">
      <header className="my-4 bg-slate-900 p-10 rounded-md">
        <h1 className="text-7xl my-10">NextAuth Radix</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet,
          dolorem non quod soluta obcaecati earum expedita, id rem nihil,
          necessitatibus officia accusamus neque excepturi in tempora fuga
          animi? Facere mollitia aspernatur, sit dicta eius excepturi culpa
          obcaecati facilis cum in qui, architecto voluptates modi, cumque odio
          atque? Asperiores possimus eligendi nisi aperiam accusantium itaque,
          dignissimos assumenda minus. Quaerat, velit. Eos fugiat officiis, ipsa
          accusantium nisi tempora eaque distinctio ipsum, voluptas expedita
          odit. Eaque repudiandae voluptas, error voluptates dolor eos? Iste
          dolores nam cumque ut, praesentium recusandae exercitationem
          reprehenderit nulla hic est culpa non autem quis quidem omnis
          inventore aspernatur? Atque.
        </p>
        <div className="mt-5">
          <Link
            className="text-white p-2  bg-blue-500 rounded-md"
            href="/auth/login"
          >
            Ingresar
          </Link>
        </div>
      </header>
    </Container>
  );
}

export default HomePage;

//  https://www.youtube.com/watch?v=qOAUm_rAE-E&t=186s
//  03:11:00
