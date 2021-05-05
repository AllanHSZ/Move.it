import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Nav } from '../components/Nav';
import { UserContext } from '../contexts/UserContext';
import useMedia from '../hooks/useMedia';
import { Routers } from '../Routers';
import { NeedLogin } from './NeedLogin';
import { Redirecting } from './Redirecting';

export const Root = ({ Component, pageProps, ...rest}) => {

  const router = useRouter();
  const { isLogin } = useContext(UserContext);
  const isMobile = useMedia("(max-width: 640px)");
  const routers = Routers.filter((_router: any) => _router.path === router.asPath);

  const needAuth = routers[0]?.needAuth ?? false;
  

  useEffect(() => {
    if (needAuth && !isLogin)
      router.replace("/login"); 
  }, [])
  

  return (
    <div className="root theme theme--dark">
      { needAuth && !isLogin ? (
        <Redirecting/>
      ) : (
        <>
          {isLogin && <Nav isMobile={isMobile} />}
          <Component {...pageProps} />
        </>
      )} 
    </div>
  );
}
