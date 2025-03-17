import "./globals.css";

export const metadata = {
  title: "Task Challenger",
  description: "Task Challenger",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
