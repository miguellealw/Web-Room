import useSWR from "swr";
import { CategoryApi } from "../pages/api/categories";

function useCategories() {
	const api = new CategoryApi();
	api.setup();
  const fetcher = () => api.getUserCategories()
	const {data, error} = useSWR(`/api/v1.0/users/current_user/categories`, fetcher)

	return {
		data,
		error,
		isLoading: !data
	}
}

export default useCategories