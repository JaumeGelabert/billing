import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SWRConfig } from "swr";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

// const fetcher = (resource: RequestInfo, init: RequestInit) =>
//   fetch(resource, init).then((res) => res.json());

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SWRConfig
          value={{
            refreshInterval: 5000 // 1 hour
            // fetcher
            // onError: (error, key) => {
            //   if (error.status !== 403 && error.status !== 404) {
            //     // Podemos enviar el error a Sentry o cualquier otro servicio de monitoreo
            //   }
            // }
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
