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
      Your saved opportunities!
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
  box-shadow: 1px 2px 9px 0px rgba(184, 177, 184, 1);
  min-height: 200px;
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
`;
