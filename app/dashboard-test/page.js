// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Calendar } from "../../components/ui/Calendar"; // Shadcn Calendar

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session) router.push("/landing");
//   }, [session, status, router]);

//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   if (!session) {
//     return null; // Redirect is in process
//   }

//   return (
//     <div className="p-8 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <button
//           onClick={() => signOut({ callbackUrl: "/landing" })}
//           className="text-red-500 hover:underline"
//         >
//           Sign Out
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-4">
//         <Calendar
//           mode="single"
//           selected={selectedDate}
//           onSelect={(date) => setSelectedDate(date)}
//           className="max-w-md mx-auto"
//         />
//       </div>

//       <div className="mt-4 text-gray-700">
//         Selected date:{" "}
//         {selectedDate?.toLocaleDateString(undefined, {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { Calendar } from "../../components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function DashboardTestPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
          <p className="mt-4 text-sm text-gray-500">
            Selected:{" "}
            {selectedDate?.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
