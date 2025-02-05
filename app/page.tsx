import { CreditCard } from "@/components/CreditCard";
import { Password } from "@/components/Password";
import { YourCard } from "@/components/YourCard";
import { YourPassword } from "@/components/YourPassword";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Password Manager - Home",
  description: "This is homepage of my password manager",
};

export default async function Home() {
  const user = await currentUser();
  // console.log(user?.privateMetadata);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Password Manager
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Add A Credit Card
            </h2>
            <CreditCard />
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Your Cards
            </h2>
            <YourCard
              cards={
                Array.isArray(user?.privateMetadata.cards)
                  ? user?.privateMetadata.cards
                  : []
              }
            />
          </section>
        </div>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Add A Password
            </h2>
            <Password />
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Your Passwords
            </h2>
            <YourPassword
              passwords={
                Array.isArray(user?.privateMetadata.passwords)
                  ? user?.privateMetadata.passwords
                  : []
              }
            />
          </section>
        </div>
      </div>
    </div>
  );
}
