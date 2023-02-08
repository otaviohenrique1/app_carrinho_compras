import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export interface ModalAvisoProps {
  titulo: string;
  mensagem: string;
}

export function ModalAviso(props: ModalAvisoProps) {
  const SwalModal = withReactContent(Swal);
  const { titulo, mensagem } = props;

  return SwalModal.fire({
    icon: "warning",
    title: <p>{titulo}</p>,
    html: <p>{mensagem}</p>,
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não',
    confirmButtonColor: "blue",
    cancelButtonColor: "red"
  });
}