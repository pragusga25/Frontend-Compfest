import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Layout from "../components/Layout"
import { FaSave } from "react-icons/fa"
import { useEffect, useState } from "react"
import Link from "next/link"
import { NextSeo } from "next-seo"
import { Data } from "./index"

const SavedPage: React.FC = (): JSX.Element => {
  const [dataMemes, setDataMemes] = useState<Data[] | any>([])

  useEffect(() => {
    const dataLocal = JSON.parse(localStorage.getItem("data") || "[]")
    setDataMemes(dataLocal)
  }, [])

  let el = null

  if (dataMemes.length === 0) {
    el = (
      <div id="empty-memes">
        <p>You have no saved memes. Explore now</p>
        <Link href="/">
          <button className="explore-btn">Explore</button>
        </Link>
      </div>
    )
  } else if (dataMemes.length > 0) {
    el = (
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {dataMemes
            ? dataMemes.map(
                (meme: Data): JSX.Element => {
                  return (
                    <div className="card-container" key={meme.id}>
                      <div className="box-img">
                        <img src={meme.image_url} alt="meme" />
                      </div>
                      <div className="card-content">
                        <p>{meme.description}</p>
                        <div className="icon-card">
                          <div className="save-icon">
                            <FaSave />
                          </div>
                          <p>Save</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              )
            : "Loading ..."}
        </Masonry>
      </ResponsiveMasonry>
    )
  }

  return (
    <>
      <NextSeo title="Kesegaran Compfest" />
      <Layout explore={false}>
        <div id="saved-page">
          <h1>Your Saved Memes</h1>
          <div id="memes">{el}</div>
        </div>
      </Layout>
    </>
  )
}

export default SavedPage
