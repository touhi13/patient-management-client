import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/custom/button';
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAddPatientMutation } from '@/features/patient/patientApi';
import { useSelector } from 'react-redux';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const AddPatient = () => {
    const patientCacheKey = useSelector((state) => state.cacheKey.patient);
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        date_of_birth: '',
        gender: '',
        address: '',
        phone_number: '',
        medical_history: ''
    });

    const [addPatient, { isLoading, isError, error }] = useAddPatientMutation();

    const handleAddPatient = async () => {
        setLoader(true);
console.log(formData)
        // await addPatient({ data: formData, patientCacheKey });
        setLoader(false);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Patient</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]"> {/* Increase the max-width value to increase the size */}
                <DialogHeader>
                    <DialogTitle>Add Patient</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                        <Label htmlFor="date_of_birth">Date of Birth</Label>
                        <Input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })} />
                    </div>
                    <div>
                        <Label htmlFor="gender">Gender</Label>


                        <RadioGroup defaultValue="male" onChange={(value) => setFormData({ ...formData, gender: value })}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="r1" />
                                <Label htmlFor="r1">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="r2" />
                                <Label htmlFor="r2">Female</Label>
                            </div>
                        </RadioGroup>



                    </div>

                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input name="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    </div>
                    <div>
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input name="phone_number" value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} />
                    </div>
                    <div>
                        <Label htmlFor="medical_history">Medical History</Label>
                        <Textarea name="medical_history" value={formData.medical_history} onChange={(e) => setFormData({ ...formData, medical_history: e.target.value })} />
                    </div>
                </div>
                <DialogFooter>
                    <Button loading={loader} onClick={handleAddPatient}>Add Patient</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

export default AddPatient;
