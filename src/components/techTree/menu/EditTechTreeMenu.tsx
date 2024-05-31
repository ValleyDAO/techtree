import { Button } from "@/components/button";
import { AddFilled } from "@/components/icons/AddFilled";
import { ArrowLeftOutlined } from "@/components/icons/ArrowLeftOutlined";
import { CursorFilled } from "@/components/icons/CursorFilled";
import { EdgeOutlined } from "@/components/icons/EdgeOutlined";
import { NodeOutlined } from "@/components/icons/NodeOutlined";
import { Modal } from "@/components/modal";
import { useTechTreeContext } from "@/providers/TechTreeContextProvider";
import { useTechTreeData } from "@/providers/TechTreeDataProvider";
import { NodeData, NodeType, TechTreeAddType, TechTreeMode } from "@/typings";
import clsx from "clsx";
import React, { useEffect } from "react";
import toast, { useToaster } from "react-hot-toast";

function AddObjectInEditModeItem({
	icon,
	type,
	activeEditType,
	onAction,
	label,
}: {
	icon: React.ReactNode;
	type: TechTreeAddType;
	activeEditType?: TechTreeAddType;
	onAction?(): void;
	label: string;
}) {
	const { setActiveEditType } = useTechTreeContext();
	const isActive = activeEditType === type;
	return (
		<div
			onClick={() =>
				onAction ? onAction() : setActiveEditType(isActive ? undefined : type)
			}
			className={clsx(
				"h-12 horizontal justify-center space-x-1 cursor-pointer text-gray-600 group transition-colors hover:text-black rounded",
				{
					"text-blue-700": isActive,
				},
			)}
		>
			<div className={clsx("text-xl", isActive && "text-blue-700")}>{icon}</div>
			<div
				className={clsx("text-xs mt-1 capitalize", isActive && "text-blue-700")}
			>
				{label}
			</div>
		</div>
	);
}

export function EditTechTreeMenu() {
	const { hasUpdates, handlePublish, isPublishing, nodes, addNewNode } =
		useTechTreeData();
	const { setMode, activeEditType, setActiveEditType } = useTechTreeContext();

	function handleBackFromEditMode() {
		handlePublish("reset");
		setMode("move");
	}

	function handleAddNewNode() {
		const newNode: NodeData = {
			id: `${(nodes || []).length}`,
			title: undefined,
			type: "end-goal",
		};
		setActiveEditType("node");
		addNewNode(newNode);
	}

	return (
		<div className="flex items-center justify-between w-full pl-4 pr-2">
			<div>
				<div className="flex w-full items-center space-x-4">
					<div
						onClick={handleBackFromEditMode}
						className="horizontal text-sm space-x-1.5 cursor-pointer group hover:text-blue-700 text-gray-500 border-r border-gray-200 pr-8"
					>
						<ArrowLeftOutlined />
						<div className="text-xs">
							Leave{" "}
							<span className="font-medium group-hover:text-blue-700 text-gray-600">
								Edit Mode
							</span>{" "}
							{hasUpdates && "& Reset Changes"}
						</div>
					</div>
					<div className="flex items-center space-x-8">
						<div className="text-xs text-gray-400">
							Select an input type to start:
						</div>
						<AddObjectInEditModeItem
							type="node"
							label="Add node"
							activeEditType={activeEditType}
							icon={<NodeOutlined />}
							onAction={handleAddNewNode}
						/>
						<AddObjectInEditModeItem
							type="edge"
							label="Connect nodes"
							activeEditType={activeEditType}
							icon={<EdgeOutlined />}
						/>
					</div>
				</div>
			</div>
			<div className="flex items-center space-x-4">
				<div
					onClick={() => handlePublish("reset")}
					className="text-gray-500 hover:text-red-700 transition-colors text-xs cursor-pointer"
				>
					Reset
				</div>
				<Button
					loading={isPublishing}
					onClick={() => handlePublish("publish")}
					disabled={!hasUpdates}
					variant="black"
				>
					Publish
				</Button>
			</div>
		</div>
	);
}
