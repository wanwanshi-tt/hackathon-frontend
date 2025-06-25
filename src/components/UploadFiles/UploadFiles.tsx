import { useState } from 'react';
import { Flex, Stepper } from '@mantine/core';
import FileUpload from '../FileUpload';

import FieldMapping from '../FieldMapping';
import { useAppStore } from '../../store/store';

const UploadFiles = () => {
  const [activeStep, setActiveStep] = useState(0);
  const uploadedData = useAppStore((s) => s.uploadedData);
  const setUploadedData = useAppStore((s) => s.setUploadedData);

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, 2));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const handleStepClick = (step: number) => {
    if (step > activeStep) {
      alert('Please complete the current step before proceeding.');
      return;
    }
    setActiveStep(step);
  };

  return (
    <Flex direction="column" style={{ height: '100%', width: '80%' }} mx="auto">
      <Stepper
        active={activeStep}
        onStepClick={handleStepClick}
        w="70%"
        m="1.5rem auto"
        p="1rem"
      >
        <Stepper.Step label="Upload File" description="Upload your file" />
        <Stepper.Step label="Map Field" description="Map fields to data" />
        <Stepper.Step
          label="Edit and Preview"
          description="Edit and preview data"
        />
        <Stepper.Completed>
          <div>All steps completed - you're finished!</div>
        </Stepper.Completed>
      </Stepper>
      {activeStep === 0 && (
        <FileUpload
          onNext={handleNext}
          onBack={activeStep > 0 ? handleBack : undefined}
          currentStep={activeStep}
          onFileUpload={setUploadedData}
        />
      )}
      {activeStep === 1 && <FieldMapping uploadedData={uploadedData} />}
    </Flex>
  );
};

export default UploadFiles;
