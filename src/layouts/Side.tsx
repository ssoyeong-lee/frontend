import FlexBox from "./FlexBox";

export default function Side({className}: Props){
	return (
		<FlexBox className={`${className} h-full items-start w-1/3`} direction="col">
			Login
		</FlexBox>
	);
}