import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Nav } from '../components/Nav';
import { UserContext } from '../contexts/UserContext';
import useMedia from '../hooks/useMedia';
import { Routers } from '../Routers';
import { NeedLogin } from './NeedLogin';

export const Root = ({ Component, pageProps, ...rest}) => {

  const { asPath } = useRouter();
  const { isLogin } = useContext(UserContext);
  const isMobile = useMedia("(max-width: 640px)");
  const { needAuth } = Routers.filter((router: any) => router.path === asPath)[0];

  return (
    <div className="root theme theme--dark">
      { needAuth && !isLogin ? (
        <NeedLogin />
      ) : (
        <>
          {isLogin && <Nav isMobile={isMobile} />}
          <Component {...pageProps} />
        </>
      )} 
    </div>
  );
}
