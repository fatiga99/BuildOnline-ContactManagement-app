"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";
import { metadata } from "./metadata"; 

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) 
  {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Provider store={store}>
            <header>
              <nav>
                <div>
                  <h1>Buildonline</h1> 
                </div>
                <ul>
                  <li>Contacts</li>
                  <li>Notes</li>
                  <li>Log in</li>
                  <li>Sign in</li>
                </ul>
              </nav>
            </header>
            
            <main>{children}</main>
          </Provider>
        </body>
      </html>
    );
  }