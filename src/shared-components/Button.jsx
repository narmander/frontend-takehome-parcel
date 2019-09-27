import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PINK } from '../assets/colors';

// component for generic reuse
export const Button = ({ children, onClick, ...props }) => {
  return (
    <>
      <ButtonStyled onClick={onClick} {...props}>
        {children}
      </ButtonStyled>
    </>
  );
};

const ButtonStyled = styled.button`
  padding: 5px;
  color: white;
  background-color: ${PINK};
  width: 150px;
  cursor: pointer;
  border: 1px solid ${PINK};
  border-radius: 15px;
  font-size: 14px;
`;

Button.PropTypes = {
  children: PropTypes.array,
  onClick: PropTypes.func,
}