import { cn } from '@/lib/utils';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

export default function Tabs({ tabs, className }) {
    return (
        <TabGroup>
            <TabList
                className={cn(
                    'flex w-full border-b-[5px] border-plumpPurpleDark',
                    className,
                )}
            >
                {tabs.map((tab) => (
                    <Tab
                        className="rounded-t-md px-5 pb-1 pt-2 text-base text-plumpPurpleDark outline-none data-[selected]:bg-plumpPurpleDark data-[selected]:text-plumpPurpleLight"
                        key={tab.id}
                    >
                        {tab.label}
                    </Tab>
                ))}
            </TabList>
            <TabPanels className="mt-2">
                {tabs.map((tab) => (
                    <TabPanel key={tab.id}>{tab.Component}</TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    );
}
