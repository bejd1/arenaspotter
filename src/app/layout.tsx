"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import favicon from "./favicon.ico";
import Nav from "./_components/nav";
import AuthProvider from "./context/AuthProvider";
import QueryProvider from "./utlis/provider";
import { Provider } from "react-redux";
import { store } from "./store";

const inter = Inter({ subsets: ["latin"] });
const myFavicon = favicon.src;

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
        <Provider store={store}>
          <QueryProvider>
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
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
