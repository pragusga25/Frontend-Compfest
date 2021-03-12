import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useMemesQuery } from "../generated/graphql"
import Layout from "../components/Layout"
import { Search } from "../components/Search"
import { FaSave } from "react-icons/fa"
import { useState } from "react"
import { v4 } from "uuid"
import { NextSeo } from "next-seo"

export interface Data {
  title: string
  image_url: string
  description: string
  id?: string
}

const Home: React.FC = (): JSX.Element => {
  const { data } = useMemesQuery()
  const [isMemes, setIsMemes] = useState<boolean>(false)
  const myData = data?.memes
  const [dataMemes, setDataMemes] = useState<Data[] | any>([])

  const handleSarch = (searchValue: string): void => {
    const dataFiltered1 = myData.filter((d: Data) => {
      return (
        d.title.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1
      )
    })
    const dataFiltered2 = myData.filter((d: Data) => {
      return (
        d.description.toLowerCase().indexOf(searchValue.toLocaleLowerCase()) !==
        -1
      )
    })
    const dataFiltered: Data[] = [...dataFiltered1, ...dataFiltered2]
    if (dataFiltered.length !== 0) {
      const freshData = dataFiltered.map((d: Data) => {
        return { ...d, id: v4() }
      })
      setDataMemes([...freshData])
      setIsMemes(true)
    }
  }

  const handleSave = (idData: string) => {
    const dataLocal: Data[] | [] = JSON.parse(
      localStorage.getItem("data") || "[]"
    )
    const filteredId = dataMemes.filter((d: Data) => d.id === idData)
    const sendData: Data[] = [...filteredId, ...dataLocal]
    localStorage.setItem("data", JSON.stringify(sendData))
  }

  return (
    <>
      <NextSeo title="Kesegaran Compfest" />
      <Layout explore={true}>
        <div id="landing-page" className={isMemes ? "land-top" : "land-mid"}>
          <Search onSearch={handleSarch} />
          <div id="memes">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry>
                {dataMemes
                  ? dataMemes.map((meme: Data) => {
                      return (
                        <div className="card-container" key={meme.id}>
                          <div className="box-img">
                            <img src={meme.image_url} alt="meme" />
                          </div>
                          <div className="card-content">
                            <p>{meme.description}</p>
                            <div
                              className="icon-card"
                              onClick={() => handleSave(meme.id)}
                            >
                              <div className="save-icon">
                                <FaSave />
                              </div>
                              <p>Save</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  : "loading..."}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
