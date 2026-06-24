import "./globals.css";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeContext";

export const metadata = {
  title: "Anees Rehman — Full Stack Developer",
  description: "Full-stack developer crafting clean digital experiences and problem solutions.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: { url: '/favicon.svg', type: 'image/svg+xml' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ThemeProvider>
          <Cursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
