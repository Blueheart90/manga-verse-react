import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';
import { twMerge } from 'tailwind-merge';

export default function SocialShare({ size = 40, className = '' }) {
    const baseClasses = 'flex justify-between';
    const combinedClasses = twMerge(baseClasses, className);
    const shareUrl = 'http://mangaverse.com';
    return (
        <div className={combinedClasses}>
            <div className="flex items-center gap-2">
                <img
                    className="size-16 rounded-full border-4 border-plumpPurpleDark object-cover object-center lg:size-24 lg:border-[6px]"
                    src="https://media2.giphy.com/media/c2lbMLWfL1mQ8/200.webp?cid=ecf05e47629s59k3fssbr48vk6s5lmhowvhcnm1aigk0qhwt&ep=v1_gifs_related&rid=200.webp&ct=g"
                    alt=""
                />
                <div className="text-base text-white">
                    <span className="block font-bold">Comparte MangaVerse</span>
                    con tus amigos
                </div>
            </div>
            <div className="flex gap-2">
                <TelegramShareButton url={shareUrl}>
                    <TelegramIcon size={size} round />
                </TelegramShareButton>
                <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={size} round />
                </TwitterShareButton>
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={size} round />
                </FacebookShareButton>
                <RedditShareButton url={shareUrl}>
                    <RedditIcon size={size} round />
                </RedditShareButton>
                <EmailShareButton url={shareUrl}>
                    <EmailIcon size={size} round />
                </EmailShareButton>
            </div>
        </div>
    );
}
