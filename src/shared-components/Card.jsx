import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Ruby } from '../assets/icons/Ruby';
import { RED, GRAY, OFF_WHITE } from '../assets/colors';

// component is taking in custom props but could easily be switched to be more generic 
// and take different props when scaling for reuse.

export const Card = ({
  downloads,
  href,
  info,
  onIconClick,
  title,
  version,
  toggled,
  ...props
}) => {
  return (
    <CardStyled {...props}>
      <Icon onClick={onIconClick} saved={toggled} />
      <div style={{ flexGrow: 1 }}>
        <div>
          <Title>{title}</Title>
          <SubTitle>{version}</SubTitle>
        </div>
        <Description>{info}</Description>
      </div>
      <Details>
        {downloads}
        <Label>downloads</Label>
        <InfoLink href={href} target="blank">
          More Info
        </InfoLink>
      </Details>
    </CardStyled>
  );
};

const CardStyled = styled.div`
  padding: 15px;
  position: relative;
  background-color: ${OFF_WHITE};
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: ease-in-out 120ms;
  display: flex;
  &:hover {
    transform: scale(1.015);
  }

  width: 100%;
  margin: 30px;

  /* cell phone */
  @media screen and (min-width: 400px) {
    width: 60%;
    margin: 32px auto;
  }

  /* tablet */
  @media screen and (min-width: 700px) {
    width: calc(50% - 64px);
  }

  /* laptop/desktop */
  @media screen and (min-width: 1000px) {
    width: calc(50% - 64px);
  }
`;

// const Icon = styled(({saved, ...props}) => <Ruby {...props} />)`
const Icon = styled(Ruby)`
  width: 50px;
  height: 50px;
  min-width: 50px;
  max-width: 50px;
  cursor: pointer;
  transition: ease-in-out 120ms;

  path {
    stroke: ${RED};
    transition: ease-in-out 120ms;
  }

  &:hover {
    transform: translateY(-2px) scale(1.2);
    path {
      fill: rgba(255, 0, 0, 0.5);
      stroke: white;
    }
  }

  ${props =>
    props.saved &&
    css`
      path {
        fill: ${RED};
        stroke: white;
      }

      &:hover {
        path {
          fill: ${RED};
        }
      }
    `}
`;

const Title = styled.h3`
  margin: 0 16px 0 0;
  font-size: 24px;
  font-weight: 700;
  display: inline-block;
`;

const SubTitle = styled.span`
  display: inline-block;
`;

const Description = styled.p`
  font-family: Lato, sans-serif;
  color: ${GRAY};
  margin-right: 5px;
`;

const Details = styled.div`
  text-align: right;
  width: 70px;
  position: relative;
  margin-top: 3px;
`;

const Label = styled.span`
  display: block;
  color: ${GRAY};
  font-family: Lato, sans-serif;
`;

const InfoLink = styled.a`
  position: absolute;
  display: block;
  text-decoration: none;
  font-family: Lato, sans-serif;
  transition: ease-in-out 120ms;
  width: 70px;

  &:link {
    color: ${RED};
  }

  &:hover {
    transform: translateY(-1px) scale(1.1);
    color: ${RED};
  }
`;


Card.PropTypes = {
  downloads: PropTypes.number,
  href: PropTypes.string,
  info: PropTypes.string,
  onIconClick: PropTypes.func,
  title: PropTypes.string,
  version: PropTypes.string,
  toggled: PropTypes.func,
}