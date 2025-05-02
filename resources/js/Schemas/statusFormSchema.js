import * as Yup from 'yup';

const statusFormSchema = Yup.object({
    status: Yup.string().required('Debes indicar un estado'),
    recommended: Yup.boolean().required('Debes indicar si lo recomiendas'),
});

export default statusFormSchema;
