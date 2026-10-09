import type { Metadata } from "next";
import localFont from "next/font/local";
import "./mc.css";

const mcFont = localFont({
  src: "./fonts/Monocraft.ttf",
  display: "swap",
  variable: "--font-mc",
});

const siteBase =
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ??
  "https://sylvanova.gg";

const pageTitle = "SylvaNova Minecraft";
const pageDescription =
  "Join the SylvaNova Minecraft server at mc.sylvanova.gg and connect with the community on Discord.";

export const metadata: Metadata = {
  metadataBase: new URL(siteBase),
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "/mc",
    images: [
      {
        url: "/mc-background.jpg",
        width: 1920,
        height: 1129,
        alt: "SylvaNova Minecraft server. Castle on a floating island.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/mc-background.jpg"],
  },
};

export default function McLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={mcFont.variable}>{children}</div>;
}
