import Image from "next/image";
import { Button } from "@/components/ui/button"
import FilterItems from "@/components/my_components/filterItems";

export default function Home() {
  return (
    <div className="container px-5 lg:px-10">
      <FilterItems />
    </div>
  );
}
