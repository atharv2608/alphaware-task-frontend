import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonJobCard() {
  return (
    <Card className="w-[380px]">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-400" />
        <Skeleton className="h-4 w-1/2 bg-gray-300"  />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/3 bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-20 bg-gray-300" />
      </CardFooter>
    </Card>
  );
}

export default SkeletonJobCard;
