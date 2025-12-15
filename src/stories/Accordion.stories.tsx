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
    title: `${title} - Item 1`,
    subtext: `${subtext} A`,
    content: <AccordionContent key="content-1" />,
  },
  {
    id: "2",
    title: `${title} - Item 2`,
    subtext: `${subtext} B`,
    content: <AccordionContent key="content-2" />,
  },
  {
    id: "3",
    title: `${title} - Item 3`,
    content: <AccordionContent key="content-3" />,
  },
];

const meta: Meta<AccordionStoryArgs> = {
  component: Accordion, 
  title: "Nile Components/Accordion",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
        description: {
            component: 'Accordion is used for showing and hiding content but only one item can stay open at a time.',
        },
    },
  },
  
  argTypes: {
    titleContent: {
      description: "Base title text used for generating all accordion items.",
      control: "text",
    },
    subtextContent: {
      description: "Base subtext/description used for generating all accordion items.",
      control: "text",
    },
    allowMultipleOpen: { 
        control: "boolean",
        description: "If TRUE, multiple panels can be expanded simultaneously. If FALSE (default), only one panel can be open at a time." 
    },
    className: { 
        control: 'text',
        description: "Optional custom CSS class for the main container."
    },
    items: { 
        control: false,
        description: "The array of item data rendered by the component (controlled internally by Storybook controls).",
        table: { category: "Fn"}
    },
  },
  
  args: {
    titleContent: "Accordion Title",
    subtextContent: "Accordion Subtext/Description",
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
    name: "1. Single Open Mode",
};

export const MultipleOpen: Story = {
    args: {
        allowMultipleOpen: true,
    },
    render: SingleOpen.render,
    name: "2. Multiple Open Mode",
};