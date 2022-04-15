import { useController } from 'react-hook-form';

const InputLabelField = ({ label, control, name, err, ...props }) => {
  const { field } = useController({
		control,
		name,
		defaultValue: '',
	});

	return (
    <div className="form-search__item">
			<label className="form-search__label">{label}</label>
			<input {...field} {...props} className="form-search__input" />
			{err && <p className="form-search__error">{err}</p>}
		</div>
	);
};

const RequestData = (props) => {
  console.log('~ data', props);
};

export { InputLabelField, RequestData };
