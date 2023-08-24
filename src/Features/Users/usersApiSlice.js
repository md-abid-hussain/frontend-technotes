import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';

import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers:builder.query({
            query:()=>'/users',
            validateStatus:(response,result)=>{
                return response.status === 200 && !result.isError
            },
            transformResponse:responseData=>{
                return usersAdapter.setAll(initialState,responseData)
            },
            providesTags:(result,error,arg)=>{
                if(result?.ids){
                    return [
                        {type:'User',id:'LIST'},
                        ...result.ids.map(id=>({type:'User',id}))
                    ]
                } else return [{type:'User',id:'LIST'}]
            }
        }),
        addNewUser:builder.mutation({
            query:(initialUserData)=>({
                url:'/users',
                method:'POST',
                body:{
                    ...initialUserData
                }
            }),
            invalidatesTags:[
                {type:'User',id:'LIST'}
            ]
        }),
        updateUser:builder.mutation({
            query:(initialUserData)=>({
                url:'/users',
                method:'PATCH',
                body:{
                    ...initialUserData
                }
            }),
            invalidatesTags:[
                {type:'User',id:'LIST'}
            ]
        }),
        deleteUser:builder.mutation({
            query:({id})=>({
                url:'/users',
                method:'DELETE',
                body:{id}
            }),
            invalidatesTags:[
                {type:'User',id:'LIST'}
            ]
        })
    })
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice

// Return query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult=>usersResult.data // normalized state object with ids and entities
)

// getSelectors create these selectors and we rename them with aliases using destructuring
export const {
    selectAll:selectAllUsers,
    selectById:selectUserById,
    selectIds:selectUserIds,
} = usersAdapter.getSelectors(state=>selectUsersData(state) ?? initialState)