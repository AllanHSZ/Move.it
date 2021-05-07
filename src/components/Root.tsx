import { useContext } from 'react';
import { Nav } from '../components/Nav';
import { UserContext } from '../contexts/UserContext';
import useMedia from '../hooks/useMedia';

export const Root = ({ Component, pageProps, ...rest }) => {

  console.log("Root", { Component , pageProps, rest});
  const isMobile = useMedia("(max-width: 640px)");
  const { isLogin } = useContext(UserContext)

  return (
    <div className="root">
      { isLogin && <Nav isMobile={isMobile} />}
      <Component {...pageProps} />
    </div>
  );
}
