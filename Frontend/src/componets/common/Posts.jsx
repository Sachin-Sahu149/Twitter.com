import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({feedType}) => {
	

	console.log("feedType **:",feedType);

	const endPoint = ()=>{
		if(feedType==='following')return '/api/posts/following';
		else return '/api/posts/all';
	}

	console.log("endPoint :",endPoint());

	const {data, isLoading,isError,refetch,isRefetching} = useQuery({
		queryKey:['posts'],
		queryFn:async()=>{
			try {
				const res = await fetch(endPoint());
				const data = await res.json();
				console.log("** :",data);
				if(!res.ok) throw new Error(data.error || 'Something went wrong');

				return data;
				
			} catch (error) {
				console.log("Error occurred in posts components:",error);
				throw error;
			}
		}
	})

	console.log('Data :',data);

	useEffect(()=>{
		refetch();
	},[feedType,refetch])
	
	return (
		<>
			{isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && data?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && data && (
				<div>
					{data.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;