import styled from 'styled-components';
import { Link as ReachRouterLink } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  background-color: ${(props) =>
    props.className === 'signed-in'
      ? ({ theme }) => theme.body
      : ({ theme }) => theme.body};
  height: 50px;
  margin: ${(props) => (props.className === 'signed-in' ? '0 28px' : '0')};
  padding: ${(props) =>
    props.className === 'signed-in' ? '10px 0px' : '20px 56px'};
  justify-content: ${(props) =>
    props.className === 'signed-in' ? '' : 'space-between'};
  align-items: center;
  transition: height 200ms ease-in-out;
  a {
    display: flex;
  }

  @media (max-width: 1000px) {
    margin: ${(props) => (props.className === 'signed-in' ? '0 30px' : '0')};
    padding: ${(props) =>
      props.className === 'signed-in' ? '10px 0px' : '10px 15px'};
  }
  @media (max-width: 800px) {
    position: ${(props) =>
      props.className === 'signed-in' ? 'relative' : 'sticky'};

    margin: ${(props) =>
      props.className === 'signed-in' ? '0 30px 0 15px' : '0'};

    padding: ${(props) =>
      props.className === 'signed-in' ? '10px 0px' : '25px 20px'};
  }
  @media (max-width: 600px) {
    margin: ${(props) => (props.className === 'signed-in' ? '0 15px' : '0')};
    padding: ${(props) =>
      props.className === 'signed-in' ? '10px 0px' : '15px 10px'};
  }
  @media (max-width: 285px) {
    margin: 5px;
    padding: 0 5px;
  }

  z-index: 9999;
`;

export const Link = styled.p`
  color: #fffffe;
  text-decoration: none;
  margin-right: 30px;
  font-weight: ${({ active }) => (active === 'true' ? '700' : 'normal')};
  cursor: pointer;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  &:hover {
    font-weight: bold;
  }
  &:last-of-type {
    margin-right: 0;
  }
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  border-radius: 40px;
  width: 420px;
  padding: 5px 15px;
  svg {
    color: white;
    cursor: pointer;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

export const SearchInput = styled.input`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid white;
  transition: width 0.5s;
  height: 2rem;
  font-size: 14px;
  padding: 0 10px;
  width: 90%;
  outline: 0;
  border: 0;
  &:focus {
    outline: 0;
  }
  &:focus + ${Search} {
    border: blue auto 3px !important;
  }
`;

export const SearchIcon = styled.button`
  display: flex;
  align-items: center;
  outline: 0;
  border: 0;
  cursor: pointer;
  background-color: transparent;
  border-radius: 20px;
  transition: 200ms background-color ease;
  padding: 10px;
  svg {
    color: ${({ theme }) => theme.title};
    width: auto;
    height: 18px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.body};
  }
`;

export const ButtonLink = styled(ReachRouterLink)`
  display: block;
  background-color: ${({ theme }) => theme.accent};
  padding: 10px 20px;
  color: ${({ theme }) => theme.buttonText};
  border: 0;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  justify-content: flex-start;
  transition: 100ms all ease;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.accentHover};
  }
`;

export const Picture = styled.button`
  background: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;
  border: 0;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  cursor: pointer;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  line-height: normal;
  margin: 0 10px 0 0;

  @media (max-width: 720px) {
    display: none;
  }
`;
export const TextLink = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1rem !important;
  line-height: normal;
  cursor: default;
`;

export const SignoutLink = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1rem !important;
  line-height: normal;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.accentHover};
    text-decoration: underline;
  }
`;

export const Logo = styled.img`
  height: 32px;
  width: auto;
  margin-right: 40px;
  padding: 15px 10px 15px 0;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  @media (max-width: 1000px) {
    height: 26px;
    width: auto;
  }

  @media (max-width: 325px) {
    margin-right: 10px;
  }

  @media (max-width: 285px) {
    margin-right: 0;
  }
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const CenterGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const Dropdown = styled.div`
  display: none;
  position: absolute;
  background-color: ${({ theme }) => theme.background};
  padding: 15px 25px;
  width: 150px;
  top: 2.5rem;
  right: 10px;
  box-shadow: 0px 10px 40px -15px ${({ theme }) => theme.smallBoxShadow};
  transition: all 200ms ease;
  ${Group}:last-of-type ${Link} {
    cursor: pointer;
  }
  ${LeftGroup} {
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0;
    }
    ${Link}, ${Picture} {
      cursor: default;
    }
  }
  button {
    margin-right: 10px;
    &:focus {
      outline: 0;
    }
  }
  p {
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  button {
    cursor: pointer;
  }
  &:hover > ${Dropdown} {
    display: flex;
    flex-direction: column;
  }
`;
