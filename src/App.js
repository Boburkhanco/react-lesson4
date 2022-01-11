import { useState, useEffect } from 'react';
import NewsItem from './components/NewsItem';
import Axios from 'axios'
import './App.css';

function App() {

  const [articles, setArticles] = useState([])
  const [filteredResults, setFilteredResults]  = useState([])
  const [theme, setTheme] = useState(window.localStorage.getItem("theme") || "light")

  if (theme) {

  }
  const handleChange = (e) => {
    setTheme(e.target.value)

    window.localStorage.setItem("theme", e.target.value)
  }
    // const cId = Date.now()


    const searchItems = (inputValue) => {
      setInputValue(inputValue)
      if (inputValue !== '') {
        const filteredData = articles.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(inputValue.toLowerCase())
        })
        setFilteredResults(filteredData)
      }
      else {
        setFilteredResults(articles)
      }
    }

    useEffect(() => {
        const getArticles = async () => {
            const res = await Axios.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=03c1753473464719bb1da48a3ffad60e");

            setArticles(res.data.articles)
        }
        getArticles();
    }, []);
    const [data, setData] = useState(articles)
    const [inputValue, setInputValue] = useState("")
    // const [darkmode, setDarkmode] = useState("")
    
    useEffect(() => {
        setData(() => {
          let newArray = articles.filter(item => item.title.includes(inputValue))
          return newArray
        })
    }, [inputValue])

  return (
    <>
      <div className={theme}>
          <section className="search">
              <input 
              className="input" 
              placeholder="Search for news" 
              onChange={(e) => searchItems(e.target.value)} ></input>
              <select 
              className="select"
              defaultValue={theme} 
              onChange={e => handleChange(e)}>
                <option value={"light"}>light</option>
                <option value={"dark"}>dark</option>
              </select>
          </section> 
          
          <section className="main">
              {inputValue.length > 2 ? (
                filteredResults.map((item) => {
                  return (
                    <NewsItem
                    title={item.title}
                    description={item.description}
                    url={item.url}
                    urlToImage={item.urlToImage}
                    />
                  )
                })
              ) : (
                articles.map((item) => {
                  return (
                    <NewsItem
                    title={item.title}
                    description={item.description}
                    url={item.url}
                    urlToImage={item.urlToImage}
                    />
                  )
                })
              )}
              
          </section>
      </div>

    </>
  );
}

// {articles.map(({title, description, url, urlToImage }) => (
//   <NewsItem
//   title={title}
//   description={description}
//   url={url}
//   urlToImage={urlToImage}
//   />
// ))}
export default App;
