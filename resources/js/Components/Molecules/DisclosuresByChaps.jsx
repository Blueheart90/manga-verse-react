import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';

export default function DisclosuresByChaps({ chapters }) {
    return (
        <div>
            {Object.entries(chapters).map(
                ([chapterNum, data], indexChapter) => (
                    <Disclosure>
                        <DisclosureButton as="div">
                            <div className="ml-4 flex cursor-pointer items-center gap-2 px-2 py-2 hover:bg-plumpPurpleLight">
                                <Document className="size-6" />

                                <span className="font-semibold">
                                    Capitulo {chapterNum || 'Sin Clasificar'}
                                </span>
                            </div>
                        </DisclosureButton>
                        {data.map((chapter) => (
                            <DisclosurePanel
                                key={chapter.id}
                                transition
                                className="my-1 ml-8 flex origin-top items-center justify-between px-1 text-sm text-plumpPurpleDark transition duration-200 ease-out hover:bg-plumpPurpleLight data-[closed]:-translate-y-4 data-[closed]:opacity-0"
                            >
                                <div className="flex items-center gap-2 py-1">
                                    <ArrowCorner className="size-6" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Flag
                                                className="w-6"
                                                lang={chapter.language}
                                            />
                                            <span className="cursor-pointer truncate font-bold">
                                                {chapter.title ||
                                                    `Capitulo - ${chapterNum}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Group className="size-6" />

                                            <span className="capitalize">
                                                {chapter['scanlation_group']}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="flex gap-1">
                                        <Clock className="size-5" />
                                        <span>
                                            {chapter['diff_publish_at']}
                                        </span>
                                    </span>
                                    <EyeSlash className="size-5" />
                                </div>
                            </DisclosurePanel>
                        ))}
                    </Disclosure>
                ),
            )}
        </div>
    );
}
