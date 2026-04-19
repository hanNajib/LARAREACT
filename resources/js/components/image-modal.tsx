import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { __ } from "@/lib/helpers";

interface ImageModalProps {
    image: string | null;
    onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
    return (
        <Dialog open={!!image} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{__("Image Preview")}</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center p-2">
                    {image && (
                        <img 
                            src={image} 
                            alt="Preview" 
                            className="max-h-[70vh] w-auto rounded-lg shadow-sm object-contain" 
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}