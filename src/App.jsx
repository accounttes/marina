import React, { useState, useEffect } from 'react';
import backArrow from './assets/back.svg';
import avatar from './assets/avatar.png';
import download from './assets/download.svg';
import itsme from './assets/itsme.png';
import kotum from './assets/kotum.png';
import edit from './assets/settings.svg';
import arrow from './assets/arrow.svg';
import circle from './assets/circle.svg';
import circleOrange from './assets/circle-orange.svg';
import circleGrey from './assets/circle-grey.svg';
import verticalDots from './assets/vertical-dots.svg';
import publicIcon from './assets/public-icon.svg';
import adultIcon from './assets/adult-icon.svg';
import blacklist from './assets/blacklist.svg';
import bookmark from './assets/bookmark.svg';
import exit from './assets/exit.svg';

import { fetchProfile } from './services/api';
import { mockProfileData } from './constants/mockData';

import './App.css';
import "./reset.css";

function App() {
  const [openAccordion, setOpenAccordion] = useState('calls');
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        console.log('Fetching profile data...');
        const data = await fetchProfile('damirdamir');
        console.log('Received data:', data);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message);
        console.log('Using mock data due to error:', error.message);
        setProfileData(mockProfileData.data.page);
      }
    };

    loadProfileData();
  }, []);

  const handleAccordionClick = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  if (error) {
    console.log('Using mock data due to error:', error);
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  // Извлекаем все необходимые данные из ответа
  const {
    image,
    title,
    subtitle,
    left,
    middle,
    right
  } = profileData;

  // Извлекаем данные из middle массива
  const nickname = middle?.[0]?.group?.[0]?.label?.text || '';
  const date = middle?.[0]?.group?.[1]?.label?.text || '';
  const daysInIgrum = middle?.[1]?.group?.[0]?.label?.text || '';
  const meetings = middle?.[1]?.group?.[1]?.label?.text || '';
  const rumers = middle?.[1]?.group?.[2]?.label?.text || '';
  const city = middle?.[2]?.group?.[0]?.label?.text || '';
  const rumit = middle?.[2]?.group?.[1]?.label?.text || '';

  const backButton = left?.[0]?.button;
  const shareButton = right?.[0]?.button;

  return (
    <section className="wrapper">
      <div className='profile'> 
        <button onClick={() => backButton?.cmd && console.log('Back button clicked')}>
          <img src={backArrow} alt="Back" className="back-arrow" />
        </button>
        <img src={image} alt="Profile" className="avatar" />
        <div className="icons-container">
          <button>
            <img className="icons-download" src={download} alt="Download" />
          </button>
          <button> 
            <img className="icons-itsme" src={itsme} alt="Its Me" />
          </button>
          <button>
            <img className="icons-kotum" src={kotum} alt="Kotum" />
          </button>
        </div>
      </div>

      <div className='info'>
        <h1 className='title'>румер:</h1>
        <div className='name'>{title}</div>
        {subtitle && <div className='subtitle'>{subtitle}</div>}
      </div>

      <div className='nickname-container'>
        <h2 className='nickname'>@{nickname}</h2>
        <p className='date'>{date}</p>
      </div>

      <div className="metrics-container">
        <div className="metric-item">
          <span className="metric-value">{daysInIgrum}</span>
          <span className="metric-label">в игруме</span>
        </div>
        <div className="metric-item">
          <span className="metric-value">{meetings}</span>
          <span className="metric-label">встреч</span>
        </div>
        <div className="metric-item">
          <span className="metric-value">{rumers}</span>
          <span className="metric-label">румеров</span>
        </div>
      </div>

      <div className='city-container'>
        <div className='city'>{city}</div>
        <button className='edit-button' onClick={() => console.log('Edit button clicked')}>
          <img className='edit-icon' src={edit} alt="Edit" /> 
          <p>{rumit}</p>
        </button>
      </div>

      <div className="meetings-container">
        <div className={`accordion-item ${openAccordion === 'calls' ? 'open' : ''}`} onClick={() => handleAccordionClick('calls')}>
          <div className="accordion-header">
            <div>
              <img src={circle} alt="Circle" className="circle" />
              <span className="accordion-title">ЗОВЫ</span>
            </div>
            <div> 
              <span className="accordion-count">{meetings}</span>
              <img src={arrow} alt="Arrow" className="accordion-arrow" />
            </div>
          </div>
          <div className="meeting-list">
            <div className="meeting-item">
              <div className="meeting-avatar"></div>
              <span className="meeting-title">Название встречи полностью</span>
              <img src={verticalDots} alt="Arrow" className="accordion-dots" />
              <span className="meeting-date">13.04</span>
            </div>
            <div className="meeting-item">
              <div className="meeting-avatar"></div>
              <span className="meeting-title">Название встречи полностью</span>
              <img src={verticalDots} alt="Arrow" className="accordion-dots" />
              <span className="meeting-date">16.04</span>
            </div>
            <div className="meeting-item">
              <div className="meeting-avatar"></div>
              <span className="meeting-title">Название встречи полностью</span>
              <img src={verticalDots} alt="Arrow" className="accordion-dots" />
              <span className="meeting-date">19.04</span>
            </div>
            <div className="meeting-item">
              <div className="meeting-avatar"></div>
              <span className="meeting-title">Название встречи полностью</span>
              <img src={verticalDots} alt="Arrow" className="accordion-dots" />
              <span className="meeting-date">21.04</span>
            </div>
          </div>
        </div>

        <div className={`accordion-item ${openAccordion === 'going' ? 'open' : ''}`} onClick={() => handleAccordionClick('going')}>
          <div className="accordion-header">
            <div>
              <img src={circleOrange} alt="Circle" className="circle" />
              <span className="accordion-title">ИДУ</span>
            </div>
            <div> 
              <span className="accordion-count">0</span>
              <img src={arrow} alt="Arrow" className="accordion-arrow" />
            </div>
          </div>
        </div>

        <div className={`accordion-item ${openAccordion === 'history' ? 'open' : ''}`} onClick={() => handleAccordionClick('history')}>
          <div className="accordion-header">
            <div>
              <img src={circleGrey} alt="Circle" className="circle" />
              <span className="accordion-title">ИСТОРИЯ ВСТРЕЧ</span>
            </div>
            <div> 
              <span className="accordion-count">0</span>
              <img src={arrow} alt="Arrow" className="accordion-arrow" />
            </div>
          </div>
        </div>
      </div>

      <div className="create-meeting">
        СОЗДАТЬ ИГРУМ
      </div>
      <div className="my-meetings">
        МОИ ИГРУМЫ
        <img src={arrow} alt="Arrow" className="my-meetings-arrow" />
      </div>

      <div className="account-settings">
        <div className="setting-item">
          <img src={publicIcon} alt="Public" />
          <span className="setting-text">Публичный аккаунт</span>
        </div>
        <div className="setting-item">
          <img src={adultIcon} alt="Adult" />
          <span className="setting-text">Взрослый</span>
        </div>
      </div>

      <div className="account-settings">
        <div className="setting-item">
          <img src={arrow} alt="Subscriptions" className="arrow-down" />
          <span className="setting-text">Мои подписки</span>
        </div>
        <div className="setting-item">
          <img src={blacklist} alt="Blacklist" />
          <span className="setting-text">Черный список</span>
        </div>
        <div className="setting-item">
          <img src={bookmark} alt="Bookmarks" />
          <span className="setting-text">Закладки</span>
        </div>
      </div>

      <div className="description-block">
        <p className="description-text">
          Я профессиональный скуф, обажаю сидеть дома и часто играю в Мафию с друзьями по вечера в Сицилии и зовем всех желающ и разные другие дела...
          <img src={arrow} alt="Arrow" className="description-arrow" />
        </p>
        <a href="https://t.me/ribakit3" className="telegram-link">
          <span className="telegram-label">Мой телеграм</span>
          <span>@ribakit3</span>
        </a>
      </div>

      <div className="account-settings">
        <div className="setting-item">
          <img className="setting-item-img" src={circleGrey} alt="Possibilities" />
          <span className="setting-text">Возможновти ИГРУМА</span>
        </div>
        <div className="setting-item">
          <img className="setting-item-img" src={circleGrey} alt="Rules" />
          <span className="setting-text">Правила ИГРУМА</span>
        </div>
        <div className="setting-item">
          <img className="setting-item-img" src={circleGrey} alt="Rumer Guide" />
          <span className="setting-text">Инструкция РУМЕРА</span>
        </div>
        <div className="setting-item">
          <img className="setting-item-img" src={circleGrey} alt="Master Guide" />
          <span className="setting-text">Инструкция МАСТЕРА</span>
        </div>
        <div className="setting-item">
          <img className="setting-item-img" src={circleGrey} alt="Place Guide" />
          <span className="setting-text">Инструкция МЕСТА</span>
        </div>
        <div className="setting-item">
          <img className="setting-item-img" src={circleGrey} alt="Terms" />
          <span className="setting-text">Пользовательское соглашение</span>
        </div>
      </div>

      <div className="exit-block">
        <img src={exit} alt="Exit" />
        <span>Выйти из профиля</span>
      </div>
    </section>
  );
}

export default App;
