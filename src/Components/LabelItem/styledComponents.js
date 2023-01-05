import styled from "styled-components";

export const Labelitem = styled.li`
  height: 30px;
  width: 100px;
  border-radius: 5px;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 500;
  width: 90%;
  cursor: pointer;
`;

export const Logo = styled.span`
  color: ${props => props.color};
  font-size: 25px;
  margin-top: 10px;
  margin-right: 10px;
`