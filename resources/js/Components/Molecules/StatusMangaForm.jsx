import { cn } from '@/lib/utils';
import statusFormSchema from '@/Schemas/statusFormSchema';
import { Textarea } from '@headlessui/react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Like from '../Atoms/SvgIcons/Like';
import Trash from '../Atoms/SvgIcons/Trash';
import XMark from '../Atoms/SvgIcons/XMark';
import Modal from '../Modal';
import PrimaryButton from '../PrimaryButton';
import MyListBox from './MyListBox';
import MyRadioGroup from './MyRadioGroup';

export default function StatusMangaForm() {
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
    const {
        auth,
        data: { manga },
    } = usePage().props;

    const {
        id,
        title,
        cover_art,
        attributes: { lastChapter },
    } = manga;

    const [mangaStatus, setMangaStatus] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const loadUserStatus = async () => {
            try {
                const response = await axios.get(
                    route('manga.status.show', { manga: id }),
                );
                setMangaStatus(response.data.data);
            } catch (error) {
                console.error('Error loading user status:', error);
            }
        };

        if (auth.user) {
            loadUserStatus();
        }
    }, [auth.user, id]);

    const handleSubmit = (values) => {
        axios
            .post(route('manga.status.store', { manga: id }), {
                manga_title: title,
                cover_art,
                user_id: auth.user.id,
                ...values,
            })
            .then((res) => {
                setMangaStatus(res.data.data);
                setModal(false);
                toast.success('Status updated successfully', {
                    position: 'bottom-left',
                    duration: 4000,
                });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: 'bottom-left',
                    duration: 4000,
                });
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(route('manga.status.delete', { status: id }))
            .then(() => {
                setMangaStatus(null);
                setModal(false);
                toast.success('Status deleted successfully', {
                    position: 'bottom-left',
                    duration: 4000,
                });
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: 'bottom-left',
                    duration: 4000,
                });
            });
    };
    return (
        <div className="relative mt-5 flex flex-col justify-center rounded-md border border-plumpPurple p-3">
            <span className="absolute -top-3 left-1/2 w-fit -translate-x-1/2 text-nowrap bg-white px-2 text-center text-base text-plumpPurpleDark">
                {mangaStatus
                    ? 'Actualizar biblioteca'
                    : 'Añadir a tu biblioteca'}
            </span>
            <div className="flex flex-col gap-2">
                {mangaStatus && (
                    <div className="flex flex-col gap-2 border-b border-plumpPurple/25 py-2">
                        <p className="text-center text-sm text-plumpPurpleDark">
                            Guardado en{' '}
                            <span className="font-bold capitalize text-plumpPurpleDark">
                                {mangaStatus.status}
                            </span>
                        </p>
                    </div>
                )}

                <PrimaryButton
                    className="bg-blue-500 text-base normal-case"
                    onClick={() => handleSubmit({ status: 'want to read' })}
                >
                    Quiero leerlo
                </PrimaryButton>
                <PrimaryButton
                    className="bg-green-500 text-base normal-case"
                    onClick={() => handleSubmit({ status: 'completed' })}
                >
                    Completado
                </PrimaryButton>
                <PrimaryButton
                    className="text-base normal-case"
                    onClick={() => handleSubmit({ status: 'current' })}
                >
                    Empezado
                </PrimaryButton>

                {mangaStatus && (
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => setModal(true)}
                            className="text-sm text-plumpPurpleDark"
                        >
                            Editar entrada de biblioteca
                        </button>
                    </div>
                )}
            </div>
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
                        {title}
                    </h5>
                    <Formik
                        initialValues={{
                            status: mangaStatus?.status || null,
                            recommended: mangaStatus?.recommended,
                            notes: mangaStatus?.notes || '',
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

                                {/* <label
                                    className="col-span-1 text-base text-plumpPurpleDark"
                                    htmlFor="progress"
                                >
                                    Capítulos Leidos
                                </label>
                                <div className="col-span-2 flex h-9 items-center overflow-hidden rounded-md ring-1 ring-plumpPurple">
                                    <input
                                        className="h-full w-20 border-none text-base text-plumpPurpleDark"
                                        type="number"
                                        name="progress"
                                        value={values.progress}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setFieldValue('progress', value);
                                        }}
                                    />
                                    <span className="flex h-full w-full items-center justify-center bg-plumpPurpleDark px-2 text-white">
                                        de {lastChapter} capítulos
                                    </span>
                                </div> */}

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
                                        onClick={() =>
                                            handleDelete(mangaStatus.id)
                                        }
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
            </Modal>
        </div>
    );
}
