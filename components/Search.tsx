import { BsSearch } from "react-icons/bs"
import { useForm } from "react-hook-form"

interface SearchProps {
  onSearch: (searchValue: string) => void
}

export const Search: React.FC<SearchProps> = ({ onSearch }): JSX.Element => {
  const { register, handleSubmit } = useForm()
  const onSubmit = data => {
    onSearch(data.memeName)
  }
  return (
    <div className="search-container">
      <h2 className={"search-title"}>Explore.</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="search-input"
          placeholder="search for memes ..."
          type="text"
          name="memeName"
          ref={register({ required: true })}
        />
        <br />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}
