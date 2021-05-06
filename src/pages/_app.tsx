import { Root } from '../components/Root';
import { UserProvider } from '../contexts/UserContext';
import '../styles/global.scss'

function MyApp({ Component, pageProps}) {
  
  return (
    <UserProvider>
      <Root Component={Component} pageProps={pageProps} />
    </UserProvider>
  );
}

export default MyApp;