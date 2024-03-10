import {
  EPostSort,
  EPostTime,
  generatePosts,
  IHomeProps
} from './home.types.ts';
import { FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  useMediaQuery,
  useToast
} from '@chakra-ui/react';
import Header from '../../molecules/Header/Header.tsx';
import Footer from '../../molecules/Footer/Footer.tsx';
import { IPost } from '../../atoms/Post/post.types.ts';
import Post from '../../atoms/Post/Post.tsx';
import Toast from '../../atoms/Toast/Toast.tsx';
import { EToastType } from '../../atoms/Toast/toast.types.ts';

const Home: FC<IHomeProps> = () => {
  const [isMdOrSmaller] = useMediaQuery('(max-width: 62em)');

  const [sort, setSort] = useState<EPostSort>(EPostSort.UPVOTES);
  const [time, setTime] = useState<EPostTime>(EPostTime.ALL_TIME);

  const toast = useToast();
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(true);
  const postsPerFetch: number = 3;
  const [displayedPosts, setDisplayedPosts] = useState<IPost[]>([]);

  const fetchPosts = async (): Promise<IPost[]> => {
    // TODO add sort + time support
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(generatePosts(postsPerFetch));
      }, 1000);
    });
  };

  const loadPosts = async () => {
    setIsLoadingMore(true);

    try {
      const posts: IPost[] = await fetchPosts();

      setDisplayedPosts(displayedPosts.concat(posts));
    } catch (e) {
      console.error(e);

      toast({
        position: 'bottom-right',
        render: () => {
          return (
            <Toast
              text={'Unable to fetch more memes'}
              type={EToastType.ERROR}
            />
          );
        }
      });
    }

    setIsLoadingMore(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    console.log('sort / time changed');
  }, [sort, time]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      minHeight={'100vh'}
    >
      <Box mx={10} mt={5}>
        <Header setPostSort={setSort} setPostTime={setTime} />
      </Box>
      <Container
        display={'flex'}
        flexDirection={'column'}
        maxW={isMdOrSmaller ? '100vw' : '95vw'}
        mt={20}
        width={'100%'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          marginLeft={'auto'}
          marginRight={'auto'}
          mt={-20}
        >
          {displayedPosts.map((post: IPost, index: number) => {
            return (
              <Box key={index} mt={20}>
                <Post post={post} />
              </Box>
            );
          })}
          <Box mx={'auto'} mt={20}>
            <Button
              variant={'buttonPrimary'}
              isLoading={isLoadingMore}
              loadingText="LOADING"
              spinnerPlacement="start"
              onClick={loadPosts}
            >
              LOAD MORE
            </Button>
          </Box>
        </Box>
      </Container>
      <Box display={'flex'} mb={5} mt={20} justifyContent={'center'}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
