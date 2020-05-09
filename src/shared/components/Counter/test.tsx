import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Counter from './index';

test('displays initial count of 0', () => {
  render(<Counter />);
  expect(screen.getByTestId('count')).toHaveTextContent('0');
});

test('increases by one', () => {
  render(<Counter />);
  expect(screen.getByTestId('count')).toHaveTextContent('0');
  userEvent.click(screen.getByRole('button', { name: '+' }));
  expect(screen.getByTestId('count')).toHaveTextContent('1');
});

test('increases by five', () => {
  render(<Counter />);
  expect(screen.getByTestId('count')).toHaveTextContent('0');
  userEvent.click(screen.getByRole('button', { name: '++' }));
  expect(screen.getByTestId('count')).toHaveTextContent('5');
});

test('decreases by one', () => {
  render(<Counter />);
  expect(screen.getByTestId('count')).toHaveTextContent('0');
  userEvent.click(screen.getByRole('button', { name: '-' }));
  expect(screen.getByTestId('count')).toHaveTextContent('-1');
});

test('decreases by five', () => {
  render(<Counter />);
  expect(screen.getByTestId('count')).toHaveTextContent('0');
  userEvent.click(screen.getByRole('button', { name: '--' }));
  expect(screen.getByTestId('count')).toHaveTextContent('-5');
});
