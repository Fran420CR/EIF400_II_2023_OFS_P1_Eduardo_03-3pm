import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const links: NavbarProps[] = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Our Products',
    route: '/Products',
  },
];

const Navbar: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navigation}>
          {links.map(({ label, route }) => (
            <li key={route} className={styles.navigationItem}>
              <Link href={route}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
