import { SideNav } from '../components/SideNav';
import '../styles/global.scss'


function MyApp({ Component, pageProps }) {

  return (
    <div className="root theme theme--dark">
      <SideNav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
