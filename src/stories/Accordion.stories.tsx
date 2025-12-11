import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "../components/Accordion/Accordion";
import type { AccordionItemData, AccordionProps } from "../components/Accordion/Accordion.types";
import { AccordionContent } from "../components/Accordion/AccordionContent";

interface AccordionStoryArgs extends AccordionProps {
    titleContent: string;
    subtextContent: string;
}

const generateItems = (title: string, subtext: string): AccordionItemData[] => [
  {
    id: "1",
    title: `${title}`, 
    subtext: `${subtext}`,
    content: <AccordionContent key="content-1" />,
  },
  {
    id: "2",
    title: `${title}`,
    subtext: `${subtext}`,
    content: <AccordionContent key="content-2" />,
  },
  {
    id: "3",
    title: `${title}`,
    content: <AccordionContent key="content-3" />,
  },
];

const meta: Meta<AccordionStoryArgs> = {
  component: Accordion, 
  title: "Nile Components/Accordion",
  tags: ["autodocs"],
  
  argTypes: {
    titleContent: {
      description: "Teks judul dasar untuk semua item.",
      control: "text",
    },
    subtextContent: {
      description: "Teks subjudul dasar untuk semua item.",
      control: "text",
    },
    allowMultipleOpen: { control: "boolean" },
    className: { control: 'text' },
    items: { control: false },
  },
  
  args: {
    titleContent: "Accordion title",
    subtextContent: "Accordion subtext/description",
    allowMultipleOpen: false,
    className: '',
  }
};

export default meta;

type Story = StoryObj<AccordionStoryArgs>; 

export const SingleOpen: Story = {
    args: {
        allowMultipleOpen: false,
    },
    render: (args) => {
        const { titleContent, subtextContent, allowMultipleOpen, className } = args;
        const items = generateItems(titleContent, subtextContent);

        return (
            <Accordion 
                items={items}
                allowMultipleOpen={allowMultipleOpen}
                className={className}
                key={allowMultipleOpen ? "multiple" : "single"} 
            />
        );
    },
};

export const MultipleOpen: Story = {
    args: {
        allowMultipleOpen: true,
    },
    render: SingleOpen.render,
};