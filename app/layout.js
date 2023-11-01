import '@fontsource/inter'
import "./styles/app.scss"
import MainLoader from "./components/common/loader";

export const metadata = {
  title: 'AccountA',
  description: 'Manage your business with ease',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
      <MainLoader/>
      {children}
      </body>
    </html>
  )
}
