import { BoldOutlined } from "@/components/icons/BoldOutlined";
import { UnOrderedListOutlined } from "@/components/icons/UnOrderedListOutlined";

import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface InputRichTextProps {
	minRows?: number;
	maxRows?: number;
	label?: string;
	placeholder?: string;
	value?: string;
	onChange(newContent: string): void;
}

const extensions = [
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false,
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false,
		},
	}),
];

function MenuBar() {
	const { editor } = useCurrentEditor();

	if (!editor) {
		return null;
	}
	return (
		<div className="mb-3 border-b pb-3 border-gray-100 horizontal space-x-2">
			<div
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={clsx(
					"px-1.5 py-1 hover:bg-gray-50 rounded cursor-pointer",
					editor.isActive("bold")
						? "bg-blue-50 text-blue-800"
						: "text-gray-600",
				)}
			>
				<BoldOutlined className=" text-base" />
			</div>
			<div
				onClick={() => {
					editor.chain().focus().toggleBulletList().run();
				}}
				className={clsx(
					"px-1.5 py-1 hover:bg-gray-50 rounded cursor-pointer",
					editor.isActive("bulletList")
						? "bg-blue-50 text-blue-800"
						: "text-gray-600",
				)}
			>
				<UnOrderedListOutlined className=" text-base" />
			</div>
		</div>
	);
}

export function InputRichTextV2({
	value,
	onChange,
	label,
	placeholder,
	minRows = 0,
	maxRows,
}: InputRichTextProps) {
	const [isFocused, setIsFocused] = React.useState(false);

	const [textAreaHeight, setTextAreaHeight] = useState("auto");
	const textAreaRef = useRef<HTMLDivElement>(null);

	function calculateTextAreaHeight(
		newHeight: number,
		minRows: number,
		maxRows?: number,
	) {
		let height = newHeight;
		const rowHeight = 50; // Adjust based on your CSS

		if (minRows) {
			const minHeight = rowHeight * minRows;
			height = Math.max(height, minHeight);
		}
		if (maxRows) {
			const maxHeight = rowHeight * maxRows;
			height = Math.min(height, maxHeight);
		}
		return height;
	}

	const calculateHeight = useCallback(() => {
		if (textAreaRef.current) {
			// Temporarily shrink to get the correct scrollHeight for the content
			textAreaRef.current.style.height = "auto";
			textAreaRef.current.style.height = `${calculateTextAreaHeight(
				textAreaRef.current.scrollHeight,
				minRows,
				maxRows,
			)}px`;
		}
	}, [minRows, maxRows]);

	useEffect(() => {
		calculateHeight();
		window.addEventListener("resize", calculateHeight);
		return () => {
			window.removeEventListener("resize", calculateHeight);
		};
	}, [calculateHeight]);

	useEffect(() => {
		calculateHeight();
	}, []);

	useEffect(() => {
		if (!value || value === "") {
			setTextAreaHeight("auto");
		}
	}, [value]);

	const handleChange = (value: Record<string, any>) => {
		onChange(JSON.stringify(value));
		calculateHeight();
	};

	let content;
	try {
		content = value && JSON.parse(value);
	} catch (e) {}

	return (
		<>
			{label && (
				<label className="font-semibold mb-1.5 text-gray-600 text-sm block">
					{label}
				</label>
			)}
			<div
				ref={textAreaRef}
				onFocus={() => !isFocused && setIsFocused(true)}
				onBlur={() => isFocused && setIsFocused(false)}
				className={clsx(
					"m-0 w-full resize-none text-sm rounded border shadow-none outline-none transition-all duration-300 border-gray-200 bg-white pt-3 pb-6 px-6",
					isFocused && "!border-blue-300 !shadow-blue-300",
					"input--rich-text",
				)}
				style={{ height: textAreaHeight }}
			>
				<EditorProvider
					slotBefore={<MenuBar />}
					extensions={extensions}
					content={content}
					onUpdate={(params) => handleChange(params.editor.getJSON())}
				/>
			</div>
		</>
	);
}
