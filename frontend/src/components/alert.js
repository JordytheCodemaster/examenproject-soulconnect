import { forwardRef, useImperativeHandle } from "react";
import Swal from "sweetalert2";

const Alert = forwardRef((props, ref) => {
    const showToast = (title) => {
        Swal.fire({
            title: title,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
        });
    };

    useImperativeHandle(ref, () => ({
        showToast,
    }));

    return null;
});

export default Alert;
