import Swal from "sweetalert2";

type ShowToastProps = {
  message: string;
  title?: string;
};

export function showErrorToast({ message, title }: ShowToastProps) {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
    position: "top-end",
    toast: true,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    showCloseButton: true,
  });
}

export function showSuccessToast({ message, title }: ShowToastProps) {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    position: "top-end",
    toast: true,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    showCloseButton: true,
  });
}

export function showInfoToast({ message, title }: ShowToastProps) {
  Swal.fire({
    title: title,
    text: message,
    icon: "info",
    position: "top-end",
    toast: true,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    showCloseButton: true,
  });
}
