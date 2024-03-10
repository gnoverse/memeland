import { IUploadProps } from './upload.types.ts';
import React, { FC, useRef, useState } from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import { MdCloudUpload } from 'react-icons/md';
import Toast from '../Toast/Toast.tsx';
import { EToastType } from '../Toast/toast.types.ts';

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

    console.log('file selected');

    const reader = new FileReader();
    reader.onload = async () => {
      const image = new Image();

      // @ts-expect-error Not required
      image.src = reader.result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 800;

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

        const ctx = canvas.getContext('2d');
        // @ts-expect-error No need to check
        ctx.drawImage(image, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/png');

        // TODO upload to chain
        console.log(dataUrl);
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
        leftIcon={<MdCloudUpload />}
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
