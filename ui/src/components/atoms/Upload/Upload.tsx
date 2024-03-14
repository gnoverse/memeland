import { IUploadProps } from './upload.types.ts';
import React, { FC, useRef, useState } from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import Toast from '../Toast/Toast.tsx';
import { EToastType } from '../Toast/toast.types.ts';
import {
  EMessageType,
  IAccountInfo
} from '../../../services/adena/adena.types.ts';
import { AdenaService } from '../../../services/adena/adena.ts';
import Config from '../../../config.ts';

const Upload: FC<IUploadProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleMemeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);

    // Grab the selected file, if any
    const file = event.target.files?.[0];
    if (!file) {
      toast({
        position: 'bottom-right',
        render: () => {
          return <Toast text={'No image selected'} type={EToastType.SUCCESS} />;
        }
      });

      setIsLoading(false);

      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const image = new Image();

      // @ts-expect-error Not required
      image.src = reader.result;

      image.onload = async () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 500;

        let width = image.width;
        let height = image.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height *= maxDimension / width;
            width = maxDimension;
          } else {
            width *= maxDimension / height;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        console.log(`w:${width}, h:${height}`);

        const ctx = canvas.getContext('2d');
        // @ts-expect-error No need to check
        ctx.drawImage(image, 0, 0, width, height);

        const base64Image = canvas.toDataURL('image/png').split(';base64,')[1];

        console.log(base64Image);

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
                  func: 'PostMeme',
                  args: [base64Image, `${Math.floor(Date.now() / 1000)}`]
                }
              }
            ],
            10000000
          );

          toast({
            position: 'bottom-right',
            render: () => {
              return (
                <Toast
                  text={'Successfully posted meme!'}
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
                <Toast text={'Unable to post meme'} type={EToastType.ERROR} />
              );
            }
          });
        }

        // TODO trigger rerender?
      };
    };

    reader.readAsDataURL(file);

    setIsLoading(false);
  };

  return (
    <Box>
      <Button
        isLoading={isLoading}
        loadingText={'UPLOADING'}
        variant={'buttonPrimary'}
        marginLeft={'auto'}
        as={'label'}
        htmlFor={'fileInput'}
        onClick={handleUploadClick}
        cursor={'pointer'}
      >
        UPLOAD MEME
      </Button>
      <input
        type={'file'}
        accept={'image/*'}
        onChange={handleMemeUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default Upload;
