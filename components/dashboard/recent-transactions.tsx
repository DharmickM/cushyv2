import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const transactions = [
  {
    id: "1",
    amount: -320,
    date: "2023-06-01",
    name: "Woolworths",
    type: "Groceries",
  },
  {
    id: "2",
    amount: -50,
    date: "2023-06-02",
    name: "Coles Express",
    type: "Fuel",
  },
  {
    id: "3",
    amount: -80,
    date: "2023-06-03",
    name: "Telstra",
    type: "Phone Bill",
  },
  {
    id: "4",
    amount: 2000,
    date: "2023-06-05",
    name: "Salary",
    type: "Income",
  },
  {
    id: "5",
    amount: -120,
    date: "2023-06-07",
    name: "Kmart",
    type: "Shopping",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{transaction.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.type}</p>
          </div>
          <div className="ml-auto font-medium">
            {transaction.amount > 0 ? "+" : ""}
            ${Math.abs(transaction.amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
        </div>
      ))}
    </div>
  )
}