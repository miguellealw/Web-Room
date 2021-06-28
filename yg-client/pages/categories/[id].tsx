import { useRouter } from "next/router";
import AuthedLayout from "../layouts/authed_layout";
import Link from "next/link";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import useCategory from "../../shared-hooks/useCategory";
import LoadingText from "../../components/LoadingText";
import VideoSection from "./VideoSection";
import SubscriptionsSection from "./SubscriptionsSection";

// const Category = ({ category }) => {
const Category = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading, removeChannelFromCategory } = useCategory(id);

  if (error) return <div>Error loading category page...</div>;

  return (
    <AuthedLayout tw_className="w-1/2 m-auto">
      {/* Header */}
      <div className="py-10">
        <Link href="/categories" passHref>
          <div className="flex mb-10 text-gray-400 hover:text-gray-600 cursor-pointer w-48">
            <ArrowNarrowLeftIcon className="w-6 h-6 mr-2" />
            Back to Categories
          </div>
        </Link>

        {isLoading ? (
          <LoadingText>Loading Category...</LoadingText>
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-5xl font-bold">{data?.category?.name}</h1>
              <div>
                <span className="text-gray-500">
                  {data?.category?.channels.length} channels
                </span>
                <button className="rounded-full bg-red-600 hover:bg-red-500 text-white text-xs px-4 py-2 ml-5">
                  Add Channels
                </button>
              </div>
            </div>

            <main className="grid grid-cols-3 gap-10">
              <VideoSection data={data} />
              <SubscriptionsSection
                data={data}
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
