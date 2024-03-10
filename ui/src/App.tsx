import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import theme from './theme/theme.ts';
import Home from './components/organisms/Home/Home.tsx';
import { IAccountContext } from './context/accountContext.types.ts';
import { useState } from 'react';
import AccountContext from './context/AccountContext.ts';

const App = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [chainID, setChainID] = useState<string | null>(null);

  const accountContext: IAccountContext = {
    address,
    chainID,

    setAddress,
    setChainID
  };

  return (
    <AccountContext.Provider value={accountContext}>
      <ChakraProvider theme={theme}>
        <Home />
      </ChakraProvider>
    </AccountContext.Provider>
  );
};

export default App;
