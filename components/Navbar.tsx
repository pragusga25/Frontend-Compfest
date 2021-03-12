import { FaBeer } from "react-icons/fa"
import { RiFileSearchLine } from "react-icons/ri"
import { FiSave } from "react-icons/fi"
import { Link } from "@material-ui/core"

export const Navbar: React.FC<{ explore: boolean }> = ({
  explore,
}): JSX.Element => {
  return (
    <nav>
      <div className="nav-left">
        <div className="nav-icon">
          <FaBeer />
        </div>
        <div className="nav-title">KESEGARAN.COMPFEST</div>
      </div>
      <div className="nav-right">
        <Link href="/">
          <div
            className={
              explore ? "nav-wrap-right active-page" : "nav-wrap-right"
            }
          >
            <div className="nav-icon">
              <RiFileSearchLine />
            </div>
            <div className="nav-title">Explore</div>
          </div>
        </Link>
        <Link href="/saved">
          <div
            className={
              explore ? "nav-wrap-right" : "nav-wrap-right active-page"
            }
          >
            <div className="nav-icon">
              <FiSave />
            </div>
            <div className="nav-title">Saved</div>
          </div>
        </Link>
      </div>
    </nav>
  )
}
