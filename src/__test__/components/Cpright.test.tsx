import React from 'react';
import { render, screen } from '@testing-library/react';
import { Cpright } from '../../components/Cpright';

test('rendering Copyright test', () => {
  const wrapper = render(<Cpright sx={{ mt: 8, mb: 4 }} />);

  expect(wrapper.getByText('Your Website')).toBeInTheDocument();

  expect(wrapper.getByText(`Copyright © ${new Date().getFullYear()}.`)).toBeInTheDocument();
});