import PropTypes from 'prop-types';

const TextField = ({
  value,
  type,
  name,
  placeholder,
  required,
  autoFocus,
  className,
  autoComplete,
  onChange,
}) => {
  return (
    <input
      value={value}
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      className={className}
      onChange={onChange}
    />
  );
};

export default TextField;


TextField.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  autoComplete: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};