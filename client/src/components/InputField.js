import { useController } from 'react-hook-form';

const TextField = ({
	inputClass,
	type,
	name,
	control,
	defaultValue,
	err,
	...props
}) => {
	const { field } = useController({
		name,
		control,
		defaultValue: defaultValue || '',
	});
	return (
		<>
			<input type={type} {...props} {...field} className={inputClass} />
			{err && <p className="form__errValidate">{err}</p>}
		</>
	);
};

export { TextField };
