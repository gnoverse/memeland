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
  const [page, setPage] = useState<number>(1);

  // const { provider } = useContext(ProviderContext);
  //
  // const constructStartTimestamp = (): number => {
  //   const date: Date = new Date();
  //
  //   switch (time) {
  //     case EPostTime.ALL_TIME:
  //       date.setDate(0); // zero time
  //
  //       break;
  //     case EPostTime.TWO_WEEKS:
  //       date.setDate(date.getDate() - 14);
  //
  //       break;
  //     case EPostTime.THREE_MONTHS:
  //       date.setDate(date.getMonth() - 3);
  //
  //       break;
  //     case EPostTime.ONE_YEAR:
  //       date.setDate(date.getFullYear() - 1);
  //
  //       break;
  //   }
  //
  //   return Math.floor(date.getTime() / 1000);
  // };

  const fetchPosts = async (): Promise<IPost[]> => {
    return generatePosts(postsPerFetch);
    // if (!provider) {
    //   throw new Error('invalid chain RPC URL');
    // }
    //
    // const startTimestamp: number = constructStartTimestamp();
    // const endTimestamp: number = Math.floor(new Date().getTime() / 1000);
    //
    // const response: string = await provider.evaluateExpression(
    //   Config.REALM_PATH,
    //   `GetPostsByTimestamp(${startTimestamp},${endTimestamp},${page},${postsPerFetch})`
    // );
    //
    // console.log(response); // TODO parse response
    //
    // return generatePosts(postsPerFetch);
  };

  const loadMorePosts = async () => {
    setIsLoadingMore(true);

    try {
      const posts: IPost[] = await fetchPosts();

      setDisplayedPosts(displayedPosts.concat(posts));
      setPage(page + 1);
    } catch (e) {
      console.error(e);

      toast({
        position: 'bottom-right',
        render: () => {
          return (
            <Toast text={'Unable to fetch memes'} type={EToastType.ERROR} />
          );
        }
      });
    }

    setIsLoadingMore(false);
  };

  useEffect(() => {
    setIsLoadingMore(true);

    fetchPosts()
      .then((posts: IPost[]) => {
        setDisplayedPosts(posts);
      })
      .catch((e) => {
        console.error(e);

        toast({
          position: 'bottom-right',
          render: () => {
            return (
              <Toast text={'Unable to fetch memes'} type={EToastType.ERROR} />
            );
          }
        });
      });

    setIsLoadingMore(false);
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
              onClick={loadMorePosts}
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
