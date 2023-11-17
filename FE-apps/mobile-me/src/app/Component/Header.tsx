import { Link } from 'react-router-dom';
import styles from './Header.module.css';
const links = [
  {
    link: 'https://www.apple.com/store',
    name: 'Store',
  },
  {
    link: 'https://www.apple.com/mac',
    name: 'Mac',
  },
  {
    link: 'https://www.apple.com/ipad',
    name: 'iPad',
  },
  {
    link: 'https://www.apple.com/iphone',
    name: 'iPhone',
  },
  {
    link: 'https://www.apple.com/iwatch',
    name: 'iWatch',
  },
];

function Header() {
  return (
    <div
      className={`row justify-content-center ${styles['global-nav-container']}`}
    >
      <div
        className={`row align-items-center justify-content-spacebetween ${styles['global-nav']}`}
      >
        {links.map((perlink) => {
          return (
            <Link key={perlink.link} to={perlink.link}>
              {perlink.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Header;
