import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
  cardNo: string;
  expiry: string;
  cvv: number;
}

export async function YourCard({ cards }: { cards: CardProps[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Cards</CardTitle>
      </CardHeader>
      <CardContent>
        {cards.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-foreground">
            No cards added!
          </p>
        ) : (
          <ul className="space-y-2">
            {cards.map((card: CardProps, id) => (
              <li
                key={id}
                className="flex justify-between items-center p-2 bg-secondary rounded"
              >
                <span>{card.cardNo}</span>
                <span>{card.cvv}</span>
                <span>{card.expiry}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
