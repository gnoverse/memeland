import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import theme from './theme/theme.ts';
import AppLayout from './components/layouts/AppLayout/AppLayout.tsx';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AppLayout />
    </ChakraProvider>
  );
};

export default App;
