import { Box } from '@mui/material';
import styled from 'styled-components';

export const FieldBox = (props) => {
  return <WrapperFieldBox {...props} />;
}

export const LabelBox = (props) => {
  return <WrapperLabelBox {...props} />;
}

const WrapperFieldBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: 10px;
`;

const WrapperLabelBox = styled(Box)`
  color: #432C32;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
`;