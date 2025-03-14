import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';

export default function Tabs({ tabs }) {
    return (
        <TabGroup>
            <TabList className="flex w-full border-b-[5px] border-plumpPurpleDark">
                {tabs.map((tab) => (
                    <Tab
                        className="rounded-t-md px-5 pb-1 pt-2 text-base text-plumpPurpleDark outline-none data-[selected]:bg-plumpPurpleDark data-[selected]:text-plumpPurpleLight"
                        key={tab.id}
                    >
                        {tab.label}
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                {tabs.map((tab) => (
                    <TabPanel key={tab.id}>{tab.Component}</TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    );
}
