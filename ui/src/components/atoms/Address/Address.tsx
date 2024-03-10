import { IAddressProps } from './address.types.ts';
import { FC } from 'react';
import { Box } from '@chakra-ui/react';

const Address: FC<IAddressProps> = (props) => {
  const { address } = props;

  return <Box>{address}</Box>;
};

export default Address;
