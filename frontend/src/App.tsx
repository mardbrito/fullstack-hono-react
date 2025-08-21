import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/api";

function App() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchTotal() {
      const res = await api.expenses["total-spent"].$get();
      const data = await res.json();
      setTotal(data.total);
    }
    fetchTotal();
  }, []);

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Total spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent>{total}</CardContent>
    </Card>
  );
}

export default App;
