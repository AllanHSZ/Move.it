import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className="theme theme--dark">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
