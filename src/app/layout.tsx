import "@/styles/globals.scss";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import ReactQueryProvider from "@/app/ReactQueryProvider";
import { AuthProvider } from "@/lib/auth/authContext";
import MainLayout from "@/components/MainLayout/MainLayout";

export const metadata = {
  title: 'Todo App',
  description: 'Mobile-first todo application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ReactQueryProvider>
          <AuthProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}