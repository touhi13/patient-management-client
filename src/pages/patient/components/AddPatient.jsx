import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/custom/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAddPatientMutation, useGetPatientQuery, useUpdatePatientMutation } from '@/features/patient/patientApi';
import { useSelector } from 'react-redux';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Pencil } from './Icons';


const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    date_of_birth: yup.string().required('Date of Birth is required'),
    gender: yup.string().required('Gender is required'),
    address: yup.string().required('Address is required'),
    phone_number: yup.string().required('Phone Number is required'),
    medical_history: yup.string().optional()  // If you want to make this field optional, use .optional() instead of .required()
});


const AddPatient = ({ id }) => {
    const patientCacheKey = useSelector((state) => state.cacheKey.patient);
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(false);

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const { data } = useGetPatientQuery(id, {
        skip: !shouldFetch,  // Skip the query if shouldFetch is false
    });

    useEffect(() => {
        if (open && id) {
            setShouldFetch(true);
        }
    }, [open, id]);

    console.log(data)

    useEffect(() => {
        if (data) {
            // Pre-fill the form with existing patient data when editing
            setValue('name', data.data.name);
            setValue('date_of_birth', data.data.date_of_birth);
            setValue('gender', data.data.gender);
            setValue('address', data.data.address);
            setValue('phone_number', data.data.phone_number);
            setValue('medical_history', data.data.medical_history);
        }
    }, [data, setValue]);

    const [addPatient, { isLoading, isError, error }] = useAddPatientMutation();

    const [updatePatient, { isLoading: editLoading, isError: editIsError, error: editError }] = useUpdatePatientMutation();

    const handleAddPatient = async (formData) => {
        setLoader(true);
        if (id) {
            // Update existing patient
            await updatePatient({ id, data: formData, patientCacheKey });
        } else {
            // Add new patient
            await addPatient({ data: formData, patientCacheKey });
        }
        setLoader(false);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    {id ? <Pencil /> : 'Add Patient'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Add Patient</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleAddPatient)}>
                    <div className="grid gap-4 py-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input name="name" {...register('name')} />
                            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                        </div>
                        <div>
                            <Label htmlFor="date_of_birth">Date of Birth</Label>
                            <Input type="date" name="date_of_birth" {...register('date_of_birth')} />
                            {errors.date_of_birth && <span className="text-red-600">{errors.date_of_birth.message}</span>}
                        </div>
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup {...field} value={field.value || ''} onValueChange={(value) => field.onChange(value)}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="male" id="r1" />
                                            <Label htmlFor="r1">Male</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="female" id="r2" />
                                            <Label htmlFor="r2">Female</Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            />
                            {errors.gender && <span className="text-red-600">{errors.gender.message}</span>}
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input name="address" {...register('address')} />
                            {errors.address && <span className="text-red-600">{errors.address.message}</span>}
                        </div>
                        <div>
                            <Label htmlFor="phone_number">Phone Number</Label>
                            <Input name="phone_number" {...register('phone_number')} />
                            {errors.phone_number && <span className="text-red-600">{errors.phone_number.message}</span>}
                        </div>
                        <div>
                            <Label htmlFor="medical_history">Medical History</Label>
                            <Textarea name="medical_history" {...register('medical_history')} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button loading={loader} type="submit">{id ? 'Update Patient' : 'Add Patient'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPatient;
