import Swal from "sweetalert2";

type ShowToastProps = {
  message: string;
  title?: string;
};

type ConfirmActionProps = {
  title: string;
  text?: string;
  btnConfirmText: string;
  onConfirm: () => Promise<void>;
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

export function showConfirmAction({
  btnConfirmText,
  onConfirm,
  title,
  text,
}: ConfirmActionProps) {
  Swal.fire({
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: btnConfirmText,
    cancelButtonColor: "#C81E1E",
    confirmButtonColor: "#1A56DB",
    title: title,
    html: text,
    reverseButtons: true,
  }).then(({ isConfirmed }) => {
    if (isConfirmed) {
      onConfirm();
    }
  });
}
