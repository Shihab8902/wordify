import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';


const useGetSecure = (queryKey, url) => {

    const axiosSecure = useAxiosSecure();

    const { data, isPending, refetch } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const result = await axiosSecure.get(url);
            return result.data;
        }
    });


    return { data, isPending, refetch }



}

export default useGetSecure;