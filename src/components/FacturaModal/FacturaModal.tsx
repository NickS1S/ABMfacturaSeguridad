import { Factura } from "../../types/Factura";
import { Button, Form, FormLabel, Modal } from 'react-bootstrap';
import { ModalType } from "../../types/ModalTypes";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { FacturaService } from '../../services/FacturaService';
import { toast } from 'react-toastify';

type FacturaModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    fact: Factura;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}



const FacturaModal = ({ show, onHide, title, modalType, fact, refreshData }: FacturaModalProps) => {

    //CREATE-UPDATE
    const handleSaveUpdate = async (fac: Factura) => {
        try {
            const isNew = fac.id === 0;
            if (isNew) {
                await FacturaService.createFactura(fac);
            } else {
                await FacturaService.updateFactura(fac.id, fac);
            }
            toast.success(isNew ? "Factura creada" : "Factura actualizada", {
                position: "top-center",
            });

            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error")
        }
    };

    //DELETE
    const handleDelete = async () => {
        try {
            await FacturaService.deleteFactura(fact.id);
            toast.success("Factura borrada", {
                position: "top-center",
            });

            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error("Ha ocurrido un error")
        }
    }

    //Yup, esquema de validacion
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            fechaFacturacion: Yup.string().required('La fecha de facturacion es requerida'),
            formaPago: Yup.string().oneOf(['EFECTIVO', 'MERCADO_PAGO'], 'Forma de pago no válida').required('La forma de pago es requerida'),
            totalVenta: Yup.number().min(1).required('El total de ventas es requerida'),
            estadoFactura: Yup.string().oneOf(['EMITIDA', 'ANULADA'], 'Estado de factura no válido').required('El estado de la factura es requerido'),
        });
    };

    //Formik,usa el esquema de validacion para crear un formulario dinamico y que lo bloquee
    //en caso de haber errores
    const formik = useFormik({
        initialValues: fact,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Factura) => handleSaveUpdate(obj),
    });

    return (
        <>
            {modalType === ModalType.DELETE ? (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static">

                        <Modal.Header closeButton>
                            <Modal.Title> {title} </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>¿Está seguro que desea eliminar la factura <br />
                                <strong> {fact.fechaFacturacion} </strong>?</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                            <Button variant="danger" onClick={handleDelete}> Eliminar </Button>
                        </Modal.Footer>

                    </Modal>
                </>
            ) : (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                        <Modal.Header>
                            <Modal.Title> {title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Group controlId='formTitulo'>
                                    <FormLabel> Fecha </FormLabel>
                                    <Form.Control
                                        name="fechaFacturacion"
                                        type="text"
                                        value={formik.values.fechaFacturacion || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.fechaFacturacion && formik.touched.fechaFacturacion)}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {formik.errors.fechaFacturacion}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* FormaPago */}
                                <Form.Group controlId='formaPagoform'>
                                    <FormLabel> Forma De Pago </FormLabel>
                                    <Form.Control
                                        name="formaPago"
                                        type="text"
                                        value={formik.values.formaPago || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.formaPago && formik.touched.formaPago)}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {formik.errors.formaPago}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* totalVenta */}
                                <Form.Group controlId='totalVentaForm'>
                                    <FormLabel> Total De Ventas </FormLabel>
                                    <Form.Control
                                        name="totalVenta"
                                        type="number"
                                        value={formik.values.totalVenta || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.totalVenta && formik.touched.totalVenta)}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {formik.errors.totalVenta}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* EstadoFactura */}
                                <Form.Group controlId='estadoFacturaForm'>
                                    <FormLabel> Estado </FormLabel>
                                    <Form.Control
                                        name="estadoFactura"
                                        type="text"
                                        value={formik.values.estadoFactura || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.estadoFactura && formik.touched.estadoFactura)}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {formik.errors.estadoFactura}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Modal.Footer className="mt-4">
                                    <Button variant="secondary" onClick={onHide}> Cancelar </Button>
                                    <Button variant="primary" type="submit" disabled={!formik.isValid}> Guardar </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    )
}

export default FacturaModal