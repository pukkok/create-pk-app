import "./globals.css"

export const metadata = {
  title: "pk-next-basic"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}