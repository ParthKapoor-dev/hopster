"use client";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ToogleMode() {
  const { theme, setTheme } = useTheme();

  useEffect(() => console.log(theme), [theme]);

  function handleTheme() {
    if (theme == "dark") setTheme("light");
    else setTheme("dark");
  }

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={handleTheme}
      >
        {theme == "light" ? (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        ) : (
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        )}
      </Button>
    </div>
  );
}
