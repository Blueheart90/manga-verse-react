import { cn } from '@/lib/utils';
import statusFormSchema from '@/Schemas/statusFormSchema';
import { Textarea } from '@headlessui/react';
import { Formik } from 'formik';
import { useState } from 'react';
import Like from '../Atoms/SvgIcons/Like';
import Trash from '../Atoms/SvgIcons/Trash';
import XMark from '../Atoms/SvgIcons/XMark';
import Modal from '../Modal';
import PrimaryButton from '../PrimaryButton';
import MyListBox from './MyListBox';
import MyRadioGroup from './MyRadioGroup';

export default function LibraryEditModal({
    modal,
    setModal,
    libraryItem,
    handleSubmit,
    handleDelete,
}) {
    const [deleteModal, setDeleteModal] = useState(false);
    const statusOptions = [
        {
            id: 0,
            name: 'Selecciona un estatus',
            value: null,
            available: false,
        },
        {
            id: 1,
            name: 'Quiero leerlo',
            value: 'want to read',
            available: true,
        },
        { id: 2, name: 'Completado', value: 'completed', available: true },
        { id: 3, name: 'Leyendo', value: 'current', available: true },
        { id: 4, name: 'En espera', value: 'on hold', available: true },
        { id: 5, name: 'Abandonado', value: 'dropped', available: true },
        { id: 6, name: 'Re-leyendo', value: 're-reading', available: true },
    ];
    return (
        <Modal show={modal} onClose={() => setModal(false)} maxWidth="lg">
            <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-white px-14 py-8">
                <button
                    onClick={() => {
                        setModal(false);
                    }}
                    className="absolute right-0 top-0 rounded-bl-3xl p-3 text-plumpPurpleDark hover:bg-turquoise hover:text-white"
                >
                    <XMark className="size-6" />
                </button>
                <h5 className="text-xl font-semibold text-plumpPurpleDark">
                    Editar entrada de biblioteca
                </h5>
                <div className="flex items-center gap-2 border border-plumpPurple/25 p-2">
                    <img
                        className="aspect-[17/26] w-12 rounded-sm object-contain object-top"
                        src={libraryItem?.manga?.cover_url}
                        alt={libraryItem?.manga?.title}
                    />
                    <h2 className="text-base text-plumpPurpleDark">
                        {libraryItem?.manga?.title}
                    </h2>
                </div>
                <Formik
                    initialValues={{
                        status: libraryItem?.status || null,
                        recommended: libraryItem?.recommended,
                        notes: libraryItem?.notes || '',
                    }}
                    validationSchema={statusFormSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({
                        handleSubmit,
                        values,
                        isValid,
                        setFieldValue,
                        errors,
                        dirty,
                    }) => (
                        <form
                            className="grid grid-cols-3 items-center gap-4"
                            onSubmit={handleSubmit}
                        >
                            <label
                                className="col-span-1 text-base text-plumpPurpleDark"
                                htmlFor="status"
                            >
                                Estado en la biblioteca
                            </label>

                            <MyListBox
                                className="col-span-2"
                                name="status"
                                options={statusOptions}
                            />

                            <label
                                className="col-span-1 text-base text-plumpPurpleDark"
                                htmlFor="recommended"
                            >
                                Recomendado
                            </label>
                            <MyRadioGroup
                                className="col-span-2"
                                radioOptions={[
                                    {
                                        name: 'Si',
                                        value: 1,
                                        icon: <Like className="w-6" />,
                                    },
                                    {
                                        name: 'No',
                                        value: 0,
                                        icon: (
                                            <Like className="w-6 rotate-180" />
                                        ),
                                    },
                                ]}
                                name="recommended"
                                disabled={false}
                            />

                            <label
                                className="col-span-1 text-base text-plumpPurpleDark"
                                htmlFor="notes"
                            >
                                Notas (opcional)
                            </label>
                            <Textarea
                                className={cn(
                                    'col-span-2 ml-[3px] rounded-md border-transparent text-base text-plumpPurpleDark outline-none ring-1 ring-plumpPurple ring-offset-[3px] focus:border-transparent focus:ring-2 focus:ring-plumpPurple focus:ring-offset-[3px]',
                                )}
                                rows={3}
                                name="notes"
                                value={values.notes}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setFieldValue('notes', value);
                                }}
                            />

                            <div className="col-span-3 mt-4 flex justify-between border-t border-plumpPurple/25 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDeleteModal(true);
                                    }}
                                    className="group mr-2 rounded-md border border-plumpPurple p-2 hover:border-red-500"
                                >
                                    <Trash className="size-6 text-plumpPurple group-hover:text-red-500" />
                                </button>
                                <PrimaryButton
                                    type="submit"
                                    disabled={!(dirty && isValid)}
                                    className="w-40 rounded-md text-base normal-case"
                                >
                                    Guardar cambios
                                </PrimaryButton>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            <Modal
                show={deleteModal}
                onClose={() => {
                    setDeleteModal(false);
                }}
            >
                <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-white px-14 py-8">
                    <h2 className="text-2xl font-bold text-plumpPurpleDark">
                        ¿Deseas eliminar esta entrada de biblioteca?
                    </h2>
                    <p className="text-sm text-plumpPurpleDark">
                        Esta acción no se puede deshacer.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => setModal(false)}
                            className="rounded-md bg-plumpPurple px-4 py-2 text-white transition-colors duration-200 hover:bg-plumpPurple/80"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                handleDelete(libraryItem.id);
                                setDeleteModal(false);
                                setModal(false);
                            }}
                            className="rounded-md bg-red-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </Modal>
        </Modal>
    );
}
