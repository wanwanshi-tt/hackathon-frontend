import { Flex } from '@mantine/core';
import StepperComponent from '../components/UploadFiles/StepperComponent';

const UploadingPage = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align={'flex-start'}
      style={{ height: '100%', width: '100%' }}
    >
      <StepperComponent />
    </Flex>
  );
};

export default UploadingPage;
