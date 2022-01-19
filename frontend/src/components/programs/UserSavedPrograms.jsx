import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../generic/Box';
import Link from 'next/link';

const UserSavedPrograms = ({ programs }) => {
  const handleclick = () => {};

  if (!programs) return <></>;
  return (
    <Box display="flex" fd="column" mt={100}>
      <TitleHeading>Your saved opportunities!</TitleHeading>
      {programs.map((program) => {
        return (
          <Link href={`/resource/${program.href}`} key={program.href}>
            <Container bgImage={program.coverImage}>
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
  box-shadow: 1px 1px 12px 5px rgba(184, 177, 184, 1);
  min-height: 200px;
  margin-top: 20px;
  padding: 10px;
  cursor: pointer;
  transition: 0.4s ease;
  margin-bottom: 20px;
  background-image: ${(props) => 'url(' + props.bgImage + ')'};
  background-size: cover;
  background-repeat: no-repeat;
  color: white;

  :hover {
    box-shadow: 2px 2px 15px 0px rgba(184, 177, 184, 1);
  }

  :last-child {
    margin-bottom: 40px;
  }
`;

const TitleHeading = styled.p`
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 500;
  margin-top: 20px;
`;
