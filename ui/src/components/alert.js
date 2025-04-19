import Swal from 'sweetalert2'
export default function showAlert(message,alertType) {
        Swal.fire({
          text: message,
          icon: alertType,
          buttonsStyling: false,
          confirmButtonText: 'Ok, got it!',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        });
      }

