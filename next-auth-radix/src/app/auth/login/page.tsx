import SigninForm from "@/components/auth/SigninForm";
import { Card, Container, Flex, Heading } from "@radix-ui/themes";

function LoginPage() {
  return (
    <>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-screen w-full items-center">
          <Card className="w-full">
            <Heading>Sign IN</Heading>
            <SigninForm />
          </Card>
        </Flex>
      </Container>
    </>
  );
}

export default LoginPage;
