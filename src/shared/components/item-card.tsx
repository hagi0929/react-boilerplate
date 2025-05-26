import { Card, CardContent, CardHeader } from "./ui/card";

interface CustomCardProps {
	header: React.ReactNode;
	content: React.ReactNode;
}

const ItemCard: React.FC<CustomCardProps> = ({ header, content }) => {
	return (
		<Card className="h-full transition-all hover:shadow-lg hover:scale-105">
			<CardHeader className="pb-3">{header} </CardHeader>
			<CardContent className="pt-0">{content} </CardContent>
		</Card>
	);
};

export default ItemCard;
