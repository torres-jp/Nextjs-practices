"use client";
import {
  Heading,
  Link,
  Flex,
  Container,
  DropdownMenu,
  Button,
} from "@radix-ui/themes";
import NavLink from "next/link";
import { useSession, signOut } from "next-auth/react";
import { CaretDownIcon } from "@radix-ui/react-icons";

function Navbar() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <Container className="bg-slate-800 py-4">
      <Flex justify="between" align="center">
        <NavLink href="/" passHref>
          <Heading>Radix-Next</Heading>
        </NavLink>

        <ul className="flex gap-x-2 items-center">
          {!session && (
            <>
              <li>
                <Link asChild>
                  <NavLink href="/auth/login" passHref>
                    Login
                  </NavLink>
                </Link>
              </li>

              <li>
                <Link asChild>
                  <NavLink href="/auth/register" passHref>
                    Register
                  </NavLink>
                </Link>
              </li>
            </>
          )}

          {session && (
            <>
              <li>
                <Link asChild>
                  <NavLink href="/dashboard" passHref>
                    Dashboard
                  </NavLink>
                </Link>
              </li>

              <li>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="soft">
                      {session?.user?.name}
                      <CaretDownIcon />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item>My Profile</DropdownMenu.Item>
                    <DropdownMenu.Item>Settings</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red" onClick={() => signOut()}>
                      Log Out
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </li>
            </>
          )}
        </ul>
      </Flex>
    </Container>
  );
}

export default Navbar;
