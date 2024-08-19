import { render } from '@testing-library/react'
import InputField from './index'

describe('InputField', () => {
  it('should render the label', () => {
    const { getByText } = render(
      <InputField label="Test Label" inputProps={{}} />
    )

    expect(getByText('Test Label')).toBeInTheDocument()
  })

  it('should render the input with provided props', () => {
    const { getByPlaceholderText } = render(
      <InputField
        label="Test Label"
        inputProps={{
          placeholder: 'Test Placeholder',
          value: 'Test Value',
          onChange: jest.fn(),
        }}
      />
    )

    const inputElement = getByPlaceholderText('Test Placeholder')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('Test Value')
  })

  it('should display the error message when provided', () => {
    const { getByText } = render(
      <InputField
        label="Test Label"
        inputProps={{}}
        errorMessage="Test Error Message"
      />
    )

    expect(getByText('Test Error Message')).toBeInTheDocument()
  })

  it('should not display the error message when not provided', () => {
    const { queryByText } = render(
      <InputField label="Test Label" inputProps={{}} />
    )

    expect(queryByText('Test Error Message')).toBeNull()
  })

  it('should apply the isRequired prop to FormControl', () => {
    const { getByText } = render(
      <InputField label="Test Label" inputProps={{}} isRequired />
    )

    expect(getByText('Test Label')).toBeInTheDocument()
    expect(getByText('*')).toBeInTheDocument()
  })
})
