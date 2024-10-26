import { useEffect } from "react";
import ReactPortal from "../ReactPortal";

interface selectPlayerProps {
    children: React.ReactNode
    isOpen: boolean
    handleCancel: () => void
    handleConfirm: () => void
}

export default function SelectPlayer({children, isOpen, handleCancel, handleConfirm}: selectPlayerProps){
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return (): void => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if(!isOpen) return null
    return(
        <ReactPortal wrapperId="react-portal-modal-container">
            <>
                <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50"/>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-950 p-3 w-3/4 h-3/4 rounded-xl">
                    <div className="mb-3">{children}</div>
                    <div className="space-x-2 justify-end flex">
                        <button onClick={handleCancel} className="w-20 bg-red-600 rounded p-1">Cancel</button>
                        <button onClick={handleConfirm} className="w-20 bg-green-600 rounded p-1">Confirm</button>
                    </div>
                </div>
            </>
        </ReactPortal>
    )
}