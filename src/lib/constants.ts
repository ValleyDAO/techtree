"use client";

import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { SmartWalletOptions, createWallet } from "thirdweb/wallets";
import { inAppWallet } from "thirdweb/wallets/embedded";

const clientId = process.env.NEXT_PUBLIC_THIRD_WEB_KEY || "";

if (!clientId) {
	throw new Error("No client ID provided");
}

export const contributionContractAddress =
	"0x8F9A6c5F2f41F0f71E28B21ae32C26C6B0330702";
export const fundingContractAddress =
	"0x53e588884d661fafc97bf1491ec7fedefae5ee50";
export const chain = defineChain({
	id: 314159,
});

export const web3Client = createThirdwebClient({
	clientId,
});

export const thirdWebWallets = [
	createWallet("io.metamask"),
	inAppWallet({
		auth: {
			options: ["email", "google", "apple", "facebook"],
		},
	}),
];

export const contributionContract = getContract({
	address: contributionContractAddress,
	chain: defineChain(314159),
	client: web3Client,
	abi: [
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "user",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "string",
					name: "ipfsHash",
					type: "string",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "points",
					type: "uint256",
				},
			],
			name: "ContributionAdded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "edgeId",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "string",
					name: "source",
					type: "string",
				},
				{
					indexed: false,
					internalType: "string",
					name: "target",
					type: "string",
				},
			],
			name: "EdgeAdded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "amount",
					type: "uint256",
				},
			],
			name: "FundsAdded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "nodeId",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "string",
					name: "title",
					type: "string",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "points",
					type: "uint256",
				},
			],
			name: "NodeAdded",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "nodeId",
					type: "uint256",
				},
			],
			name: "NodeFinished",
			type: "event",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
				{
					internalType: "string",
					name: "_ipfsHash",
					type: "string",
				},
			],
			name: "addContribution",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "string",
					name: "_source",
					type: "string",
				},
				{
					internalType: "string",
					name: "_target",
					type: "string",
				},
			],
			name: "addEdge",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
				{
					internalType: "string",
					name: "_ipfsHash",
					type: "string",
				},
			],
			name: "addFunds",
			outputs: [],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "string",
					name: "_title",
					type: "string",
				},
				{
					internalType: "string",
					name: "_ipfsHash",
					type: "string",
				},
			],
			name: "addNode",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "edges",
			outputs: [
				{
					internalType: "string",
					name: "source",
					type: "string",
				},
				{
					internalType: "string",
					name: "target",
					type: "string",
				},
				{
					internalType: "address",
					name: "creator",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "creationTime",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
			],
			name: "finishNode",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "getEdges",
			outputs: [
				{
					components: [
						{
							internalType: "string",
							name: "source",
							type: "string",
						},
						{
							internalType: "string",
							name: "target",
							type: "string",
						},
						{
							internalType: "address",
							name: "creator",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "creationTime",
							type: "uint256",
						},
					],
					internalType: "struct Contribution.Edge[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "_user",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
			],
			name: "getLastDripBlock",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
			],
			name: "getNode",
			outputs: [
				{
					components: [
						{
							internalType: "string",
							name: "title",
							type: "string",
						},
						{
							components: [
								{
									internalType: "address",
									name: "contributor",
									type: "address",
								},
								{
									internalType: "string",
									name: "ipfsHash",
									type: "string",
								},
							],
							internalType: "struct Contribution.ContributionDetail[]",
							name: "contributions",
							type: "tuple[]",
						},
						{
							internalType: "uint256",
							name: "points",
							type: "uint256",
						},
						{
							internalType: "address",
							name: "fundingAddress",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "fundingPool",
							type: "uint256",
						},
						{
							internalType: "uint256",
							name: "creationTime",
							type: "uint256",
						},
						{
							internalType: "bool",
							name: "isFunded",
							type: "bool",
						},
						{
							internalType: "bool",
							name: "isFinished",
							type: "bool",
						},
					],
					internalType: "struct Contribution.NodeLite",
					name: "",
					type: "tuple",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "getNodesLite",
			outputs: [
				{
					components: [
						{
							internalType: "string",
							name: "title",
							type: "string",
						},
						{
							components: [
								{
									internalType: "address",
									name: "contributor",
									type: "address",
								},
								{
									internalType: "string",
									name: "ipfsHash",
									type: "string",
								},
							],
							internalType: "struct Contribution.ContributionDetail[]",
							name: "contributions",
							type: "tuple[]",
						},
						{
							internalType: "uint256",
							name: "points",
							type: "uint256",
						},
						{
							internalType: "address",
							name: "fundingAddress",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "fundingPool",
							type: "uint256",
						},
						{
							internalType: "uint256",
							name: "creationTime",
							type: "uint256",
						},
						{
							internalType: "bool",
							name: "isFunded",
							type: "bool",
						},
						{
							internalType: "bool",
							name: "isFinished",
							type: "bool",
						},
					],
					internalType: "struct Contribution.NodeLite[]",
					name: "",
					type: "tuple[]",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "_user",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
			],
			name: "getUserNodePoints",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "nodes",
			outputs: [
				{
					internalType: "string",
					name: "title",
					type: "string",
				},
				{
					internalType: "uint256",
					name: "points",
					type: "uint256",
				},
				{
					internalType: "address",
					name: "fundingAddress",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "fundingPool",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "creationTime",
					type: "uint256",
				},
				{
					internalType: "bool",
					name: "isFunded",
					type: "bool",
				},
				{
					internalType: "bool",
					name: "isFinished",
					type: "bool",
				},
				{
					components: [
						{
							internalType: "address",
							name: "funder",
							type: "address",
						},
						{
							internalType: "uint256",
							name: "amount",
							type: "uint256",
						},
						{
							internalType: "string",
							name: "ipfsHash",
							type: "string",
						},
					],
					internalType: "struct Contribution.Funder",
					name: "funder",
					type: "tuple",
				},
				{
					components: [
						{
							internalType: "address",
							name: "rfp",
							type: "address",
						},
						{
							internalType: "string",
							name: "ipfsHash",
							type: "string",
						},
					],
					internalType: "struct Contribution.RFP",
					name: "rfp",
					type: "tuple",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "_user",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "nodeIndex",
					type: "uint256",
				},
			],
			name: "updateLastDripBlock",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					components: [
						{
							internalType: "string",
							name: "title",
							type: "string",
						},
						{
							internalType: "string",
							name: "ipfsHash",
							type: "string",
						},
					],
					internalType: "struct Contribution.NodeInput[]",
					name: "_nodes",
					type: "tuple[]",
				},
				{
					components: [
						{
							internalType: "string",
							name: "source",
							type: "string",
						},
						{
							internalType: "string",
							name: "target",
							type: "string",
						},
					],
					internalType: "struct Contribution.EdgeInput[]",
					name: "_edges",
					type: "tuple[]",
				},
			],
			name: "updateTechTree",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "address",
					name: "",
					type: "address",
				},
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "userNodePoints",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
	],
});

export const accountAbstraction: SmartWalletOptions = {
	chain,
	sponsorGas: false,
};
