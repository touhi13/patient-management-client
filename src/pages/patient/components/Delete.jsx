import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Minus } from './Icons';
import { useDeletePatientMutation } from "@/features/patient/patientApi";
import { useSelector } from "react-redux";

const Delete = ({ id }) => {
    const patientCacheKey = useSelector((state) => state.cacheKey.patient);
    const [deletePatient, { isLoading, isError, error }] = useDeletePatientMutation();

    const handleDelete = async () => {
        try {
            await deletePatient({ id, patientCacheKey }).unwrap();
            // Optionally, you can handle post-delete actions here, e.g., showing a notification or refreshing the list
        } catch (err) {
            console.error("Failed to delete the patient:", err);
            // Optionally, handle error, e.g., show an error notification
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline"><Minus /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} loading={isLoading}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Delete;
