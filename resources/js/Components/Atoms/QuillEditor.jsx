import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import '../../../css/customQuillStyle.css';

import { useField } from 'formik';
import { useEffect, useRef } from 'react';

const QuillEditor = ({ label = '', ...props }) => {
    const [field, meta, helpers] = useField(props.name);
    const quillContainer = useRef(null);

    useEffect(() => {
        if (quillContainer.current) {
            // Solo crea una instancia de Quill si no existe
            if (!quillContainer.current.__quill) {
                const quill = new Quill(quillContainer.current, {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline'],
                            ['image', 'code-block'],
                        ],
                    },
                });
                quillContainer.current.__quill = quill; // Guarda la instancia
            }

            // Actualiza el contenido usando la instancia existente
            const quill = quillContainer.current.__quill;
            quill.root.innerHTML = field.value;

            // Escucha cambios solo si no hay un listener existente
            if (!quillContainer.current.__listener) {
                quill.on('text-change', () => {
                    const content = quill.root.innerHTML;
                    helpers.setValue(content);
                });
                quillContainer.current.__listener = true;
            }
        }
    }, [field.value]);

    return (
        <div>
            <div ref={quillContainer} style={{ height: '150px' }} />
        </div>
    );
};

export default QuillEditor;
