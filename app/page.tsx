import prisma from "@/app/lib/db";
import FilterItems from "@/components/my_components/filterItems";
import ListingCard from "@/components/my_components/ListingCard";

const getData = async () => {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      description: true,
      country: true,
      price: true,
      photo: true,
    },
  });

  return data;
};

export default async function Home() {
  const data = await getData();
  return (
    <div className="container px-5 lg:px-10">
      <FilterItems />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-8">
        {data.map((item) => (
          <ListingCard
            key={item.id}
            params={{
              imagePath: item.photo as string,
              description: item.description as string,
              country: item.country as string,
              price: item.price as number,
            }}
          />
        ))}
      </div>
    </div>
  );
}
