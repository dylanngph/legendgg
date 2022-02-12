import PropTypes from 'prop-types';
import styled from 'styled-components';

function Burger({ setOpen, open }) {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

const StyledBurger = styled.button`
  width: 1.8rem;
  height: 2rem;
  position: relative;
  top: 14px;
  right: 5px;
  z-index: 20;
  display: none;
  border: none;
  cursor: pointer;
  background: transparent;
  display: block;
  &:focus {
    outline: none;
  }
  @media (max-width: 900px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 1.8rem;
    height: 3px;
    background-color: #111111;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    position: relative;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

Burger.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Burger
