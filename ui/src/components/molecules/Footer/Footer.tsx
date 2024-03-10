import { FC } from 'react';
import { Box, IconButton, Link } from '@chakra-ui/react';
import { IFooterProps, IFooterSocial } from './footer.types.ts';
import { BsDiscord, BsGithub, BsTelegram, BsTwitterX } from 'react-icons/bs';

const Footer: FC<IFooterProps> = () => {
  const footerSocials: IFooterSocial[] = [
    {
      name: 'Discord',
      link: 'https://discord.gg/YFtMjWwUN7',
      icon: <BsDiscord />
    },
    {
      name: 'GitHub',
      link: 'https://github.com/gnolang/gno',
      icon: <BsGithub />
    },
    {
      name: 'X',
      link: 'https://twitter.com/_gnoland',
      icon: <BsTwitterX />
    },
    {
      name: 'Telegram',
      link: 'https://t.me/gnoland',
      icon: <BsTelegram />
    }
  ];

  return (
    <Box
      display={'flex'}
      backgroundColor={'white'}
      width={'30%'}
      className={'box'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      {footerSocials.map((social: IFooterSocial, index: number) => {
        return (
          <Link key={index} href={social.link} isExternal>
            <IconButton
              aria-label={social.name}
              variant={'buttonPrimary'}
              icon={social.icon}
            />
          </Link>
        );
      })}
    </Box>
  );
};

export default Footer;
