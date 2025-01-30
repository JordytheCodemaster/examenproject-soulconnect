import React, { forwardRef, useImperativeHandle } from "react";
import Swal from "sweetalert2";

const Popup = forwardRef((props, ref) => {
    const showToast = (title) => {
        Swal.fire({
            title: title,
            showConfirmButton: false,
            timer: 2000,
        });
    };

    useImperativeHandle(ref, () => ({
        showToast,
    }));

    return null;
});

export default Popup;
