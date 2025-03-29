import { FC, ReactElement } from "react";
import { Tabs as AntdTabs } from "antd";
import { TTabs } from "./type";
import "./style.css";

const Tabs: FC<TTabs> = ({ type, tabPosition, ...props }): ReactElement => {
  const className = (
    type: TTabs["type"],
    tabPosition: TTabs["tabPosition"],
  ) => {
    if (type === "bordered-card" && tabPosition === "bottom") {
      return "custom-bordered-card-with-bottom custom";
    }

    if (type === "bordered-card" && (tabPosition === "top" || !tabPosition)) {
      return "custom-bordered-card-with-top custom";
    }

    if (type === "bordered-card" && tabPosition === "left") {
      return "custom-bordered-card-with-left custom";
    }

    if (type === "bordered-card" && tabPosition === "right") {
      return "custom-bordered-card-with-right custom";
    }

    return "";
  };

  return (
    <AntdTabs
      {...props}
      className={className(type, tabPosition)}
      type={type === "bordered-card" ? "card" : type}
      tabPosition={tabPosition}
    />
  );
};

export default Tabs;
