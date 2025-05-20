export type Cupcake = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  disponibilidade: boolean;
  ingredientes: string;
  peso: number;
  dimensoes: string;
  informacoes_nutricionais: string;
  imagem: string;
};

export type CartItem = {
  cupcake: Cupcake;
  quantidade: number;
  observacoes: string;
};

export type ItemResumoPedido = {
  nome: string;
  quantidade: number;
  valor_unitario: number;
  subtotal: number;
};

export type ResumoPedido = {
  telefone: string;
  endereco: string;
  itens: ItemResumoPedido[];
  valor_total: number;
  valor_pago: number;
};

export type PedidoStatus = {
  status: string;
  data_status: string;
};