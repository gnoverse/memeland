import { IPostProps } from './post.types.ts';
import { FC, useContext, useState } from 'react';
import { Box, Button, Image, Text, useToast } from '@chakra-ui/react';
import { TbArrowBigUpFilled } from 'react-icons/tb';
import Toast from '../Toast/Toast.tsx';
import { EToastType } from '../Toast/toast.types.ts';
import { IAccountInfo } from '../../../services/adena/adena.types.ts';
import { AdenaService } from '../../../services/adena/adena.ts';
import Config from '../../../config.ts';
import AccountContext from '../../../context/AccountContext.ts';

const Post: FC<IPostProps> = (props) => {
  const { post } = props;

  const toast = useToast();
  const [upvoteDisabled, setUpvoteDisabled] = useState<boolean>(false);
  const { address } = useContext(AccountContext);

  const constructImageSrc = (data: string): string => {
    return `data:image/png;base64,${data}`;
  };

  const handleUpvote = async () => {
    setUpvoteDisabled(true);

    if (!address) {
      // Wallet not connected
      toast({
        position: 'bottom-right',
        render: () => {
          return (
            <Toast text={'Wallet not connected'} type={EToastType.ERROR} />
          );
        }
      });

      setUpvoteDisabled(false);

      return;
    }

    try {
      const accountInfo: IAccountInfo = await AdenaService.getAccountInfo();

      await AdenaService.sendTransaction(
        [
          {
            caller: accountInfo.address,
            send: '',
            pkg_path: Config.REALM_PATH,
            func: 'Upvote',
            args: [post.id]
          }
        ],
        1000000 // TODO define gas limit
      );

      // TODO check transaction status?

      toast({
        position: 'bottom-right',
        render: () => {
          return (
            <Toast
              text={'Successfully upvoted meme!'}
              type={EToastType.SUCCESS}
            />
          );
        }
      });
    } catch (e) {
      console.error(e);

      toast({
        position: 'bottom-right',
        render: () => {
          return (
            <Toast text={'Unable to upvote meme'} type={EToastType.ERROR} />
          );
        }
      });
    }

    setUpvoteDisabled(false);
  };

  return (
    <Box
      className={'box'}
      backgroundColor={'white'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      width={'600px'}
    >
      <Image
        objectFit={'cover'}
        src={constructImageSrc(post.image)}
        alt={'Meme image'}
        loading={'lazy'}
        boxSize={'500px'}
      />
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={4}
        width={'500px'}
      >
        <Button
          isLoading={upvoteDisabled}
          loadingText="UPVOTING"
          spinnerPlacement="start"
          variant={'buttonPrimary'}
          leftIcon={<TbArrowBigUpFilled />}
          onClick={handleUpvote}
        >
          {`UPVOTE (${post.upvotes})`}
        </Button>
        <Box
          ml={4}
          display={'flex'}
          flexDirection={'column'}
          textAlign={'right'}
        >
          <Text>{post.author}</Text>
          <Text>{post.date.toDateString()}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
