import { AddFilled } from "@/components/icons/AddFilled";
import { CursorFilled } from "@/components/icons/CursorFilled";
import { EditTechTreeMenu } from "@/components/techTree/menu/EditTechTreeMenu";
import { useTechTreeContext } from "@/providers/TechTreeContextProvider";
import { TechTreeMode } from "@/typings";
import clsx from "clsx";
import React from "react";

function ModeSelectionItem({
	icon,
	mode,
	label,
}: { icon: React.ReactNode; mode: TechTreeMode; label: string }) {
	const { mode: activeMode, setMode } = useTechTreeContext();
	const isActive = activeMode === mode;
	return (
		<div
			onClick={() => setMode(mode)}
			className={clsx(
				"h-12 vertical justify-center space-y-1.5 items-center aspect-square cursor-pointer group hover:bg-blue-50 transition-colors rounded",
				{
					"bg-blue-50 text-blue-700": isActive,
					"bg-white text-black": !isActive,
				},
			)}
		>
			<div className="transition-colors group-hover:text-blue-700 leading-none text-base">
				{icon}
			</div>
			<span
				className={clsx("text-[9px] leading-none font-medium uppercase", {
					"text-blue-700": isActive,
					"text-gray-800": !isActive,
				})}
			>
				{label}
			</span>
		</div>
	);
}

function BaseMenuBar() {
	return (
		<>
			<ModeSelectionItem label="move" mode="move" icon={<CursorFilled />} />
			<ModeSelectionItem label="edit" mode="edit" icon={<AddFilled />} />
		</>
	);
}

export function TechTreeMenu() {
	const { mode } = useTechTreeContext();

	return (
		<div
			className={clsx("transition-all flex flex-col absolute left-0", {
				"left-0 right-0 mx-auto w-full items-stretch text-center":
					mode === "edit",
				"left-0 items-start": mode === "move",
			})}
		>
			<div className="p-1 flex items-center bg-white border-gray-100 border rounded space-x-1 drop-shadow-sm">
				{mode === "move" ? <BaseMenuBar /> : <EditTechTreeMenu />}
			</div>
			{/*<div className="mt-4 mr-auto">
				<div className="text-gray-500 text-xs">* Technology trees</div>
			</div>*/}
		</div>
	);
}
