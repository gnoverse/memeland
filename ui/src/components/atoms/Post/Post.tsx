import { IPostProps } from './post.types.ts';
import { FC, useContext, useState } from 'react';
import { Box, Button, Image, Text, useToast } from '@chakra-ui/react';
import { TbArrowBigUpFilled } from 'react-icons/tb';
import Toast from '../Toast/Toast.tsx';
import { EToastType } from '../Toast/toast.types.ts';
import {
  EMessageType,
  IAccountInfo
} from '../../../services/adena/adena.types.ts';
import { AdenaService } from '../../../services/adena/adena.ts';
import Config from '../../../config.ts';
import AccountContext from '../../../context/AccountContext.ts';

const Post: FC<IPostProps> = (props) => {
  const { post } = props;

  const toast = useToast();
  const [upvoteDisabled, setUpvoteDisabled] = useState<boolean>(false);
  const [upvoteCount, setUpvoteCount] = useState<number>(post.upvotes);
  const { address } = useContext(AccountContext);

  const formatUpvotes = (upvotes: number): string => {
    if (upvotes >= 1000000) {
      return (upvotes / 1000000).toFixed(1) + 'M';
    }

    if (upvotes >= 1000) {
      return (upvotes / 1000).toFixed(1) + 'k';
    }

    return upvotes.toString();
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
            type: EMessageType.MSG_CALL,
            value: {
              caller: accountInfo.address,
              send: '',
              pkg_path: Config.REALM_PATH,
              func: 'Upvote',
              args: [post.id]
            }
          }
        ],
        5000000
      );

      // Update the upvote counter
      setUpvoteCount(upvoteCount + 1);

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
        src={post.data}
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
          {`UPVOTE (${formatUpvotes(upvoteCount)})`}
        </Button>
        <Box
          ml={4}
          display={'flex'}
          flexDirection={'column'}
          textAlign={'right'}
          maxWidth={'250px'}
        >
          <Text noOfLines={1}>{post.author}</Text>
          <Text>{new Date(post.timestamp * 1000).toDateString()}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;