import reviewFormSchema from '@/Schemas/reviewFormSchema';
import { usePage } from '@inertiajs/react';
import { ErrorMessage, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import Like from '../Atoms/SvgIcons/Like';
import InputRichTextQuill from '../Molecules/InputRichTextQuill';
import MyRadioGroup from '../Molecules/MyRadioGroup';
import RatingInput from '../Molecules/RatingInput';
import PrimaryButton from '../PrimaryButton';

export default function ReviewForm({ setReviews, reviews }) {
    const {
        auth,
        data: { manga },
    } = usePage().props;
    const { id, title, cover_art } = manga;
    const [oldReview, setOldReview] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadUserReview = async () => {
            try {
                const response = await axios.get(
                    route('manga.review.user', { manga: id }),
                );
                setOldReview(response.data);
            } catch (error) {
                console.error('Error loading user review:', error);
            }
        };

        if (auth.user) {
            loadUserReview();
        }
    }, [auth.user, id]);

    const handleTest = (values) => {
        console.log('test', values);
    };
    const handleSubmitReview = (values, { resetForm }) => {
        setIsLoading(true);
        const dataForm = {
            manga_title: title,
            cover_art,
            user_id: auth.user.id,
            title: values.title,
            content: values.content,
            recommended: values.recommended,
            rating: values.rating,
        };

        toast.success('This is a success toast');
        axios
            .post(route('manga.review.store', { manga: id }), dataForm)
            .then((res) => {
                setTimeout(() => {
                    setReviews([...reviews, res.data.newReview]);
                    toast.success(res.data.message, {
                        position: 'bottom-left',
                        duration: 4000,
                    });

                    console.log({ res });

                    setIsLoading(false);
                }, 500);
            });
        console.log(values);
    };

    const handleUpdateReview = (values, review) => {
        setIsLoading(true);
        axios
            .put(route('manga.review.update', { review: review.id }), values)
            .then((res) => {
                // se actualiza el review en el array de reviews
                const updatedReviews = reviews.map((review) => {
                    if (review.id === res.data.newReview.id) {
                        review.content = res.data.newReview.content;
                        review.recommended = res.data.newReview.recommended;
                        review.title = res.data.newReview.title;
                        review.rating = res.data.newReview.rating;
                    }
                    return review;
                });
                setReviews(updatedReviews);
                toast.success(res.data.message, {
                    position: 'bottom-left',
                    duration: 4000,
                });
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: 'bottom-left',
                    duration: 4000,
                });
                setIsLoading(false);
            });
        console.log({ values, review });
    };
    return (
        <div>
            <Formik
                initialValues={{
                    title: '',
                    content: '',
                    recommended: null,
                    rating: null,
                }}
                validationSchema={reviewFormSchema}
                onSubmit={
                    (values, { resetForm }) =>
                        handleSubmitReview(values, resetForm)
                    // handleTest(values)
                }
            >
                {({
                    handleSubmit,
                    values,
                    isValid,
                    setFieldValue,
                    errors,
                    dirty,
                }) => {
                    useEffect(() => {
                        //llenar formulario con los datos anteriores
                        if (Object.keys(oldReview).length > 0) {
                            setFieldValue('content', oldReview.content);
                            setFieldValue(
                                'recommended',
                                oldReview.recommended * 1,
                            );
                            setFieldValue('title', oldReview.title);
                            setFieldValue('rating', oldReview.rating);
                        }
                    }, [oldReview]);
                    return (
                        <form className="space-y-2" onSubmit={handleSubmit}>
                            <div className="flex items-center justify-between gap-4">
                                <MyRadioGroup
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
                                    label="¿Lo recomiendas?"
                                    name="recommended"
                                />
                                <RatingInput name="rating" />
                            </div>
                            <input
                                className="w-full rounded-md border-plumpPurpleDark text-plumpPurpleDark"
                                type="text"
                                placeholder="Titulo"
                                name="title"
                                value={values.title}
                                onChange={(e) =>
                                    setFieldValue('title', e.target.value)
                                }
                            />

                            <InputRichTextQuill name="content" />
                            <div className="flex justify-end">
                                {Object.keys(oldReview).length ? (
                                    <PrimaryButton
                                        type="button"
                                        onClick={() =>
                                            handleUpdateReview(
                                                values,
                                                oldReview,
                                            )
                                        }
                                        disabled={!(dirty && isValid)}
                                        className="text-base normal-case"
                                    >
                                        Actualizar
                                    </PrimaryButton>
                                ) : (
                                    <PrimaryButton
                                        type="submit"
                                        disabled={!(dirty && isValid)}
                                        className="text-base normal-case"
                                    >
                                        Publicar
                                    </PrimaryButton>
                                )}
                            </div>
                            <div>
                                <ErrorMessage
                                    name="content"
                                    render={(msg) => (
                                        <div className="text-sm text-red-600">
                                            *{msg}
                                        </div>
                                    )}
                                />
                                <ErrorMessage
                                    name="recommended"
                                    render={(msg) => (
                                        <div className="text-sm text-red-600">
                                            *{msg}
                                        </div>
                                    )}
                                />
                                <ErrorMessage
                                    name="rating"
                                    render={(msg) => (
                                        <div className="text-sm text-red-600">
                                            *{msg}
                                        </div>
                                    )}
                                />
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}
