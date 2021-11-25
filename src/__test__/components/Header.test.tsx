import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { ReactRoutes } from '../../ReactRoutes'

test('rendering signInPage header test', () => {
  const wrapper = render(<MemoryRouter><ReactRoutes/></MemoryRouter>);

  expect(wrapper.getByText('外注管理システム')).toBeInTheDocument();
});