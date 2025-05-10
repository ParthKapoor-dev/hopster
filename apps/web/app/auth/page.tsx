"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  Mail,
  User,
  Phone,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authClient } from "@/app/api/auth/[[...auth]]/route";

export default function AuthPage() {
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Signup form state
  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signupSubmitting, setSignupSubmitting] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Handle login submission
  const handleLoginSubmit = async () => {
    setLoginError("");
    setLoginSubmitting(true);

    // Validate email
    if (!loginEmail || !loginEmail.includes("@")) {
      setLoginError("Please enter a valid email address");
      setLoginSubmitting(false);
      return;
    }

    try {
      console.log("trying it out");
      const { data, error } = await authClient.signIn.magicLink({
        email: loginEmail,
        callbackURL: "/",
      });

      if (error) throw new Error(error.message);

      console.log("Data received", data);
      console.log("error", error);

      // Show success message
      setLoginSuccess(true);

      // Reset form
      setLoginEmail("");
    } catch (error) {
      setLoginError("Failed to send magic link. Please try again.");
      console.log(error);
    } finally {
      setLoginSubmitting(false);
    }
  };

  // Handle signup submission
  const handleSignupSubmit = async () => {
    setSignupError("");
    setSignupSubmitting(true);

    // Validate inputs
    if (!fullName) {
      setSignupError("Please enter your full name");
      setSignupSubmitting(false);
      return;
    }

    if (!signupEmail || !signupEmail.includes("@")) {
      setSignupError("Please enter a valid email address");
      setSignupSubmitting(false);
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      setSignupError("Please enter a valid phone number");
      setSignupSubmitting(false);
      return;
    }

    try {
      console.log("trying it out");
      const { data, error } = await authClient.signIn.magicLink({
        email: signupEmail,
        callbackURL: "/",
      });

      if (error) throw new Error(error.message);

      console.log("Data received", data);
      console.log("error", error);

      // Show success message
      setSignupSuccess(true);

      // Reset form
      setFullName("");
      setSignupEmail("");
      setPhoneNumber("");
    } catch (error) {
      setSignupError("Registration failed. Please try again.");
      console.log(error);
    } finally {
      setSignupSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-4">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your email to receive a magic link
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loginSuccess ? (
                  <Alert className="bg-green-50 border-green-200">
                    <Mail className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700">
                      Magic link sent! Check your email to log in.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    {loginError && (
                      <Alert
                        variant="destructive"
                        className="bg-red-50 border-red-200"
                      >
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-red-700">
                          {loginError}
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                {!loginSuccess && (
                  <Button
                    className="w-full"
                    disabled={loginSubmitting}
                    onClick={handleLoginSubmit}
                  >
                    {loginSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Link
                      </>
                    ) : (
                      <>
                        Send Magic Link
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your details to create a new account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {signupSuccess ? (
                  <Alert className="bg-green-50 border-green-200">
                    <Mail className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700">
                      Account created! Check your email to complete the
                      registration.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <>
                    {signupError && (
                      <Alert
                        variant="destructive"
                        className="bg-red-50 border-red-200"
                      >
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-red-700">
                          {signupError}
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signupEmail"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="(123) 456-7890"
                          className="pl-10"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                {!signupSuccess && (
                  <Button
                    className="w-full"
                    disabled={signupSubmitting}
                    onClick={handleSignupSubmit}
                  >
                    {signupSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
