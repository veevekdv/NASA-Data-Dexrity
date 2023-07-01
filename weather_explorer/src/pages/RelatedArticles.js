import React from 'react';
import './styles.css';
import img1 from "./photos/img1.jpeg"
import img2 from "./photos/img2.jpeg"
import img3 from "./photos/img3.jpeg"
import img4 from "./photos/img4.jpeg"

const articles = [
  {
    title: 'The Power of Solar Energy',
    author: 'Emily Kerr',
    image: img1,
    summary: 'Explore the latest advancements and learn about how solar energy is transforming the world, and how you can start using it today!',
    date: 'February 19, 2023',
    link: 'https://sitn.hms.harvard.edu/flash/2019/future-solar-bright/',
  },
  {
    title: 'Wind Power: Harnessing Nature\'s Energy',
    author: 'Anson Wong',
    image: img2,
    summary: 'Discover how wind power is becoming one of the most popular and effective sources of renewable energy in the world.',
    date: 'February 18, 2023',
    link: 'https://www.energy.gov/eere/wind/advantages-and-challenges-wind-energy',
  },
  {
    title: 'Meet the Geothermal Champions',
    author: 'Hiroko Tabuchi',
    image: img3,
    summary: 'Explore the latest advancements in hydroelectric power technology, & how it can be used to power homes and businesses.',
    date: 'February 17, 2023',
    link: 'https://www.nytimes.com/2023/03/28/climate/geothermal-energy.html',
  },
  {
    title: 'The future of hydroelectric',
    author: 'Anson Wong',
    image: img4,
    summary: 'Check out these simple and effective tips for reducing your carbon footprint and living a more sustainable lifestyle!',
    date: 'February 16, 2023',
    link: 'https://earth.org/the-future-of-hydroelectric-power/',
  },
];

const RelatedArticle = ({ article }) => {
  return (
    <div className="related-article">
      <a href={article.link} className="article-card-container">
        <div className="article-wrapper">
          <img src={article.image} alt={article.title} className="article-image" />
          <h2 className="article-title">{article.title}</h2>
          <p className="article-summary">{article.summary}</p>
        </div>
      </a>
    </div>
  );
};


const RelatedArticles = () => {
  return (
    <div id='related_art_card'>
      <div className="related-articles-title">
        <h3>You might also be interested in</h3>
      </div>
      <div className="related-articles">
        {articles.map((article, index) => (
          <RelatedArticle key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;