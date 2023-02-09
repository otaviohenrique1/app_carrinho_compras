import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CompraContext, valoresIniciaisUmProduto } from "../context/compra";
import { useContext } from "react";

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
    confirmButtonColor: "blue",
    cancelButtonText: 'Não',
    cancelButtonColor: "red",
  });
}

export interface ModalQuantidadeProps extends ModalAvisoProps {
  id: number;
}

export function ModalQuantidade(props: ModalQuantidadeProps) {
  const SwalModal = withReactContent(Swal);
  const { titulo, mensagem } = props;
  const { state } = useContext(CompraContext);

  return SwalModal.fire({
    icon: "question",
    title: <p>{titulo}</p>,
    html: <p>{mensagem}</p>,
    input: "number",
    inputAttributes: {
      min: "1",
    },
    preConfirm: (value: number) => {
      if (!value) {
        Swal.showValidationMessage("Campo vazio");
      }
      
      let buscaItem = state.find((itemBusca) => itemBusca.quantidade === props.id);
      let validaBuscaItem = (typeof buscaItem === "undefined") ? valoresIniciaisUmProduto : buscaItem;
      
      if (value > validaBuscaItem.quantidade) {
        Swal.showValidationMessage("Valor invalido");
      }
    },
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    confirmButtonColor: "blue",
    cancelButtonText: 'Cancelar',
    cancelButtonColor: "red",
  });
}
