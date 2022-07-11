import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import Photo from './components/Photo';
import { FaSearch } from 'react-icons/fa';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [clientID,setClientID] = useState(process.env.REACT_APP_ACCESS_KEy)
  const [page, setPage] = useState(0);
  const [photo, setPhoto] = useState([]);
  
  const getImages = async () => {
    setIsLoading(true);
    let url;
    if (query) {
      url=`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${clientID}`;
    } else {
      url = `https://api.unsplash.com/search/photos?page=1&query=flowers&client_id=${clientID}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      let { results } = data;
      if (results) {
        const newPhotos = results.map((item) => {
          const {
            name,
            likes,
            alt_decription,
            urls: {
              regular
            },
            user :{profile_image : {
              medium
            }},
            portfolio_url
          } = item;
          return {
            name,
            likes,
            regular,
            medium,
            portfolio: portfolio_url,
            description:alt_decription,
          }
        })
        setPhoto(newPhotos);
        setIsLoading(false);
      } else {
        setPhoto([])
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    getImages()
  },[page])

  if (isLoading) {
    return (
      <main>
        <Loading/>
      </main>
    )
  }

  const handlerChange = (e) => {
    e.preventDefault();
    setPage(1)
    getImages();
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="section-center">
          <div className="title">
            <h2>unsplash photos</h2>
            <div className="underline"></div>
          </div>
          <form className="search-form">
            <div className="form-control">
              <input
                type="text"
                className="search"
                placeholder='search for your favorite image'
                name={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type='submit'
                className="submit-btn"
                onClick={handlerChange}
              >
                <FaSearch/>
              </button>
            </div>
          </form>
        </section>
        <section className="section">
          <div className="photo-center">
            {photo.map((item,index) => {
              return <Photo key={index} {...item}/>
            })}
          </div>
          {isLoading && <Loading/>}
        </section>
      </main>
    </>
  )
}

export default App
