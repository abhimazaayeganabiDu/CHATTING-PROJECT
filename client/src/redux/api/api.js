import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config'



const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Chat", "User", "Message"],

    endpoints: (builder) => ({

        myChats: builder.query({
            query: () => ({
                url: "chats/my",
                credentials: "include"
            }),
            providesTags: ["Chat"]
        }),

        searchUser: builder.query({
            query: (name) => ({
                url: `users/search?name=${name}`,
                credentials: "include"
            }),
            providesTags: ["User"]
        }),

        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "users/sendrequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["User"]
        }),

        getNotifications: builder.query({
            query: () => ({
                url: `users/notifications`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0,
        }),

        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "users/acceptrequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),
            invalidatesTags: ["Chat"]
        }),

        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {

                let url = `chats/${chatId}`
                if (populate) url += "?populate=true"

                return {
                    url,
                    credentials: "include",
                }
            },
            providesTags: ["Chat"]
        }),

        getMessages: builder.query({
            query: ({ chatId, page }) => ({
                url: `chats/message/${chatId}?page=${page}`,
                credentials: "include",
            }),
            keepUnusedDataFor: 0,
        }),

        sendAttachments: builder.mutation({
            query: (data) => ({
                url: "chats/messages",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),

        myGroups: builder.query({
            query: () => ({
                url: "chats/my/groups",
                credentials: "include"
            }),
            providesTags: ["Chat"]
        }),

        avaliableFriends: builder.query({
            query: (chatId) => {
                let url = `users/friends`
                if (chatId) url += `?chatId=${chatId}`

                return {
                    url,
                    credentials: "include",
                }
            },
            providesTags: ["Chat"]
        }),

        newGroup: builder.mutation({
            query: ({ name, members }) => ({
                url: "chats/new",
                method: "POST",
                credentials: "include",
                body: { name, members },
            }),
            invalidatesTags: ["Chat"]
        }),

        renameGroup: builder.mutation({
            query: ({ chatId, name }) => ({
                url: `chats/${chatId}`,
                method: "PUT",
                credentials: "include",
                body: { name },
            }),
            invalidatesTags: ["Chat"]
        }),

        removeGroupMember: builder.mutation({
            query: ({ chatId, userId }) => ({
                url: `chats/removemember`,
                method: "PUT",
                credentials: "include",
                body: { chatId, userId },
            }),
            invalidatesTags: ["Chat"]
        }),

        addGroupMembers: builder.mutation({
            query: ({ members, chatId }) => ({
                url: `chats/addmembers`,
                method: "PUT",
                credentials: "include",
                body: { members, chatId },
            }),
            invalidatesTags: ["Chat"]
        }),

        deleteChat: builder.mutation({
            query: (chatId) => ({
                url: `chats/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"]
        }),

        leaveGroup: builder.mutation({
            query: (chatId) => ({
                url: `chats/leave/${chatId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["Chat"]
        }),

    })

})

export default api
export const {
    useMyChatsQuery,
    useLazySearchUserQuery,
    useSendFriendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachmentsMutation,
    useMyGroupsQuery,
    useAvaliableFriendsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMembersMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation

} = api
