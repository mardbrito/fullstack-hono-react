import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: Index,
});

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) throw new Error("server error");
  const data = await res.json();
  return data;
}
function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Total spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "Loading..." : data.total}</CardContent>
    </Card>
  );
}
