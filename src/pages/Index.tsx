import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const Index = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "confirmPassword" || name === "password") {
      const isMatch =
        name === "confirmPassword"
          ? value === formData.password
          : value === formData.confirmPassword;
      setPasswordError(
        (formData.confirmPassword || name === "confirmPassword") && !isMatch
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }
    if (!formData.username || !formData.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }
    toast({
      title: "Success",
      description: "Registration successful!",
    });
    // Reset form
    setFormData({ username: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
            <p className="text-sm text-gray-500">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border border-gray-200",
                  "transition-all duration-200 ease-in-out",
                  "focus:outline-none focus:ring-2 focus:ring-gray-200",
                  "placeholder:text-gray-400",
                  "bg-white/50 backdrop-blur-sm"
                )}
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border border-gray-200",
                  "transition-all duration-200 ease-in-out",
                  "focus:outline-none focus:ring-2 focus:ring-gray-200",
                  "placeholder:text-gray-400",
                  "bg-white/50 backdrop-blur-sm"
                )}
                placeholder="Enter your password"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={cn(
                  "w-full px-4 py-2 rounded-lg border",
                  "transition-all duration-200 ease-in-out",
                  "focus:outline-none focus:ring-2 focus:ring-gray-200",
                  "placeholder:text-gray-400",
                  "bg-white/50 backdrop-blur-sm",
                  passwordError
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-200"
                )}
                placeholder="Confirm your password"
              />
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              className={cn(
                "w-full px-4 py-2 rounded-lg",
                "bg-gray-900 text-white",
                "transition-all duration-200 ease-in-out",
                "hover:bg-gray-800",
                "focus:outline-none focus:ring-2 focus:ring-gray-200",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "mt-6"
              )}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;