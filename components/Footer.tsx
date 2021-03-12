import {
  FaBeer,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaLine,
} from "react-icons/fa"
import { GrFacebook } from "react-icons/gr"
import { AiFillInstagram } from "react-icons/ai"

export const Footer: React.FC = (): JSX.Element => {
  return (
    <footer>
      <div className="footer-left footer-content">
        <div className="footer-icon">
          <FaBeer />
        </div>
        <div className="footer-title">KESEGARAN.COMPFEST</div>
      </div>
      <div className="footer-mid footer-content">
        <div className="icon-sosmed">
          <a href="https://www.facebook.com/COMPFEST/">
            <GrFacebook />
          </a>
        </div>
        <div className="icon-sosmed">
          <a href="https://twitter.com/COMPFEST">
            <FaTwitter />
          </a>
        </div>
        <div className="icon-sosmed">
          <a href="https://www.youtube.com/channel/UC03QmhwvQEWVI608A-RCEpw">
            <FaYoutube />
          </a>
        </div>
        <div className="icon-sosmed">
          <a href="https://www.instagram.com/compfest/">
            <AiFillInstagram />
          </a>
        </div>
        <div className="icon-sosmed">
          <a href="https://www.linkedin.com/company/compfest/">
            <FaLinkedinIn />
          </a>
        </div>
        <div className="icon-sosmed">
          <a href="https://timeline.line.me/user/_ddleL2Fb21FmZDQi4GvYKM3Isq_Sg0gy89-YHNw?utm_medium=osx&utm_source=desktop&utm_campaign=OA_Profile">
            <FaLine />
          </a>
        </div>
      </div>
      <div className="footer-right footer-content">
        &#169; 2021 Taufik Pragusga
      </div>
    </footer>
  )
}
