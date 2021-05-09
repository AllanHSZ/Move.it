import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Redirecting } from '../components/Redirecting';
import { Root } from '../components/Root';
import { UserProvider } from '../contexts/UserContext';
import { Routers } from '../Routers';
import '../styles/global.scss'

let user: any, hasAcess: boolean;
function MyApp({ Component, pageProps}) {

  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const currentRouter = Routers.find((_router: any) => _router.path === router.asPath);
    
    user = Cookies.getJSON('user') ?? {};
    hasAcess = currentRouter && currentRouter.needAuth ? Boolean(user?.id) : true;
    setMounted(true);

    if (!hasAcess) {
      router.replace("/login");
      hasAcess = true;
    } 
  }, [])

  return (
    mounted && hasAcess ? (
      <UserProvider user={user}>
        <Root Component={Component} pageProps={pageProps} />
      </UserProvider>
    ) : (
      <Redirecting />
    )
  );
}

export default MyApp;