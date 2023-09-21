import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

interface NavLink {
  label: string;
  route: string;
}

const links: NavLink[] = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'About',
    route: '/AboutUs',
  },
  {
    label: 'Nuestros Productos',
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
