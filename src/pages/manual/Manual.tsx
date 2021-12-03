import { VFC } from 'react';
import { Box } from '@mui/material';
import { SignUpTemplate } from '../../templates/SignUpTemplate';

type Props = {};

export const Manual: VFC<Props> = () => {
  return (
    <SignUpTemplate>
      <Box></Box>
    </SignUpTemplate>
  );
}
