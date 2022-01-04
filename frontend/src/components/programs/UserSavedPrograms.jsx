import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../generic/Box';
import Link from 'next/link';

const UserSavedPrograms = ({ programs }) => {
  const handleclick = () => {};

  if (!programs) return <></>;
  return (
    <Box display="flex" fd="column" mt={125}>
      <TitleHeading>Your saved opportunities!</TitleHeading>
      {programs.map((program) => {
        return (
          <Link href={`/resource/${program.href}`}>
            <Container>
              <h3>{program.organization}</h3>
            </Container>
          </Link>
        );
      })}
    </Box>
  );
};

UserSavedPrograms.propTypes = {
  programs: PropTypes.array,
};

export default UserSavedPrograms;

const Container = styled.div`
  border-radius: 4px;
  max-width: 300px;
  width: 100%;
  box-shadow: 0px 0px 4px 0px rgba(184, 177, 184, 1);
  min-height: 200px;
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
  transition: 0.4s ease;

  :hover {
    box-shadow: 0px 0px 9px 0px rgba(184, 177, 184, 1);
  }
`;

const TitleHeading = styled.p`
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 500;
  margin-top: 20px;
`;
