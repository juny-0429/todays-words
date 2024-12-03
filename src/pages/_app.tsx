import 'src/styles/globals.css';
import { pretendard } from 'src/theme/fonts';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html,
        body {
          font-family: ${pretendard.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
