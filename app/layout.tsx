import Title from './components/Title';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='font-noto min-h-screen'>
        <Title />
        {children}
      </body>
    </html>
  );
}
