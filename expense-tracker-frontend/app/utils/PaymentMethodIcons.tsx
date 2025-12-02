import {
  Wallet,
  CreditCard,
  Landmark,
  Banknote,
  CircleHelp,
} from "lucide-react";
import { JSX } from "react";

export const paymentMethodIcons: { [key: string]: JSX.Element } = {
  cash: <Wallet className="w-4 h-4 text-green-400" />,
  "credit card": <CreditCard className="w-4 h-4 text-blue-400" />,
  "debit card": <Landmark className="w-4 h-4 text-purple-400" />,
  "online payment": <Banknote className="w-4 h-4 text-yellow-400" />,
  other: <CircleHelp className="w-4 h-4 text-gray-400" />,
};
