import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';


const useGetPublic = (queryKey, url) => {

    const axiosPublic = useAxiosPublic();

    const { data, isPending, refetch } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const result = await axiosPublic.get(url);
            return result.data;
        }
    });


    return { data, isPending, refetch }



}

export default useGetPublic