import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 12px;
  padding: 8px 10px;
  margin-bottom: 16px;
  border-bottom: groove 4px;
  > nav {
    gap: 20px;
    display: flex;
    align-items: center;
  }
`;

export const NavLinkSt = styled(NavLink)`
  padding: 8px 0px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  font-weight: 500;
  &.active > button {
    color: white;
    background-color: #7e52a1;
  }
`;
