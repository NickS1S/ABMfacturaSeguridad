import { useEffect, useState } from "react"
import { Factura } from "../../types/Factura"
import { FacturaService } from "../../services/FacturaService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from '../../types/ModalTypes';
import FacturaModal from "../FacturaModal/FacturaModal";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";



const FacturaTable = () => {

    const [facturas, setFacturas] = useState<Factura[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {

        const fetchFacturas = async () => {
            const facturas = await FacturaService.getFacturas();
            setFacturas(facturas);
            setIsLoading(false);
        };

        fetchFacturas();
    }, [refreshData]);

    console.log(JSON.stringify(facturas, null, 2));

    const initializableNewFactura = (): Factura => {
        return {
            id: 0,
            fechaFacturacion: "",
            formaPago: "EFECTIVO",
            totalVenta: 0,
            estadoFactura: "EMITIDA",

        };
    };
    const [factura, setFactura] = useState<Factura>(initializableNewFactura);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");


    const handleClick = (newTitle: string, fact: Factura, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal);
        setFactura(fact);
        setShowModal(true);
    };

    return (
        <>
            <Button onClick={() => handleClick("Nueva Factura", initializableNewFactura(),
                ModalType.CREATE)}> Nueva factura </Button>
            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Forma de pago</th>
                            <th>Total venta</th>
                            <th>Estado</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facturas.map(factura => (
                            <tr key={factura.id}>
                                <td>{factura.fechaFacturacion}</td>
                                <td>{factura.formaPago}</td>
                                <td>{factura.totalVenta}</td>
                                <td>{factura.estadoFactura}</td>

                                <td><EditButton onClick={() => handleClick("Editar Factura", factura, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Borrar Factura", factura, ModalType.DELETE)} /></td>


                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {showModal && (
                <FacturaModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    fact={factura}
                    refreshData={setRefreshData}
                />
            )}

        </>
    )
}

export default FacturaTable