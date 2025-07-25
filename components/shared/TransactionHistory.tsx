"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Download, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

interface TransactionHistoryProps {
  userRole: "tenant" | "host";
}

// Mock transaction data
const mockTransactions = [
  {
    id: "TXN001",
    type: "subscription",
    description: "Professional Plan - Monthly",
    amount: 999,
    status: "completed",
    date: "2024-03-15",
    method: "Credit Card"
  },
  {
    id: "TXN002",
    type: "service",
    description: "Professional Photography Service",
    amount: 2500,
    status: "completed",
    date: "2024-03-10",
    method: "UPI"
  },
  {
    id: "TXN003",
    type: "subscription",
    description: "Professional Plan - Monthly",
    amount: 999,
    status: "pending",
    date: "2024-02-15",
    method: "Net Banking"
  },
  {
    id: "TXN004",
    type: "refund",
    description: "Refund - Virtual Tour Service",
    amount: -5000,
    status: "completed",
    date: "2024-02-08",
    method: "Credit Card"
  }
];

export const TransactionHistory = ({ userRole }: TransactionHistoryProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-background/80 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-500" />
          Transaction History
        </CardTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  {getStatusIcon(transaction.status)}
                </div>
                <div>
                  <h4 className="font-medium">{transaction.description}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                    <span>{transaction.method}</span>
                    <span>#{transaction.id}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.amount < 0 ? 'text-green-600' : 'text-foreground'
                }`}>
                  {transaction.amount < 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                </p>
                <Badge className={`mt-1 ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 p-4 rounded-lg bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">₹8,499</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-muted-foreground">Total Transactions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">₹999</p>
              <p className="text-sm text-muted-foreground">Monthly Average</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};