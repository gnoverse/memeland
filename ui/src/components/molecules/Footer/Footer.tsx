import { FC } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { IFooterProps } from './footer.types.ts';
import { BsDiscord, BsGithub, BsTelegram, BsTwitterX } from 'react-icons/bs';

const Footer: FC<IFooterProps> = () => {
  return (
    <Box
      display={'flex'}
      backgroundColor={'white'}
      width={'30%'}
      className={'box'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <IconButton
        aria-label={'Discord'}
        variant={'buttonPrimary'}
        icon={<BsDiscord />}
      />
      <IconButton
        aria-label={'GitHub'}
        variant={'buttonPrimary'}
        icon={<BsGithub />}
      />

      <IconButton
        aria-label={'X'}
        variant={'buttonPrimary'}
        icon={<BsTwitterX />}
      />
      <IconButton
        aria-label={'Telegram'}
        variant={'buttonPrimary'}
        icon={<BsTelegram />}
      />
    </Box>
  );
};

export default Footer;
