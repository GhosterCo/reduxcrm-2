import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../Form';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../../store';

describe('Form Component', () => {
  test('renders the form with name and email fields', () => {
    render(
      <Provider store={store}>
        <Router>
          <Form title="Edit User" id={1} name="John Doe" email="john.doe@example.com" />
        </Router>
      </Provider>
    );
    
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Router>
          <Form title="Edit User" id={1} name="John Doe" email="john.doe@example.com" />
        </Router>
      </Provider>
    );

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.clear(nameInput);
    await user.type(nameInput, 'Jane Doe');
    await user.clear(emailInput);
    await user.type(emailInput, 'jane@example.com');

    await user.click(submitButton);

    expect(nameInput).toHaveValue('Jane Doe');
    expect(emailInput).toHaveValue('jane@example.com');
  });
});
