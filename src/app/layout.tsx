import clsx from "clsx";
import "./global.scss";
import { Inter } from "next/font/google";

const inter = Inter({ weight: ["300", "500", "700"], subsets: ["latin"] });

export const metadata = {
  title: "BU SIH Portal | Student Cabinet (SCSET)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={clsx(inter.className, "dark")}>
      <body>{children}</body>
    </html>
  );
}
