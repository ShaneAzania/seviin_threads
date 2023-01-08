import { Group, FormInputLabel, Input } from "./form-input.styles";

const FormInput = ({ label, ...inputProps }) => {
	return (
		<Group className="mb-3">
			{label ? <FormInputLabel shrink={inputProps.value.length}>{label}</FormInputLabel> : null}
			<Input required {...inputProps} />
		</Group>
	);
};

export default FormInput;

// <FormInput label="Password" name="password" onChange={handleChange} placeholder="" type="password" value={password} />;
