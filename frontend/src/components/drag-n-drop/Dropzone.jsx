import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const Dropzone = () => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  //TODO: add validator for 5mb max.

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
  });

  return (
    <Container {...getRootProps()}>
      {file ? (
        <>SAVED</>
      ) : (
        <>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <>
              <p>Drag 'n' drop a file here, or click to select file</p>
              <p>Only jpegs and pngs will be accepted (max file size is 5mb)</p>
            </>
          )}
        </>
      )}
    </Container>
  );
};

Dropzone.propTypes = {};

export default Dropzone;

const Container = styled.div`
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 20px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  :hover {
    cursor: pointer;
  }
`;