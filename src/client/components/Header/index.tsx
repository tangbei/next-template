// import React from "react";
import style from './index.module.scss';

const Header = () => {

  const headLab = [
    {
      label: '首页',
      value: 'home',
    },
    {
      label: '活动',
      value: 'activity',
    },
    {
      label: '个人中心',
      value: 'auth',
    },
    {
      label: '其他',
      value: 'other',
    }
  ];

  return (
    <header className={style['main-header']}>
      <div className={style['main-header-container']}>
        {/* <img src="aa" /> */}
        <nav className={style.mainNav}>
          <div className={style.navList}>
            <ul className={style.navListLeft}>
              {
                headLab.map((item) => (
                  <li key={item.value}>
                    {item.label}
                  </li>
                ))
              }
            </ul>
            <ul className={style.navListRight}>
              <li>aaa</li>
              <li>bbb</li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;