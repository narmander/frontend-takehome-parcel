import React, { useState } from 'react';
import styled from 'styled-components';


export const Button = ({ children, onClick, ...props }) => {
    const [active, setActive ] = useState(0);
  return Array.isArray(children) ? (
    children.map((child, i) => {
      return (
        <ButtonStyled
          isActive={active === i}
          onClick={(e) => { setActive(i); onClick(e); }}
          order={(() => {
            if (i === 0) return 'first';
            if (i === children.length - 1) return 'last';
            else return 'middle';
          })()}
          {...props}
        >
          {child}
        </ButtonStyled>
      );
    })
  ) : (
    <ButtonStyled onClick={onClick} {...props}>{children}</ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  padding: 5px;
  width: 150px;
  cursor: pointer;
  border: 1px solid ${theme => theme.secondary};
  border-radius: ${props => {
    switch (props.order) {
      case 'first':
        return '15px 0 0 15px';
      case 'middle':
        return '0';
      case 'last':
        return '0 15px 15px 0px';
    }
  }};

  font-size: 20px;
  background-color: ${props => {
    return props.isActive ? props.theme.secondary : "transparent"
  }};
`;
