import "./styles/globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "Task Challenger",
  description: "Task Challenger",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
