import { useTechTreeContext } from "@/providers/TechTreeContextProvider";
import { useTechTreeData } from "@/providers/TechTreeDataProvider";
import { NodeData } from "@/typings";
import clsx from "clsx";
import { MouseEvent } from "react";
import { Handle, NodeProps, Position } from "reactflow";

export function TechNode({
	data,
	isConnectable,
	targetPosition = Position.Top,
	sourcePosition = Position.Bottom,
	id,
}: NodeProps<NodeData>) {
	const { removeNode } = useTechTreeData();
	const { mode, activeNode, activeEditType } = useTechTreeContext();
	const hasActiveNodeInMoveMode = activeNode;
	const isActive = activeNode?.id === id;
	const showDelete = mode === "edit" && isActive;

	function handleDelete(ev: MouseEvent<HTMLDivElement>) {
		ev.preventDefault();
		ev.stopPropagation();
		removeNode(activeNode?.id || "");
	}

	return (
		<>
			<Handle
				type="target"
				position={targetPosition}
				isConnectable={isConnectable}
			/>
			<div
				className={clsx(
					"px-10 py-4 relative !text-xs border rounded",
					hasActiveNodeInMoveMode
						? {
								"border-gray-600 bg-white text-black": isActive,
								"border-gray-200 bg-white text-gray-400": !isActive,
							}
						: "border-gray-200 bg-white",
				)}
			>
				<span className="">{data?.title}</span>
				{/*{showDelete && (
					<div
						onClick={handleDelete}
						className="absolute cursor-pointer horizontal justify-center top-0 right-0 w-5 aspect-square bg-red-600 border-2 rounded-full border-white -mt-2 -mr-2"
					>
						<span className="text-[10px] mb-[2px] leading-none text-white">
							x
						</span>
					</div>
				)}*/}
			</div>
			<Handle
				type="source"
				position={sourcePosition}
				isConnectable={mode === "edit" && activeEditType === "edge"}
			/>
		</>
	);
}