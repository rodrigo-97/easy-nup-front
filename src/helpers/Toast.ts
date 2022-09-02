import Swal from "sweetalert2"

type ShowErrorToastProps = {
    message: string
    title?: string
}

export function showErrorToast ({message, title}:ShowErrorToastProps){
    Swal.fire({
        title: title,
        text: message,
        icon: "error",
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        showCloseButton: true
      })
}