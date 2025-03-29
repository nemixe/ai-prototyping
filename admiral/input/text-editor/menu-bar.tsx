import type React from "react";
import type { Editor as TipTapEditor } from "@tiptap/core";

type ExtendedEditor = TipTapEditor;

export type MenuBarButton = {
  icon: JSX.Element;
  action: (editor: ExtendedEditor) => void;
  isActive?: (editor: ExtendedEditor) => boolean;
};

interface MenuBarProps {
  editor: ExtendedEditor | null;
  buttons: MenuBarButton[];
}

const MenuBar: React.FC<MenuBarProps> = ({ editor, buttons }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menu-bar">
      {buttons.map(({ icon, action, isActive }) => {
        const key = `${icon.type.name}-${action.name}`;
        return (
          <button
            key={key}
            type="button"
            style={{ padding: "3px 5px" }}
            onClick={() => action(editor)}
            className={
              isActive && editor && isActive(editor) ? "is-active" : ""
            }
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};

export default MenuBar;
