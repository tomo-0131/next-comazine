import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='mx-auto'>
      <AuthProvider>
        <RecoilRoot>
          <ChakraProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </RecoilRoot>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
