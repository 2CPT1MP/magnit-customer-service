import { useState } from 'react';

const useForm = (initialFormState, updaterFunction) => {
    const [updatedFormData, setUpdatedFormData] = useState(initialFormState);
    const [initialFormData, setInitialFormData] = useState(initialFormState);

    const onChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        updaterFunction({...updatedFormData, [field]: value});
        setUpdatedFormData({...updatedFormData, [field]: value})
    }

    const onReset = (event) => {
        event.preventDefault();
        updaterFunction(initialFormState);
        setUpdatedFormData(initialFormState);
    }

    const onSubmit = (event, submitHandler) => {
        event.preventDefault();
        setInitialFormData(updatedFormData);
        submitHandler(updatedFormData);
    }

    const isModified = () => {
        return JSON.stringify(updatedFormData) !== JSON.stringify(initialFormData);
    }

    return {formData: updatedFormData, isModified, onChange, onReset, onSubmit};
}

export default useForm;