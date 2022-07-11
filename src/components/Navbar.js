import React, { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { social, links } from './data';

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const containerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const linkheight = linksRef.current.getBoundingClientRect().height;

    if (showLinks) {
      containerRef.current.style.height = `${linkheight}px`;
    } else {
      containerRef.current.style.height = `0`;
    }
  }, [showLinks]);

  const handleChanger = () => {
    setShowLinks(!showLinks);
  }

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h3>sky<span>coding</span></h3>
          <button className="toggle btn" onClick={handleChanger}>
            <FaBars/>
          </button>
        </div>
        <div className="links-container" ref={containerRef}>
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              return (
                <li key={link.id}>
                  <a href={link.url}>
                    {link.text}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <ul className="social-icons">
          {social.map((icons) => {
            return (
              <li key={icons.id}>
                <a href={icons.url}>
                  {icons.icon}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar