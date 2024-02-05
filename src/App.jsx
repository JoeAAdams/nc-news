import axios from 'axios'
import './App.css'
import ViewArticles from './Components/ViewArticles'

export const newsApi = axios.create({
  baseURL: "https://nc-news-wpw8.onrender.com/api/"
})

function App() {
  

  return (
    <>
      <ViewArticles/>
    </>
  )
}

export default App
