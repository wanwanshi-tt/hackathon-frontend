import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Text, Group, Button, Notification, Radio } from '@mantine/core';
import { useState } from 'react';
import { CheckIcon } from '@mantine/core';
import classes from './DropFiles.module.css';

const DropFiles = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack?: () => void;
  currentStep?: number;
  onFileUpload?: (data: { [key: string]: unknown }[]) => void;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>(MIME_TYPES.csv); // Default to CSV
  const [isFileValid, setIsFileValid] = useState<boolean>(false); // Track file validation
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Placeholder for future Azure Blob/Function integration
  const uploadToApi = async (file: File) => {
    setUploading(true);
    setSuccess(false);
    setError(null);
    // Simulate API call
    // await new Promise((res) => setTimeout(res, 1200));
    console.log('File uploaded:', file);
    setUploading(false);
    setSuccess(true);
    // In the future, call onFileUpload with API response
  };

  const handleDrop = (files: File[]) => {
    const maxSize = 3 * 1024 ** 2; // 3MB
    for (const file of files) {
      if (file.type !== fileType) {
        setError(
          `Invalid file type. Please upload a ${
            fileType === MIME_TYPES.csv ? 'CSV' : 'XLSX'
          } file.`,
        );
        setIsFileValid(false);
        return;
      }
      if (file.size > maxSize) {
        setError('File size exceeds the 3MB limit.');
        setIsFileValid(false);
        return;
      }
    }
    setError(null);
    setIsFileValid(true);
    setUploadedFile(files[0]);
    setSuccess(false);
  };

  const handleNext = async () => {
    if (uploadedFile) {
      await uploadToApi(uploadedFile);
      onNext();
    }
  };

  return (
    <div>
      {error && (
        <Notification color="red" onClose={() => setError(null)}>
          {error}
        </Notification>
      )}
      {success && uploadedFile && (
        <Notification color="green" icon={<CheckIcon />}>
          Uploaded file: {uploadedFile.name} ({uploadedFile.size} bytes)
        </Notification>
      )}
      <div className={classes.header}>
        <Text size="xl" fw={700} style={{ color: '#228be6' }}>
          Upload Your File
        </Text>
        <Text size="sm" style={{ color: '#555' }}>
          Select a file type and upload your CSV or XLSX file below.
        </Text>
      </div>
      <div className={classes.uploadGroup}>
        <div style={{ marginBottom: '1rem' }}>
          <Text>Select File Type:</Text>
          <Radio.Group value={fileType} onChange={setFileType} name="file-type">
            <Group gap="md">
              <Radio value={MIME_TYPES.csv} label="CSV" />
              <Radio value={MIME_TYPES.xlsx} label="XLSX" />
            </Group>
          </Radio.Group>
        </div>
        <Dropzone
          onDrop={handleDrop}
          accept={[MIME_TYPES.csv, MIME_TYPES.xlsx]}
          maxSize={3 * 1024 ** 2}
          styles={{
            root: {
              border: '2px dashed #228be6',
              borderRadius: '8px',
              backgroundColor: '#f0f4ff',
              padding: '2rem',
              width: '100%',
              maxWidth: '600px',
            },
          }}
        >
          <Group
            style={{
              minHeight: 300,
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              gap: '1.5rem',
            }}
          >
            <Text size="lg">
              Drag and drop your {fileType === MIME_TYPES.csv ? 'CSV' : 'XLSX'}{' '}
              file here
            </Text>
            <Button size="sm">Browse Files</Button>
          </Group>
        </Dropzone>
        <Group
          className={classes.buttonGroup}
          style={{
            justifyContent: onBack !== undefined ? 'space-between' : 'center',
          }}
        >
          {onBack !== undefined && (
            <Button onClick={onBack} size="sm" disabled={uploading}>
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            size="sm"
            disabled={!isFileValid || uploading}
            loading={uploading}
          >
            Next
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default DropFiles;
