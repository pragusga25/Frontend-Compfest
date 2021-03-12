import { Footer } from "./Footer"
import { Navbar } from "./Navbar"

const Layout = ({ children, explore }): JSX.Element => {
  return (
    <>
      <header>
        <Navbar explore={explore} />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
