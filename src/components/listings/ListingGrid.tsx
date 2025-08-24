import ListingCard from './ListingCard';

interface Props {
  items: any[];
}

export default function ListingGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <ListingCard key={item.id} listing={item} />
      ))}
    </div>
  );
}
