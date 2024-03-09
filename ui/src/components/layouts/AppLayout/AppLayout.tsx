import { IAppLayoutProps } from './appLayout.types';
import { FC } from 'react';
import { Box, Container, useMediaQuery } from '@chakra-ui/react';
import Header from '../../molecules/Header/Header.tsx';

const AppLayout: FC<IAppLayoutProps> = (props) => {
  const [isMdOrSmaller] = useMediaQuery('(max-width: 62em)');

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      minHeight={'100vh'}
    >
      <Box mx={10} my={5}>
        <Header />
      </Box>
      <Container
        display={'flex'}
        flexDirection={'column'}
        maxW={isMdOrSmaller ? '100vw' : '95vw'}
        my={10}
        width={'100%'}
      >
        Content!
        {props.children}
      </Container>
    </Box>
  );
};

export default AppLayout;
