import React from "react";
import { Descriptions as AntdDescriptions } from "antd";

// Description Root
type DescriptionsProps = React.ComponentPropsWithoutRef<
  typeof AntdDescriptions
>;

const Descriptions = ({
  labelStyle,
  contentStyle,
  ...props
}: DescriptionsProps) => {
  return (
    <AntdDescriptions
      bordered
      column={2}
      labelStyle={{
        width: `${215}px`,
        maxWidth: `${215}px`,
        backgroundColor: "#00000005",
        padding: "8px 16px",
        height: "38px",
        wordBreak: "break-word",
        color: "#000000E0",
        ...labelStyle,
      }}
      contentStyle={{
        padding: "8px 16px",
        height: "38px",
        width: "346px",
        ...contentStyle,
      }}
      {...props}
    />
  );
};

Descriptions.displayName = "Descriptions";

// Description Item
type DescriptionsItemProps = React.ComponentPropsWithoutRef<
  typeof AntdDescriptions.Item
>;

const DescriptionsItem = (props: DescriptionsItemProps) => {
  return <AntdDescriptions.Item {...props} />;
};

DescriptionsItem.displayName = "DescriptionsItem";

Descriptions.Item = DescriptionsItem;

export default Descriptions;
