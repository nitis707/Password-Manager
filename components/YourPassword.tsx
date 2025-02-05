"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface WebProps {
  url: string;
  username: string;
  password: string;
}

export function YourPassword({ passwords }: { passwords: WebProps[] }) {
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Passwords</CardTitle>
      </CardHeader>
      <CardContent>
        {passwords.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-foreground">
            No passwords added!
          </p>
        ) : (
          <div className="space-y-4">
            {passwords.map((password, id) => (
              <div
                key={id}
                className="flex flex-col md:flex-row md:justify-between bg-secondary p-2 rounded"
              >
                <div>
                  <p>{password.url}</p>
                  <p className="mb-1 text-xs">{password.username}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type={showPassword[password.password] ? "text" : "password"}
                    value={password.password}
                    readOnly
                    className="border-none bg-secondary"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePasswordVisibility(password.password)}
                  >
                    {showPassword[id] ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
