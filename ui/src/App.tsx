import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import theme from './theme/theme.ts';
import Home from './components/organisms/Home/Home.tsx';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
};

export default App;
