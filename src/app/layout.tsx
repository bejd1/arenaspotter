import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import favicon from "./favicon.ico";
import Nav from "./_components/nav";
import AuthProvider from "./context/AuthProvider";
import Provider from "./utlis/provider";

const inter = Inter({ subsets: ["latin"] });
const myFavicon = favicon.src;

export const metadata: Metadata = {
  title: "Arena Spotter",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={myFavicon} />
      </head>
      <body className={inter.className}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <div>
                <Nav />
                {children}
              </div>
            </AuthProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
