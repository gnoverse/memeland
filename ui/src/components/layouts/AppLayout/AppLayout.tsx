import { IAppLayoutProps } from './appLayout.types';
import { FC } from 'react';
import { Box, Container, useMediaQuery } from '@chakra-ui/react';
import Header from '../../molecules/Header/Header.tsx';
import Home from '../../pages/Home/Home.tsx';
import Footer from '../../molecules/Footer/Footer.tsx';

const AppLayout: FC<IAppLayoutProps> = (props) => {
  const [isMdOrSmaller] = useMediaQuery('(max-width: 62em)');

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      minHeight={'100vh'}
    >
      <Box mx={10} mt={5}>
        <Header />
      </Box>
      <Container
        display={'flex'}
        flexDirection={'column'}
        maxW={isMdOrSmaller ? '100vw' : '95vw'}
        mt={20}
        width={'100%'}
      >
        <Home />
        {props.children}
      </Container>
      <Box display={'flex'} mb={5} mt={20} justifyContent={'center'}>
        <Footer />
      </Box>
    </Box>
  );
};

export default AppLayout;
