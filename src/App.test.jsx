import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';

const testCases = [
  {
    value: "84.2",
    from: "Fahrenheit",
    to: "Rankine",
    response: "543.94",
    answerStatus: "Correct",
  },
  {
    value: "317.33",
    from: "Kelvin",
    to: "Fahrenheit",
    response: "111.554",
    answerStatus: "Incorrect",
  },
  {
    value: "25.6",
    from: "Cups",
    to: "Liters",
    response: "6.1",
    answerStatus: "Correct",
  },
  {
    value: "73.12",
    from: "gallons",
    to: "Kelvin",
    response: "19.4",
    answerStatus: "Invalid",
  },
  {
    value: "6.5",
    from: "Fahrenheit",
    to: "Rankine",
    response: "dog",
    answerStatus: "Incorrect",
  },
  {
    value: "136.1",
    from: "dog ",
    to: "Celsius",
    response: "45.32",
    answerStatus: "Invalid",
  },
];


describe('Unit Converter Checker', () => {
  it('should display header', () => {
    const { getByText } = render(<App />);
    expect(getByText("Unit Conversion Checker")).toBeVisible();
  });

  it('button should be disabled when no fields are set', () => {
    const { getByText } = render(<App />);
    expect(getByText('Submit')).toBeDisabled();
  });

  it('button should be disabled when only some fields are set', () => {
    const { getByLabelText, getByText } = render(<App />);
    fireEvent.change(getByLabelText('From'), { target: { value: 'Cups' } });
    expect(getByText('Submit')).toBeDisabled();
  });

  it('button should be enabled when all fields are set', () => {
    const { getByText, getByLabelText } = render(<App />);
    fireEvent.change(getByLabelText('From'), { target: { value: 'Cups' } });
    fireEvent.change(getByLabelText('To'), { target: { value: 'Liters' } });
    fireEvent.change(getByLabelText('Value'), { target: { value: '123' } });
    fireEvent.change(getByLabelText('Student Response'), { target: { value: '789' } });

    const button = getByText('Submit');
    expect(button).toBeEnabled();
  });

  it.each(testCases)(
    'should calculate student\'s answer correctly',
    (testCase) => {
      const { getByText, getByLabelText } = render(<App />);
      fireEvent.change(getByLabelText('From'), { target: { value: testCase.from } });
      fireEvent.change(getByLabelText('To'), { target: { value: testCase.to } });
      fireEvent.change(getByLabelText('Value'), { target: { value: testCase.value } });
      fireEvent.change(getByLabelText('Student Response'), { target: { value: testCase.response } });
  
      const button = getByText('Submit');
      expect(button).toBeEnabled();
      fireEvent.click(button);
  
      expect(getByText(testCase.answerStatus)).toBeVisible();
    },
  );

  it('fields should be disabled after fields are submitted', () => {
    const { getByText, getByLabelText } = render(<App />);
    const from = getByLabelText('From');
    const to = getByLabelText('To');
    const value = getByLabelText('Value');
    const studentResponse = getByLabelText('Student Response');
    fireEvent.change(from, { target: { value: 'Cups' } });
    fireEvent.change(to, { target: { value: 'Liters' } });
    fireEvent.change(value, { target: { value: '123' } });
    fireEvent.change(studentResponse, { target: { value: '789' } });

    const button = getByText('Submit');
    fireEvent.click(button);
    expect(from).toBeDisabled();
    expect(to).toBeDisabled();
    expect(value).toBeDisabled();
    expect(studentResponse).toBeDisabled();
  });

  it('should reset fields when clicking on reset button', () => {
    const { getByText, getByLabelText } = render(<App />);
    const from = getByLabelText('From');
    const to = getByLabelText('To');
    const value = getByLabelText('Value');
    const studentResponse = getByLabelText('Student Response');
    fireEvent.change(from, { target: { value: 'Cups' } });
    fireEvent.change(to, { target: { value: 'Liters' } });
    fireEvent.change(value, { target: { value: '123' } });
    fireEvent.change(studentResponse, { target: { value: '789' } });

    const button = getByText('Submit');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    const resetButton = getByText('Reset');
    expect(resetButton).toBeVisible();
    fireEvent.click(resetButton);

    expect(from).toHaveTextContent('');
    expect(to).toHaveTextContent('');
    expect(value).toHaveTextContent('');
    expect(studentResponse).toHaveTextContent('');
  });
});

