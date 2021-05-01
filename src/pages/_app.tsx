import { Nav } from '../components/Nav';
import useMedia from '../hooks/useMedia';
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {

  const isMobile = useMedia("(max-width: 640px)");

  return (
    <div className="root theme theme--dark">
      <Nav isMobile={isMobile} />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
