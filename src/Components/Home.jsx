import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../App.css";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [apiData, setApiData] = useState([]);



  const api = async () => {
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=Apple&from=2022-10-26&sortBy=popularity&apiKey=c30a12c36a374b1b825f6743d598e3d8"
    );
    const data = await response.json();

    setApiData(data.articles);
  };

  // author

  useEffect(() => {
    api();
  }, []);

  return (
    <>
      <Navbar sendData={props.props}/>
      <div className="container_section">
        {apiData.map((elment, index) => (
          <div className="card_section" key={index}>
            {elment.urlToImage ? (
              <img src={elment.urlToImage} alt="This Images" />
            ) : (
              <img
                src="https://s.yimg.com/uu/api/res/1.2/3LYvtErIA8X3IG72FCi3fA--~B/aD01NjA7dz04NDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/la_times_articles_853/aaf76fa04efe1bf2fad4a9682878c048"
                alt="This Images"
              />
            )}
            <div className="apiContent">
              <h1 className="titleName">{elment.source.name}</h1>
              <div className="content_between">
                <h1 className="titleAuthor">{elment.author}</h1>
                <h1 className="titlePublishedAt">{elment.publishedAt}</h1>
              </div>
              <h1 className="titleTitile">{elment.title}</h1>
              <p className="description">{elment.description}</p>
              <a href={elment.url} target="_Blank">
                Click
              </a>
            </div>
          </div>
        ))}
      </div>

      <a href="#" className="angleUp">
        <i className="fa-sharp fa-solid fa-angle-up"></i>
      </a>
    </>
  );
};

export default Home;
