import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ListaItem } from './ListaItem';
import styled from 'styled-components';

const SwalModal = withReactContent(Swal);

export interface ModalAvisoProps {
  titulo: string;
  mensagem: string;
}

export function ModalAviso(props: ModalAvisoProps) {
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
  preConfirm: (inputValue: any) => void;
}

export function ModalQuantidade(props: ModalQuantidadeProps) {
  const { titulo, mensagem, preConfirm } = props;

  return SwalModal.fire({
    icon: "question",
    title: <p>{titulo}</p>,
    html: <p>{mensagem}</p>,
    input: "number",
    inputAttributes: {
      min: "1",
    },
    preConfirm: preConfirm,
    showCancelButton: true,
    confirmButtonText: 'Salvar',
    confirmButtonColor: "blue",
    cancelButtonText: 'Cancelar',
    cancelButtonColor: "red",
  });
}

export interface ModalFinalizarCompraProps {
  valorTotalCompra: string;
  metodoPagamento: string;
}

export function ModalFinalizarCompra(props: ModalFinalizarCompraProps) {
  const { valorTotalCompra, metodoPagamento } = props;

  return SwalModal.fire({
    icon: "success",
    title: <Titulo>Agradeçemos a compra</Titulo>,
    html: <div>
      <ListaItem
        label="Valor total:"
        data={valorTotalCompra}
        fontSize="15px"
      />
      <ListaItem
        label="Metodo de pagamento:"
        data={metodoPagamento}
        fontSize="15px"
      />
    </div>,
    confirmButtonText: 'Voltar ao inicio',
    confirmButtonColor: "blue",
  });
}

const Titulo = styled.h1`
  font-weight: bold;
  font-size: 25px;
  text-align: center;
`;
