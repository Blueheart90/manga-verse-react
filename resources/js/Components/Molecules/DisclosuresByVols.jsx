import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react';
import Flag from '../Atoms/Flag';
import Arrow from '../Atoms/SvgIcons/Arrow';
import ArrowCorner from '../Atoms/SvgIcons/ArrowCorner';
import Clock from '../Atoms/SvgIcons/Clock';
import Document from '../Atoms/SvgIcons/Document';
import EyeSlash from '../Atoms/SvgIcons/EyeSlash';
import Group from '../Atoms/SvgIcons/Group';
import Library from '../Atoms/SvgIcons/Library';
export default function DisclosuresByVols({ volumes }) {
    return (
        <>
            {volumes.map((vol, indexVol) => (
                <Disclosure defaultOpen={true} key={vol['volume_number']}>
                    <DisclosureButton className="group flex w-full items-center justify-between border-l-4 border-transparent p-2 text-plumpPurpleDark transition-all duration-200 hover:border-plumpPurple hover:bg-plumpPurpleLight">
                        <div className="flex gap-2">
                            <Library className="size-6" />
                            <p className="text-base">
                                {vol['volume_number'] !== ''
                                    ? `Volumen ${vol['volume_number']}`
                                    : 'Sin Clasificar'}
                            </p>
                        </div>

                        <Arrow
                            direction="down"
                            className="size-6 transition-all duration-300 group-data-[open]:rotate-180"
                        />
                    </DisclosureButton>
                    <DisclosurePanel
                        transition
                        className="origin-top text-sm text-plumpPurpleDark transition duration-200 ease-out data-[closed]:-translate-y-4 data-[closed]:opacity-0"
                    >
                        {Object.entries(vol.chapters).map(
                            ([chapterNum, data], indexChapter) => (
                                <Disclosure
                                    defaultOpen={
                                        indexVol === 0 && indexChapter === 0
                                    }
                                    key={`vol${vol['volume_number']}-ch${chapterNum}`}
                                >
                                    <DisclosureButton as="div">
                                        <div className="ml-4 flex cursor-pointer items-center gap-2 px-2 py-2 hover:bg-plumpPurpleLight">
                                            <Document className="size-6" />

                                            <span className="font-semibold">
                                                Capitulo{' '}
                                                {chapterNum || 'Sin Clasificar'}
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
                                                            lang={
                                                                chapter.language
                                                            }
                                                        />
                                                        <span className="cursor-pointer truncate font-bold">
                                                            {chapter.title ||
                                                                `Capitulo - ${chapterNum}`}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Group className="size-6" />

                                                        <span className="capitalize">
                                                            {
                                                                chapter[
                                                                    'scanlation_group'
                                                                ]
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <span className="flex gap-1">
                                                    <Clock className="size-5" />
                                                    <span>
                                                        {
                                                            chapter[
                                                                'diff_publish_at'
                                                            ]
                                                        }
                                                    </span>
                                                </span>
                                                <EyeSlash className="size-5" />
                                            </div>
                                        </DisclosurePanel>
                                    ))}
                                </Disclosure>
                            ),
                        )}
                    </DisclosurePanel>
                </Disclosure>
            ))}
        </>
    );
}
