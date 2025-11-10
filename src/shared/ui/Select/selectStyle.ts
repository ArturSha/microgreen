// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

const baseColor = '#7696a5';
const controlColor = '#b1bfc4';
const optionsColorFocused = '#c8d8d8';
const beigeColor = '#efe7df';

export const selectStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? baseColor : '#7f7f7f',
    fontWeight: '500',
    borderRadius: '1.2rem',
    boxShadow: state.isFocused ? `0 0 0 1px ${baseColor}` : 'none',
    '&:hover': {
      borderColor: state.isFocused ? baseColor : baseStyles.borderColor,
    },
    minHeight: '3rem',
    backgroundColor: controlColor,
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    paddingTop: window.innerWidth < 768 ? '0' : '0',
    paddingBottom: window.innerWidth < 768 ? '0' : '0',
    fontSize: window.innerWidth < 768 ? '1.4rem' : '1.6rem',
    color: beigeColor,
    fontSize: '20px',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected
      ? baseColor
      : state.isFocused
        ? optionsColorFocused
        : undefined,
    fontWeight: '500',
    color: state.isSelected ? 'white' : 'black',
    '&:active': {
      backgroundColor: baseColor,
    },
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    fontWeight: '500',
    fontSize: '20px',
    color: beigeColor,
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: '#494949',
    fontSize: window.innerWidth < 768 ? '1.2rem' : '1.4rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  }),
  clearIndicator: (baseStyles) => ({
    ...baseStyles,
    padding: window.innerWidth < 768 ? '4px' : '8px',
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    padding: window.innerWidth < 768 ? '2px' : '4px',
  }),
};
