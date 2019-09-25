import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { Ruby as R } from '../../assets/icons/Ruby';

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
      <Ruby onClick={onIconClick} saved={toggled ? 1 : 0}/>
      <div style={{ flexGrow: 1 }}>
        <div>
          <Title>{title}</Title>
          <Version>{version}</Version>
        </div>
        <Description>{info}</Description>
      </div>
      <Downloads>
        {downloads}
        <Label>downloads</Label>
      </Downloads>
    </CardStyled>
  );
};

const Label = styled.span`
  display: block;
  font-family: Lato, sans-serif;
`;

const CardStyled = styled.div`
  padding: 16px;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: ease-in-out 120ms;
  display: flex;
  &:hover {
    transform: scale(1.015);
  }

  width: 100%;
  margin: 32px;

  /* tablet */
  @media screen and (min-width: 640px) {
    /* width: calc(50% - 64px); */
    width: 60%;
    margin: 32px auto;
  }

  /* laptop */
  @media screen and (min-width: 800px) {
    width: calc(50% - 64px);
  }

  /* desktop */
  @media screen and (min-width: 1000px) {
    width: calc(33% - 64px);
  }
`;

const Ruby = styled(R)`
  width: 50px;
  height: 50px;
  min-width: 50px;
  max-width: 50px;
  cursor: pointer;
  transition: ease-in-out 120ms;

  path {
    stroke: red;
    transition: ease-in-out 120ms;
  }

  ${props =>
    !!props.saved &&
    css`
      path {
        fill: red;
        stroke: white;
      }
    `}

  &:hover {
    transform: translateY(-2px) scale(1.2);
    path {
      fill: red;
      stroke: white;
    }
  }
`;

const Title = styled.h3`
  margin: 0 16px 0 0;
  font-size: 24px;
  font-weight: 700;
  display: inline-block;
`;

const Version = styled.span`
  display: inline-block;
`;

const Description = styled.p`
  font-family: Lato, sans-serif;
`;

const Downloads = styled.span`
  text-align: right;
  width: 150px;
`;
