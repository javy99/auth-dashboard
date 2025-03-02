import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function ForgotPasswordPage({ onError }: any) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Add your password reset logic here
      console.log("Password reset requested for:", email);
      setSubmitted(true);
    } catch (error) {
      onError((error as Error).message);
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Check your email</h2>
        <p className="mt-2 text-gray-600">
          We've sent password reset instructions to {email}
        </p>
        <Link
          to="login"
          className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Sign in
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-gray-600">
          Enter your email address and we'll send you instructions to reset your
          password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="reset-email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1 relative">
            <input
              id="reset-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link
            to="/login"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to Sign in
          </Link>
          <button
            type="submit"
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset Password
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </form>
    </>
  );
}
