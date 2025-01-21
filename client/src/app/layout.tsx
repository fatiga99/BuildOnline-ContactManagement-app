"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BaseButton from "./components/baseButton";

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
}>) {
  const router = useRouter();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <header className="hidden md:flex max-w-full w-[90%] h-[82px] bg-[#FBEEFF] rounded-[30px] mx-auto items-center justify-between px-8 mt-[52px]">
            <div className="flex items-center space-x-2 ml-[39px]">
              <div className="w-[125px] h-[21px]">
                <Image
                  src="/Imgs/logo-b.png"
                  alt="B logo"
                  layout="responsive"
                  width={125}
                  height={21}
                />
              </div>
            </div>

            <div className="flex items-center">
              <BaseButton
                variant="Contacts"
                onClick={() => router.push("/contacts")}
              >
                Contacts
              </BaseButton>
            </div>

            <div className="flex items-center ">
              <BaseButton
                variant="loginSmall"
                onClick={() => router.push("/auth/login")}
              >
                Log In
              </BaseButton>
            </div>
          </header>

          <main className="max-w-full w-[90%] mx-auto">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
