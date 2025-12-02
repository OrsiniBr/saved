import { parseAbi, parseAbiItem } from "viem";

export const factoryAbi = parseAbi([
  "function totalCircles() view returns (uint256)",
  "function allCircles(uint256) view returns (address circle)",
  "function createCircle(uint256 contributionAmount, uint256 cycleLength, uint256 maxMembers, uint256[] payoutOrder) returns (address circle)",
]);

export const circleAbi = parseAbi([
  "function getStatus() view returns (uint256 currentCycle, uint256 currentDueIndex, uint256 contributionAmount, uint256 totalMembers)",
  "function maxMembers() view returns (uint256)",
  "function members(uint256) view returns (address)",
  "function payoutOrder(uint256) view returns (uint256)",
]);

export const circleCreatedEvent = parseAbiItem(
  "event CircleCreated(address indexed circle, address indexed creator, address cUSD, uint256 contributionAmount, uint256 cycleLength, uint256 maxMembers)"
);

export const contributedEvent = parseAbiItem(
  "event Contributed(address indexed member, uint256 indexed cycle, uint256 amount)"
);

export const payoutEvent = parseAbiItem("event Payout(address indexed to, uint256 indexed cycle, uint256 amount)");
