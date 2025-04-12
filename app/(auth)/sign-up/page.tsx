import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignupForm from "./components/SignupForm";

export const metadata = {
  title: "Sign Up | Food Rescue Hub",
  description: "Create a new account to start donating or rescuing food.",
  keywords: ["sign up", "register", "create account", "food rescue"],
};

const Signup = () => {
  return (
    <Card className="max-w-md mx-auto mt-10 p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-green-700">
          SignUp
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  );
};

export default Signup;
