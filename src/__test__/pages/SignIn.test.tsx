import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ReactRoutes } from '../../ReactRoutes';

test('rendering signInPage test', () => {
  const wrapper = render(<MemoryRouter><ReactRoutes/></MemoryRouter>);
  // wrapper.debug();

  expect(wrapper.getByText('外注管理システム')).toBeInTheDocument();

  expect(wrapper.getAllByText('ログイン')[0]).toBeInTheDocument();

  const signInButton = wrapper.getByRole('button', { name: 'ログイン' });
  expect(signInButton).toBeInTheDocument();

  const emailText = wrapper.getByRole('textbox', { name: 'メールアドレス' });
  expect(emailText).toBeInTheDocument();

  const password = wrapper.getByLabelText('パスワード');
  expect(password).toBeInTheDocument();

  expect(wrapper.getByText('Your Website')).toBeInTheDocument();

  expect(wrapper.getByText(`Copyright © ${new Date().getFullYear()}.`)).toBeInTheDocument();

});

test('signInEvent test', async () => {
  const wrapper = render(<MemoryRouter><ReactRoutes/></MemoryRouter>);

  await userEvent.click(wrapper.getByRole('button', { name: 'ログイン' }));

});