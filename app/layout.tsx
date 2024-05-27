import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { ThemedClerkProvider } from "@/components/ThemedClerkProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OPigeon",
  description:
    "A not app for the new age of rich and fast digital note taking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        value={{
          dark: "mocha",
          light: "latte",
        }}
      >
        <body className={inter.className}>
          <ThemedClerkProvider>
            {children}
            <Toaster />
          </ThemedClerkProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
