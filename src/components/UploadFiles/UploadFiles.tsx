import { useState } from 'react';
import { Flex, Stepper, Button } from '@mantine/core';

import { useAppStore } from '../../store/store';
import DropFiles from '../DropFiles/DropFiles';

const UploadFiles = () => {
  const [activeStep, setActiveStep] = useState(0);
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
        <Stepper.Step
          label="Upload Photo or Video"
          description="Upload your media file"
        />
        <Stepper.Step
          label="Validate & Confirm"
          description="AI validates, you confirm info"
        />
        <Stepper.Step label="Submit & Finish" description="Submit and finish" />
        <Stepper.Completed>
          <div>All steps completed - you're finished!</div>
        </Stepper.Completed>
      </Stepper>
      {activeStep === 0 && (
        <DropFiles
          onNext={handleNext}
          onBack={activeStep > 0 ? handleBack : undefined}
          currentStep={activeStep}
          onFileUpload={setUploadedData}
        />
      )}
      {activeStep === 1 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>AI Validation & User Confirmation</h2>
          <p>
            AI will extract and validate information from your photo or video.
            <br />
            Please review and confirm the details before submitting.
          </p>
          <Button onClick={handleNext} mt="lg">
            Confirm & Continue
          </Button>
        </div>
      )}
      {activeStep === 2 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>Submit & Finish</h2>
          <p>Your upload and confirmation are complete. Thank you!</p>
        </div>
      )}
    </Flex>
  );
};

export default UploadFiles;
