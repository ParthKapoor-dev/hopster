"use client";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className=" flex items-center justify-center min-h-screen">
      Hopster - Scalable Ride Sharing App
      <ModeToggle />
    </div>
  );
}

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => console.log(theme), [theme]);

  function handleTheme() {
    if (theme == "dark") setTheme("light");
    else setTheme("dark");
  }

  return (
    <div>
      <Button variant="outline" size="icon" onClick={handleTheme}>
        {theme == "light" ? (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        ) : (
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        )}
      </Button>
    </div>
  );
}
