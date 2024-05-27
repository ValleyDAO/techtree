"use client";

import { NodeData } from "@/typings";
import { initialNodes } from "@/utils/nodes.utils";
import { useQuery } from "react-query";

interface useFetchTechTreeNodeProps {
	isLoading: boolean;
	node?: NodeData;
}

export function useFetchTechTreeNode(id: string): useFetchTechTreeNodeProps {
	const { data, isLoading } = useQuery({
		queryKey: ["techTree", id],
		queryFn: () => fetchTechTreeNode(id),
	});

	async function fetchTechTreeNode(id: string): Promise<NodeData> {
		const node = initialNodes.find((node) => node.id === id)?.data;
		return {
			...node,
			rfp: {
				content:
					'{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"1. Introduction"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","text":"The purpose of this RFP is to solicit proposals from qualified firms for genetic engineering services. We are seeking expertise in genome editing, synthetic biology, and related biotechnologies to advance our research and development initiatives."}]},{"type":"paragraph"},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"2. Project Overview"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Project Title"},{"type":"text","text":": Genetic Engineering Services"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Objective"},{"type":"text","text":": To leverage genetic engineering techniques to modify organisms for improved traits and capabilities."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Scope"},{"type":"text","text":": Includes genome editing, synthetic biology, bioinformatics, and regulatory compliance."}]}]},{"type":"listItem","content":[{"type":"paragraph"}]}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"3. Proposal Requirements"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Company Background"},{"type":"text","text":": Provide a brief history, including experience and expertise in genetic engineering."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Technical Approach"},{"type":"text","text":": Describe the methodologies and technologies to be used."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Project Timeline"},{"type":"text","text":": Outline the expected timeline for project milestones."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Budget Estimate"},{"type":"text","text":": Provide a detailed cost estimate."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Team Qualifications"},{"type":"text","text":": Include resumes of key personnel."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Past Projects"},{"type":"text","text":": Summarize previous relevant projects and outcomes."}]}]},{"type":"listItem","content":[{"type":"paragraph"}]}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"4. Evaluation Criteria"}]},{"type":"paragraph","content":[{"type":"text","text":"Proposals will be evaluated based on the following criteria:"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Technical Expertise"},{"type":"text","text":": Demonstrated knowledge and experience."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Innovative Approach"},{"type":"text","text":": Creativity in solving genetic engineering challenges."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Cost-Effectiveness"},{"type":"text","text":": Competitive and detailed budget."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Timeline"},{"type":"text","text":": Realistic and achievable project milestones."}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"References"},{"type":"text","text":": Positive feedback from previous clients."}]}]}]}]}\n',
			},
			content:
				'{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Abstract"},{"type":"text","text":": Endometriosis is a prevalent chronic inflammatory disease characterized by a considerable delay"}]},{"type":"paragraph","content":[{"type":"text","text":"between initial symptoms and diagnosis through surgery. The pressing need for a timely, non-invasive"}]},{"type":"paragraph","content":[{"type":"text","text":"diagnostic solution underscores the focus of current research efforts. This study examines the diagnostic"}]},{"type":"paragraph","content":[{"type":"text","text":"potential of the menstrual blood lipidome. The lipid profile of 39 samples (23 women with endometriosis and"}]},{"type":"paragraph","content":[{"type":"text","text":"16 patient of control group) was acquired using reverse-phase high-performance liquid chromatography-mass"}]},{"type":"paragraph","content":[{"type":"text","text":"spectrometry with LipidMatch processing and identification. "}]}]}',
			status: "rfp",
			fundingState: {
				fundingRequest: 500000,
				fundingRaised: 25750,
				funders: 25,
			},
		} as NodeData;
	}

	return {
		node: data,
		isLoading,
	};
}