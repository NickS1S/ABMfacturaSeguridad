type EstadoFactura = 'EMITIDA' | 'ANULADA';
type FormaPago = 'EFECTIVO' | 'MERCADO_PAGO';

export interface Factura {
    id: number;
    fechaFacturacion: string;
    formaPago: FormaPago;
    totalVenta: number;
    estadoFactura: EstadoFactura;
}