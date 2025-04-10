import * as Yup from 'yup';

const reviewFormSchema = Yup.object({
    title: Yup.string()
        .min(3, 'Titulo muy corto, mínimo 3 caracteres')
        .max(100, 'Titulo muy largo, máximo 100 caracteres')
        .required('Debes escribir un titulo'),
    content: Yup.string()
        .min(20, 'Reseña muy corta, mínimo 20 caracteres')
        .max(500, 'Reseña muy larga, máximo 500 caracteres')
        .required('Debes escribir una reseña'),
    recommended: Yup.boolean()
        .oneOf([true, false], 'Debes indicar entre si o no')
        .required('Debes indicar si lo recomiendas'),
    rating: Yup.number()
        .min(1, 'Debes indicar un valor entre 1 y 5 estrellas')
        .max(5, 'Debes indicar un valor entre 1 y 5 estrellas')
        .required('Debes indicar un valor de estrellas'),
});

export default reviewFormSchema;
