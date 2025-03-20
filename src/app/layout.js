import "./styles/globals.css";

export const metadata = {
  title: "Task Challenger",
  description: "Task Challenger",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
