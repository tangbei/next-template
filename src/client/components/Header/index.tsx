import React, { useState } from "react";
import Link from 'next/link';
import style from './index.module.scss';

const headLab = [
  {
    label: '首页',
    value: 'home',
    link: '/',
  },
  {
    label: '活动',
    value: 'activity',
    link: '/activity/33',
  },
  {
    label: 'ai使用',
    value: 'auth',
    link: '/auth',
  },
  {
    label: '工具推荐',
    value: 'tools',
    link: '/tools',
  },
  {
    label: '关于',
    value: 'about',
    link: '/about',
  }
];

const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <header className={style['main-header']}>
      <div className={style['main-header-container']}>
        {/* <img src="aa" /> */}
        <nav className={style.mainNav}>
          <div className={style.navList}>
            <ul className={style.navListLeft}>
              {
                headLab.map((item, index) => (
                  <Link
                    className={`${style.navListItem} ${activeIndex === index ? style.navListItemActive : ''}`}
                    key={item.value}
                    href={item.link}
                    onClick={() => {
                      setActiveIndex(index);
                    }}
                  >
                    {item.label}
                  </Link>
                ))
              }
            </ul>
            <ul className={style.navListRight}>
              <li style={{ marginRight: 10 }}>tangbei</li>
              <li>
                <a href="https://github.com/tangbei" target="_blank" rel="noopener noreferrer">
                  <img src='/images/icon_github.svg' />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;