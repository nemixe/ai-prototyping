import { Meta, StoryObj } from "@storybook/react";
import SectionComponent, { SectionProps } from "./index";
import { Button } from "antd";
import { DataTable } from "../table";

const meta: Meta<SectionProps> = {
  title: "Design System/Section/Default",
  component: SectionComponent,
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: `Header's title of section`,
    },
    divider: {
      description: `Divider under the header's title`,
    },
    top: {
      description:
        "Set position header on top (adjusted with the default components",
    },
    actions: {
      description: "Action in headers",
    },
    children: {
      description: `Children's content`,
      control: { type: "node" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Section is a component for displaying section header with additional content.",
      },
    },
  },
};

export default meta;

export const Section: StoryObj<SectionProps> = {
  args: {
    title: "Section Header",
    children: (
      <DataTable
        columns={[
          {
            dataIndex: "name",
            key: "name",
            title: "Name",
          },
        ]}
        source={{
          data: [
            {
              key: "1",
              name: "John Cena",
            },
          ],
          meta: {
            page: 1,
            pageSize: 10,
            total: 100,
          },
        }}
      />
    ),
  },
};

export const SectionWithAction: StoryObj<SectionProps> = {
  args: {
    title: "Section Header",
    children: (
      <DataTable
        columns={[
          {
            dataIndex: "name",
            key: "name",
            title: "Name",
          },
        ]}
        source={{
          data: [
            {
              key: "1",
              name: "John Cena",
            },
          ],
          meta: {
            page: 1,
            pageSize: 10,
            total: 100,
          },
        }}
      />
    ),
    actions: [<Button>Add Data</Button>],
  },
};

export const SectionWithDivider: StoryObj<SectionProps> = {
  args: {
    title: "Section Header Divider",
    children: (
      <DataTable
        columns={[
          {
            dataIndex: "name",
            key: "name",
            title: "Name",
          },
        ]}
        source={{
          data: [
            {
              key: "1",
              name: "John Cena",
            },
          ],
          meta: {
            page: 1,
            pageSize: 10,
            total: 100,
          },
        }}
      />
    ),
    actions: [<Button>Add Data</Button>],
    divider: true,
  },
};
