"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store";
import { metadata } from "./metadata"; 
import Image from "next/image";


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
            <header className="bg-[#FBEEFF] h-20 max-w-screen-xl mx-auto rounded-[30px] flex items-center justify-between px-8 mt-[52px]">
              <div className="flex items-center space-x-2 ml-[39px]">
                <div className="w-[125px] h-[21px]">
                  <Image src="/Imgs/logo-b.png" alt="B logo" layout="responsive" width={125} height={21} />
                </div>
              </div>

              <div className="flex items-center font-medium mr-[39px] text-[16px] leading-[40px]">
                <button className=" w-[47px] h-[40px] text-black text-left decoration-none hover:text-gray-600 mr-[58px]">Log In</button>
                <button className="w-[117px] h-[49px] bg-[#9378FF] text-white rounded-[30px]  px-4 py-1 hover:bg-purple-600">
                  Sign In
                </button>
              </div>
            </header>
            
            <main>{children}</main>
          </Provider>
        </body>
      </html>
    );
  }