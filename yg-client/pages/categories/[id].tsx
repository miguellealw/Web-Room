import { useRouter } from "next/router";
import AuthedLayout from "../layouts/authed_layout";
import Link from "next/link";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import useCategory from "../../shared-hooks/useCategory";
import LoadingText from "../../components/LoadingText";
import VideoSection from "./VideoSection";
import SubscriptionsSection, {
  MobileSubscriptionsSection,
} from "./SubscriptionsSection";
import useFetchCategory from "../../shared-hooks/useFetchCategory";

// const Category = ({ category }) => {
const Category = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useFetchCategory(id);
  const { removeChannelFromCategory } = useCategory(id);

  if (error) return <div>Error loading category page...</div>;

  return (
    <AuthedLayout tw_className="w-11/12 lg:w-1/2 m-auto pb-10">
      {/* Header */}
      <div className="py-5 lg:py-10">
        <Link href="/categories" passHref>
          <div className="text-sm lg:text-lg mb-5 hidden lg:flex items-center lg:mb-10 text-gray-400 hover:text-gray-600 cursor-pointer w-48">
            <ArrowNarrowLeftIcon className="w-6 h-6 mr-2" />
            Back to Categories
          </div>
        </Link>

        {isLoading ? (
          <LoadingText>Loading Category...</LoadingText>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5">
              <h1 className="lg:pb-7 text-2xl lg:text-5xl font-bold">
                {data?.category?.name}
              </h1>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">
                  {data?.category?.channels.length} channels
                </span>
                <button className="rounded-full bg-red-600 hover:bg-red-500 text-white text-xs px-4 py-2 ml-5">
                  Add Channels
                </button>
              </div>
            </div>

            <main className="lg:grid lg:grid-cols-3 lg:gap-10">
              <MobileSubscriptionsSection
                channels={data?.category?.channels}
                categoryId={data?.category?.id}
                removeChannelFromCategory={removeChannelFromCategory}
              />

              <VideoSection uploads={data?.category?.uploads}/>

              <SubscriptionsSection
                channels={data?.category?.channels}
                categoryId={data?.category?.id}
                removeChannelFromCategory={removeChannelFromCategory}
              />
            </main>
          </>
        )}
      </div>
    </AuthedLayout>
  );
};

// export async function getStaticPaths() {
// 	const api = new CategoryApi();
// 	api.setup();
// 	const res = await api.getUserCategories();
// 	console.log("GET DSTATIC PATH", res)

// 	const paths = res.categories?.map((category) => ({
// 		params: { id: category.id }
// 	}))

// 	return {paths, fallback: false}
// }

// export async function getStaticProps({ params }) {
// 	const api = new CategoryApi();
// 	api.setup();
// 	const res = await api.getUserCategoryById(params.id);

// 	return { props: { category: res.category }}
// }

export default Category;
