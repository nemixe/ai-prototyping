import { Meta, StoryObj } from "@storybook/react";
import UserAvatar, { TUserAvatarProps } from ".";

const meta: Meta<TUserAvatarProps> = {
  title: "Design System/UserAvatar/Default",
  component: UserAvatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "User Avatar component is used to display user avatar.",
      },
    },
  },
  argTypes: {
    info: {
      description: "User information",
      control: {
        type: "object",
      },
    },
  },
};

export default meta;

export const DefaultAvatar: StoryObj<TUserAvatarProps> = {
  args: {
    info: {
      fullname: "John Doe",
      roles: [{ name: "Admin" }, { name: "User" }],
    },
  },
};
