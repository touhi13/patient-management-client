import { apiSlice } from '../api/apiSlice';

export const patientsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPatients: builder.query({
            query: (params) => ({
                url: '/api/v1/patient',
                params
            }),
        }),
        getPatient: builder.query({
            query: (id) => `/api/v1/patient/${id}`,
        }),

        addPatient: builder.mutation({
            query: ({ data }) => ({
                url: '/api/v1/patient',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                console.log(arg)
                // Pessimistic cache update
                try {
                    const { data: newPatient } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getPatients', arg.cacheKey,
                            (draft) => {

                                draft.data.data.unshift(newPatient.data);

                            }
                        )
                    );
                } catch (error) {
                    console.error('Error updating query data:', error);
                }
            },
        }),
        updatePatient: builder.mutation({
            query: ({ id, updatedPatient }) => ({
                url: `/api/v1/patient/${id}`,
                method: 'PUT',
                body: updatedPatient
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Pessimistic cache update
                try {
                    const { data: updatedData } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getPatients', arg.cacheKey,

                            (draft) => {
                                const index = draft.data.data.findIndex(
                                    (patient) => patient.id == arg.id
                                );
                                draft.data.data[index] = updatedData.data;
                            }
                        )
                    );
                } catch (error) {
                    console.error('Error updating query data:', error);
                }
            },
        }),
        deletePatient: builder.mutation({
            query: ({ id }) => ({
                url: `/api/v1/patient/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Optimistic cache update
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getPatients', arg.cacheKey,
                        (draft) => {
                            const index = draft.data.data.findIndex(
                                (patient) => patient.id == arg.id
                            );
                            if (index !== -1) {
                                draft.data.data.splice(index, 1);

                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useAddPatientMutation,
    useDeletePatientMutation,
    useImportPatientsMutation,
    useGetPatientQuery,
    useGetPatientsQuery,
    useUpdateStatusMutation,
    useUpdatePatientMutation
} = patientsApi;
