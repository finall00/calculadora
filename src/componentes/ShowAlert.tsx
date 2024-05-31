import { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface AlertProps {
    message: string;
    onClose: () => void;
}

export default function AlertComponent({ message, onClose }: AlertProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (message) {
            setOpen(true);
        }
    }, [message]);

    const handleClose = () => {
        setOpen(false);
        onClose(); // Reset the message in the parent component
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button style={{ display: 'none' }}>Trigger</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Atenção !</AlertDialogTitle>
                    <AlertDialogDescription className='font-medium text-base'>{message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className='w-full' onClick={handleClose}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
