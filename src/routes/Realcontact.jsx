import React from 'react';
import Navbar from '../components/Navbar';
import './realcontact.css';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="portfolio-container">
      <header className="portfolio-header">
        <h1>Meet Us!</h1>
      </header>
      <div className="team-container">

        <div className="team-member">
        <img className="team-img" src="https://cdn.discordapp.com/attachments/823581101121077278/1298409739557797928/josepher.png?ex=671975cd&is=6718244d&hm=fbada1519feacb38732927eb43e50023844b34ff1bb664263c1bec18303a044b&"></img>
          <div className="member-info">
            <h2>Jeongseop Yoon</h2>
            
            <p>Whitney Gretchen High School</p>
            <p>Web development caught my interest recently, and I started learning React last year. I combined my passion for programming and for people to take action for the enviornment, thus developing Recyclopedia! </p>
          </div>
        </div>
        <div className="team-member">
        <img className="team-img" src="https://cdn.discordapp.com/attachments/823581101121077278/1298409283225915422/niranjan.png?ex=67197560&is=671823e0&hm=14af8978c27cac1bad3a63848a9694c2850c9f47f94fd5acf0578c1c0eab8854&"></img>

          <div className="member-info">
            <h2>Niranjan Janardhanan</h2>
            <p>Whitney Gretchen High School</p>
            <p>I've always been passionate about technology, and when I recently learned more about recycling, it created a spark in me to create Recyclopedia and help more discover how we can help our planet. </p>
          </div>
        </div>
      </div>
    </div>

    </div>
      );
};

export default Contact;
