import "./globals.css"

export const metadata = {
  title: "pk-next-tailwind"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
