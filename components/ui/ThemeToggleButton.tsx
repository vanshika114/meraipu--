"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const STYLE_ID = "theme-transition-styles";

function createCircleTopRightAnimation(blur: boolean): string {
  const clipPosition = "100% 0%";
  return `
  ::view-transition-group(root) {
    animation-duration: 1s;
    animation-timing-function: var(--expo-out);
  }

  ::view-transition-new(root) {
    animation-name: reveal-light-top-right${blur ? "-blur" : ""};
    ${blur ? "filter: blur(2px);" : ""}
  }

  ::view-transition-old(root),
  .dark::view-transition-old(root) {
    animation: none;
    z-index: -1;
  }
  .dark::view-transition-new(root) {
    animation-name: reveal-dark-top-right${blur ? "-blur" : ""};
    ${blur ? "filter: blur(2px);" : ""}
  }

  @keyframes reveal-dark-top-right${blur ? "-blur" : ""} {
    from {
      clip-path: circle(0% at ${clipPosition});
      ${blur ? "filter: blur(8px);" : ""}
    }
    ${blur ? "50% { filter: blur(4px); }" : ""}
    to {
      clip-path: circle(150.0% at ${clipPosition});
      ${blur ? "filter: blur(0px);" : ""}
    }
  }

  @keyframes reveal-light-top-right${blur ? "-blur" : ""} {
    from {
      clip-path: circle(0% at ${clipPosition});
      ${blur ? "filter: blur(8px);" : ""}
    }
    ${blur ? "50% { filter: blur(4px); }" : ""}
    to {
      clip-path: circle(150.0% at ${clipPosition});
      ${blur ? "filter: blur(0px);" : ""}
    }
  }
  `;
}

function useThemeToggle(blur = false) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const updateStyles = useCallback((css: string) => {
    if (typeof window === "undefined") return;
    let styleElement = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = STYLE_ID;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
    const css = createCircleTopRightAnimation(blur);
    updateStyles(css);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }
    document.startViewTransition(switchTheme);
  }, [theme, setTheme, blur, updateStyles]);

  return { isDark, toggleTheme };
}

export function ThemeToggleButton({
  className = "",
  blur = false,
}: {
  className?: string;
  blur?: boolean;
}) {
  const { isDark, toggleTheme } = useThemeToggle(blur);

  return (
    <button
      type="button"
      className={cn(
        "size-10 cursor-pointer rounded-full p-0 transition-all duration-300 active:scale-95 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg",
        className,
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span className="relative size-5">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="size-5" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="size-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
