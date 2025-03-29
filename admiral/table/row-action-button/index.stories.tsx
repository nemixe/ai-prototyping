import { Meta, StoryObj } from "@storybook/react";
import RowActionButtonsComponent, { IRowActionProps } from "./index";

const meta: Meta<IRowActionProps> = {
  title: "Design System/Datatable/RowActionButtons",
  component: RowActionButtonsComponent,
  tags: ["autodocs"],
  argTypes: {
    actions: {
      description: "List of button with IRowActionProps",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "List of the action button, including detail, edit and delete buttons that used in DataTable components. <br/> More about IRowActionButtonProps in Components/molecules/RowActionButtons/RowActionButtons directory",
      },
    },
  },
};

export default meta;

export const RowActionButtons: StoryObj<IRowActionProps> = {
  args: {
    actions: [
      {
        type: "view",
        href: `#`,
        title: "view",
      },
      {
        type: "edit",
        href: `#`,
        title: "edit",
      },
      {
        type: "delete",
        title: "delete",
        onClick: () => {
          // TODO : handle delete function
        },
      },
    ],
  },
};
