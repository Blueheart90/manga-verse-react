import Avatar from '@/Components/Atoms/Avatar';
import Camera from '@/Components/Atoms/SvgIcons/Camera';
import Close from '@/Components/Atoms/SvgIcons/Close';
import { useRef, useState } from 'react';

const InputAvatar = ({
    setShowRemovePreview,
    showRemovePreview,
    currentAvatar,
    onImageSelect,
    setData,
    reset,
}) => {
    const [previewImage, setPreviewImage] = useState(null);
    const inputPhotoRef = useRef(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            // setData('profile_photo_path', file);
            onImageSelect(file);
            setPreviewImage(URL.createObjectURL(file));
            setShowRemovePreview(true);
        }
    };
    const handleImageRemove = (event) => {
        console.log('quitando foto');

        event.stopPropagation();
        inputPhotoRef.current.value = null;
        reset('photo');
        setPreviewImage();
    };

    return (
        <div
            onClick={() => {
                inputPhotoRef.current.click();
            }}
            className="group relative inline-flex cursor-pointer"
        >
            {previewImage ? (
                <Avatar src={previewImage} alt="avatar" />
            ) : (
                <Avatar src={currentAvatar} alt="avatar" />
            )}
            <input
                id="profile_photo_path"
                ref={inputPhotoRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

            <Camera className="stroke-primary absolute left-1/2 top-1/2 -ml-5 -mt-5 w-10 rounded-full p-1 opacity-0 transition-all duration-500 group-hover:opacity-100" />
            {previewImage && showRemovePreview ? (
                <Close
                    onClick={handleImageRemove}
                    className="text-light absolute right-0 top-0 w-7 rounded-full bg-red-500 text-xs"
                />
            ) : null}
        </div>
    );
};

export default InputAvatar;
