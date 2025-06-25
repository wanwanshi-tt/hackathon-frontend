import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Text, Group, Button, Notification, Radio } from '@mantine/core';
import { useState } from 'react';
import { CheckIcon } from '@mantine/core';
import Papa from 'papaparse';
import type { ParseResult } from 'papaparse';
import * as XLSX from 'xlsx';
import { useAppStore } from '../store/store';

const FileUpload = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  onFileUpload: (data: { [key: string]: unknown }[]) => void;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>(MIME_TYPES.csv); // Default to CSV
  const [isFileValid, setIsFileValid] = useState<boolean>(false); // Track file validation
  const setUploadedData = useAppStore((s) => s.setUploadedData);
  const uploadedData = useAppStore((s) => s.uploadedData);

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

    setError(null); // Clear any previous errors
    setIsFileValid(true); // Mark file as valid

    const file = files[0];

    if (fileType === MIME_TYPES.csv) {
      // Parse CSV file
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const fileContent = e.target?.result as string;
          Papa.parse(fileContent, {
            header: true,
            complete: (result: ParseResult<unknown>) => {
              const columnNames = Object.keys(result.data[0] || {});
              console.log('Extracted columns from CSV:', columnNames);
              setUploadedData([
                {
                  name: file.name,
                  size: file.size,
                  type: file.type,
                  columns: columnNames,
                  data: result.data,
                },
              ]);
            },
          });
        } catch (err) {
          setError('Error parsing CSV file: ' + (err as Error).message);
          setIsFileValid(false);
        }
      };
      reader.onerror = () => {
        setError('Error reading CSV file.');
        setIsFileValid(false);
      };
      reader.readAsText(file);
    } else if (fileType === MIME_TYPES.xlsx) {
      // Parse XLSX file
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const columnNames = jsonData[0] || [];
        console.log('Extracted columns from XLSX:', columnNames);
        setUploadedData([
          {
            name: file.name,
            size: file.size,
            type: file.type,
            columns: columnNames,
            data: jsonData,
          },
        ]);
      };
      reader.onerror = () => {
        setError('Error reading XLSX file.');
        setIsFileValid(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      {error && (
        <Notification color="red" onClose={() => setError(null)}>
          {error}
        </Notification>
      )}

      {isFileValid && uploadedData.length > 0 && (
        <Notification color="green" icon={<CheckIcon />}>
          Uploaded file: {String(uploadedData[0].name)} (
          {Number(uploadedData[0].size)} bytes)
        </Notification>
      )}

      <div
        style={{
          marginBottom: '1rem',
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: '#f0f4ff',
          borderBottom: '2px solid #228be6',
        }}
      >
        <Text size="xl" fw={700} style={{ color: '#228be6' }}>
          Upload Your File
        </Text>
        <Text size="sm" style={{ color: '#555' }}>
          Select a file type and upload your CSV or XLSX file below.
        </Text>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <Text>Select File Type:</Text>
          <Radio.Group value={fileType} onChange={setFileType} name="file-type">
            <Group style={{ display: 'flex', gap: '1rem' }}>
              <Radio value={MIME_TYPES.csv} label="CSV" />
              <Radio value={MIME_TYPES.xlsx} label="XLSX" />
            </Group>
          </Radio.Group>
        </div>

        <Dropzone
          onDrop={handleDrop}
          accept={[MIME_TYPES.csv, MIME_TYPES.xlsx]}
          maxSize={3 * 1024 ** 2} // 3MB
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
          style={{
            marginTop: '2rem',
            width: '100%',
            justifyContent: onBack !== undefined ? 'space-between' : 'center', // Center 'Next' button if no 'Back'
            maxWidth: '600px',
          }}
        >
          {onBack !== undefined && (
            <Button onClick={onBack} size="sm">
              Back
            </Button>
          )}
          <Button
            onClick={onNext}
            size="sm"
            disabled={!isFileValid} // Disable if file is not valid
          >
            Next
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default FileUpload;
