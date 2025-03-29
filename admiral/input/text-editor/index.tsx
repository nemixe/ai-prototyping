import { useState, forwardRef, useImperativeHandle } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import type { Editor as TipTapEditor, Extension } from "@tiptap/core";
import { theme } from "../../util";
import "./styles.css";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ColumnHeightOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import MenuBar, { type MenuBarButton } from "./menu-bar";
import { Form } from "antd";
import type React from "react";

type ExtendedEditor = TipTapEditor;

interface TextEditorProps {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  extensions?: Extension[];
  menuBarButtons?: MenuBarButton[];
  className?: string;
  editorClassName?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface TextEditorRef {
  getValue: () => string;
}

const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(
  (
    {
      name,
      value = "",
      onChange,
      extensions = [],
      menuBarButtons = [],
      className = "",
      editorClassName = "",
      onFocus,
      onBlur,
    },
    ref: React.Ref<TextEditorRef>,
  ): JSX.Element => {
    const [isFocused, setIsFocused] = useState(false);
    const form = Form.useFormInstance();

    const {
      token: { colorText, Input },
    } = theme.useToken();

    const editorInstance = useEditor({
      extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        ...extensions,
      ],
      content: value,
      onUpdate: ({ editor }) => {
        if (name && form) {
          form.setFieldsValue({
            [name]: editor.getHTML(),
          });
        }
        onChange?.(editor.getHTML());
      },
      onFocus: () => {
        setIsFocused(true);
        onFocus?.();
      },
      onBlur: () => {
        setIsFocused(false);
        onBlur?.();
      },
    });

    useImperativeHandle(ref, () => ({
      getValue: () => {
        return editorInstance?.getHTML() || "";
      },
    }));

    const defaultButtons = [
      {
        icon: <BoldOutlined />,
        action: (editor: ExtendedEditor) =>
          editor.chain().focus().toggleBold().run(),
        isActive: (editor: ExtendedEditor) => editor.isActive("bold"),
      },
      {
        icon: <ItalicOutlined />,
        action: (editor: ExtendedEditor) =>
          editor.chain().focus().toggleItalic().run(),
        isActive: (editor: ExtendedEditor) => editor.isActive("italic"),
      },
      {
        icon: <UnderlineOutlined />,
        action: (editor: ExtendedEditor) =>
          editor.chain().focus().toggleUnderline().run(),
        isActive: (editor: ExtendedEditor) => editor.isActive("underline"),
      },
      {
        icon: <UnorderedListOutlined />,
        action: (editor: ExtendedEditor) =>
          editor.chain().focus().toggleBulletList().run(),
        isActive: (editor: ExtendedEditor) => editor.isActive("bulletList"),
      },
      {
        icon: <OrderedListOutlined />,
        action: (editor: ExtendedEditor) =>
          editor.chain().focus().toggleOrderedList().run(),
        isActive: (editor: ExtendedEditor) => editor.isActive("orderedList"),
      },
      {
        icon: <AlignLeftOutlined />,
        action: (editor: ExtendedEditor) =>
          editor.chain().focus().setTextAlign("left").run(),
        isActive: (editor: ExtendedEditor) =>
          editor.isActive({ textAlign: "left" }),
      },
      {
        icon: <AlignCenterOutlined />,
        action: (editor: ExtendedEditor) =>
          editor.chain().focus().setTextAlign("center").run(),
        isActive: (editor: ExtendedEditor) =>
          editor.isActive({ textAlign: "center" }),
      },
      {
        icon: <AlignRightOutlined />,
        action: (editor: ExtendedEditor) =>
          editor.chain().focus().setTextAlign("right").run(),
        isActive: (editor: ExtendedEditor) =>
          editor.isActive({ textAlign: "right" }),
      },
      {
        icon: <ColumnHeightOutlined />,
        action: (editor: ExtendedEditor) =>
          editor.chain().focus().setHardBreak().run(),
        isActive: (editor: ExtendedEditor) => editor.isActive("hardBreak"),
      },
    ];

    return (
      <div
        className={`editor-container  ${className} ${
          isFocused ? "editor-focused" : ""
        }`}
        style={{
          borderColor: isFocused
            ? Input?.activeBorderColor || "#1677ff"
            : undefined,
        }}
      >
        <MenuBar
          editor={editorInstance as ExtendedEditor}
          buttons={menuBarButtons.length > 0 ? menuBarButtons : defaultButtons}
        />
        <EditorContent
          editor={editorInstance}
          className={editorClassName}
          style={{
            color: colorText,
          }}
        />
      </div>
    );
  },
);

export default TextEditor;
