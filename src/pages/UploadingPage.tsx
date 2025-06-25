import { Flex } from '@mantine/core';
import UploadFiles from '../components/UploadFiles/UploadFiles';

const UploadingPage = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align={'flex-start'}
      style={{ height: '100%', width: '100%' }}
    >
      <UploadFiles />
    </Flex>
  );
};

export default UploadingPage;
