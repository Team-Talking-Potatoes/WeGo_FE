import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/globals.css';
import { MswComponent } from '@/mocks/msw.component';
import QueryProviders from '@/utils/queryProvider';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <MswComponent />
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
};

export default RootLayout;
