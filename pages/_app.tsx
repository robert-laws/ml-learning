import type { AppProps } from 'next/app';
import { AppStateProvider } from '../contexts/AppStateContext';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <Component {...pageProps} />
    </AppStateProvider>
  );
}
