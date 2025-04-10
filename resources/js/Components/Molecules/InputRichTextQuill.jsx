import { useField } from 'formik';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import '../../../css/customQuillStyle.css';
import Editor from '../Atoms/Editor';

const Delta = Quill.import('delta');

const InputRichTextQuill = ({ name }) => {
    const [field, meta, helpers] = useField(name);
    const [lastChange, setLastChange] = useState();
    const [htmlContent, setHtmlContent] = useState('');
    const quillRef = useRef();

    useEffect(() => {
        // Cuando el valor del campo cambie, actualizamos el contenido del editor
        if (quillRef.current) {
            const quill = quillRef.current;
            if (field.value && quill.root.innerHTML !== field.value) {
                quill.root.innerHTML = field.value;
                setHtmlContent(field.value);
            }
        }
    }, [field.value]);

    const handleChange = (delta) => {
        // Convertir Delta a HTML
        const quill = quillRef.current;
        if (quill) {
            const html = quill.root.innerHTML;
            helpers.setValue(html);
            setHtmlContent(html);
            setLastChange(delta);
        }
    };

    return (
        <div>
            <Editor
                ref={quillRef}
                defaultValue={field.value || ''}
                onSelectionChange={(range) => {
                    console.log(range);
                }}
                onTextChange={handleChange}
            />
        </div>
    );
};

export default InputRichTextQuill;
