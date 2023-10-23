import '@fontsource/inter'
import "./styles/app.scss"

export const metadata = {
  title: 'AccountA',
  description: 'Manage your business with ease',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
