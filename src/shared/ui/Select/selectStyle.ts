// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

export const selectStyle = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: state.isFocused ? '#EC5B37' : '#7f7f7f',
    fontWeight: '500',
    borderRadius: '1.2rem',
    boxShadow: state.isFocused ? '0 0 0 1px rgba(236, 91, 55, 1)' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#EC5B37' : baseStyles.borderColor,
    },
    minHeight: '3rem',
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    paddingTop: window.innerWidth < 768 ? '0' : '2px',
    paddingBottom: window.innerWidth < 768 ? '0' : '2px',
    fontSize: window.innerWidth < 768 ? '1.6rem' : '2rem',
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isSelected
      ? '#EC5B37'
      : state.isFocused
        ? 'rgba(236, 91, 55, 0.1)'
        : undefined,
    fontWeight: '500',
    color: state.isSelected ? 'white' : 'black',
    '&:active': {
      backgroundColor: '#EC5B37',
    },
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    fontWeight: '500',
    color: '#000',
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
    padding: window.innerWidth < 768 ? '4px' : '8px',
  }),
};
