import Image from "next/image";
import { useAppContext } from '@/context/AppContext';
import { LuExternalLink } from "react-icons/lu";

type Props = {}

const FeaturedProducts = (props: Props) => {
  const {featured} = useAppContext();
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Products</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {featured.map(({ _id, gallery, title, description }:any) => (
          <div key={_id} className="relative group">
            <Image
              src={gallery[0]}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
              width={1280}
              height={720}
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              <button className="btn text-white flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
                Buy now <LuExternalLink />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts