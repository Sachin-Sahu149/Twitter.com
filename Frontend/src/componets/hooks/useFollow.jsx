
import { useQueryClient, useMutation } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast';

function useFollow() {
    const queryClient = useQueryClient();

    const{mutate:follow,isPending,data} = useMutation({
        mutationKey:['followUnfollow'],
        mutationFn:async(userID)=>{
            try {
                
                const res = await fetch(`/api/users/follow/${userID}`,{
                    method:'POST'
                });

                const data = await res.json();

                if(!res.ok)throw new Error(data.error || 'Something went wrong');
                return data;
            } catch (error) {
                throw new Error('Error occured : ',error);
            }
        },

        onSuccess:()=>{

            Promise.all([
                queryClient.invalidateQueries({queryKey:['suggestedUser']}),
                queryClient.invalidateQueries({queryKey:['authUser']}),
                
            ])
            
        },
        onError:(error)=>{
            toast.error(error.message);
        }
    });


    return {follow,isPending,data};

}

export default useFollow;