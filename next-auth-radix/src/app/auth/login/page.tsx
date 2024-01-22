/* eslint-disable react/no-unescaped-entities */
import SigninForm from "@/components/auth/SigninForm";
import { Card, Container, Flex, Heading, Text, Link } from "@radix-ui/themes";
import NavLink from "next/link";

function LoginPage() {
  return (
    <>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-[calc(100vh-10rem)] w-full items-center">
          <Card className="w-full p-7">
            <Heading>Sign In</Heading>
            <SigninForm />

            <Flex justify="between" my="4">
              <Text>Don't have an account</Text>
              <Link asChild>
                <NavLink href="/auth/register" passHref>
                  Sign Up
                </NavLink>
              </Link>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </>
  );
}

export default LoginPage;
