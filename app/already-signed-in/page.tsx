import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Home, ArrowRight, UserCircle } from "lucide-react";
import { fetchUser } from "@/lib/getUserData";
import { Role } from "@/@types";

const AlreadySignedIn = async () => {
  const user = await fetchUser();
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
      <Card className="mx-auto max-w-md w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            You&rsquo;re Already Signed In
          </CardTitle>
          <CardDescription>
            You&rsquo;re currently logged into your Food Rescue Hub account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            You don&rsquo;t need to sign in again. You can continue to use all
            features of the application.
          </p>

          <div className="rounded-lg bg-green-50 p-4 border border-green-100">
            <div className="flex items-center gap-3">
              <UserCircle className="h-5 w-5 text-green-600" />
              <div className="text-sm font-medium">Welcome back!</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          {user?.role === Role.Recipient && (
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/donations">
                Browse Donations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {user?.role === Role.Donor && (
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/post-donation">
                Post Donations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {user?.role === Role.Admin && (
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/analytics">
                Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/profile">
              <UserCircle className="mr-2 h-4 w-4" />
              Go to Profile
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AlreadySignedIn;
