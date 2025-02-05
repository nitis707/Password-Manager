import React from "react";
import { ModeToggle } from "./DarkMode";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-primary dark:bg-gray-900 text-foreground h-16 items-center px-4">
      <span className="font-bold text-xl text-white">PassManager</span>
      <ul className="sm:flex hidden gap-5 text-white font-bold">
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
      </ul>
      <div className="flex gap-4">
        <ModeToggle />
        <SignedOut>
          <SignInButton>
            <Button variant={"outline"} className="dark:bg-gray-700">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
