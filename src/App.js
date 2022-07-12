import{ useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import Photo from './components/Photo';
import { FaSearch } from 'react-icons/fa';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [clientID, setClientID] = useState(process.env.REACT_APP_ACCESS_KEy);
  const mounted = useRef(false);
  const [page, setPage] = useState(1);
  const [photo, setPhoto] = useState([]);
  const [newImages, setNewImages] = useState(false);
  
  const getImages = async () => {
    setIsLoading(true);
    let url;
    if (query) {
      url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${clientID}`;
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
            user: { profile_image: {
              medium
            } },
            portfolio_url
          } = item;
          return {
            name,
            likes,
            regular,
            medium,
            portfolio: portfolio_url,
            description: alt_decription,
          }
        })
        setPhoto((newPhoto) => {
          if (query && page === 1) {
            return newPhotos
          } else if (query) {
            return [...newPhoto, ...newPhotos]
          } else {
            return [...newPhoto, ...newPhotos]
          }
        });
        setNewImages(false);
        setIsLoading(false);
      } else {
        setPhoto([])
      }
    } catch (error) {
      console.log(error);
      setNewImages(false)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getImages()
    // eslint-disable-next-line
  },[page]);

  
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    if(!newImages)return;
    if (isLoading) return;
    setPage((oldPage) => oldPage + 1);
     // eslint-disable-next-line
  }, [newImages]);

  const event = window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', event);
    return window.removeEventListener('scroll', event);
     // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   const event = window.addEventListener('scroll', () => {
  //     if (!isLoading && (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
  //       setPage((oldPage) => {
  //         return oldPage + 1;
  //       })
  //     }
  //   });
  //   return window.removeEventListener('scroll', event);
  //   // eslint-disable-next-line
  // }, []);

  if (isLoading) {
    return (
      <main>
        <Loading/>
      </main>
    )
  }

  const handlerChange = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      getImages();
      return;
    }
    setPage(1)
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
            {photo.map((item) => {
              return <Photo key={item.id} {...item}/>
            })}
          </div>
          {isLoading && <h2 className="section-title">loading...</h2>}
        </section>
      </main>
    </>
  )
}

export default App
