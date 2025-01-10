import { Link } from "react-router";
import LoadingSpinner from "../../componets/common/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MdDelete } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import toast from "react-hot-toast";

const NotificationPage = () => {
	// const isLoading = false;

	const { data: notifications, isPending:isLoading, isError } = useQuery({
		queryKey: ['notificationData'],
		queryFn: async () => {
			try {
				const res = await fetch('/api/notifications');
				const data = await res.json();

				if (!res.ok) throw new Error(data.error || 'Something went wrong');

				return data;
			} catch (error) {
				throw new Error(data.error || 'Something went wrong');
			}
		}
	});

	const queryClient = useQueryClient();

	console.log("All notifications :",notifications);

	const {mutate:deleteAllNotfication,isPending:deleting,isError:deleteError} = useMutation({
		mutationKey:['deleteAllNotfication'],
		mutationFn:async()=>{
			try {
				const res = await fetch('/api/notifications',{method:'DELETE'});
				const data = await res.json();

				if(!res.ok)throw new Error(data.error || 'Something went wrong');


			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess:()=>{
			toast.success('Notifications deleted successfully');
			queryClient.invalidateQueries({queryKey:['notificationData']});
		},
		onError:()=>{
			toast.error('Something went wrong');
		}
	});

	// delete individual notification 

	const {mutate:deleteNotfication} = useMutation({
		mutationKey:['deleteIndividualNotification'],
		mutationFn:async(NotificationID)=>{
			try {
				const res = await fetch(`/api/notifications/${NotificationID}`,{method:'DELETE'});
				const data = await res.json();

				if(!res.ok)throw new Error(data.error || 'Something went wrong');

				console.log("Delete individual notification :",data );
				return data;

			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess:(deletedNotfication)=>{
			console.log("~~~~~~~~~~~~~~``:",deletedNotfication);
			toast.success('Notifications deleted successfully');
			queryClient.setQueryData(['notificationData'],(oldData)=>{
				console.log("all notification in individual deletion :",oldData);
				return oldData.filter((item)=>(item._id !== deletedNotfication._id))
			});
		},
		onError:()=>{
			toast.error('Something went wrong');
		}
	});

	const deleteNotifications = () => {
		
		deleteAllNotfication();
		console.log("******");
	};


	return (
		<>
			<div className='flex-[4_4_0] border-l border-r border-gray-700 min-h-screen'>
				<div className='flex justify-between items-center p-4 border-b border-gray-700'>
					<p className='font-bold'>Notifications</p>
					<div className='dropdown dropdown-bottom dropdown-end'>
						<div tabIndex={0} role='button' className='m-1'>
							<IoSettingsOutline className='w-4' />
						</div>
						<ul
							tabIndex={0}
							className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
						>
							<li>
								<a onClick={deleteNotifications}>Delete all notifications</a>
							</li>
						</ul>
					</div>
				</div>
				{isLoading && (
					<div className='flex justify-center h-full items-center'>
						<LoadingSpinner size='lg' />
					</div>
				)}
				{notifications?.length === 0 && <div className='text-center p-4 font-bold'>No notifications 🤔</div>}
				{notifications?.map((notification) => (
					<div className='border-b border-gray-700' key={notification._id}>
						<div className='flex gap-2 p-4'>
							{notification.type === "follow" && <FaUser className='w-7 h-7 text-primary' />}
							{notification.type === "like" && <FaHeart className='w-7 h-7 text-red-500' />}
							<div className="flex justify-between flex-1">
							<Link to={`/profile/${notification.from.username}`}>
								<div className='avatar'>
									<div className='w-8 rounded-full'>
										<img src={notification.from.profileImg || "/avatar-placeholder.png"} />
									</div>
								</div>
								<div className='flex gap-1'>
									<span className='font-bold'>@{notification.from.username}</span>{" "}
									{notification.type === "follow" ? "followed you" : "liked your post"}
								</div>
							</Link>
							<MdDelete className="self-center p-2 cursor-pointer hover:bg-stone-900 transition-all rounded-full duration-300" size={`2rem`} 
								onClick={()=>{
									console.log("Tash the notification");
									deleteNotfication(notification._id);
								}}
							
							/>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
export default NotificationPage;