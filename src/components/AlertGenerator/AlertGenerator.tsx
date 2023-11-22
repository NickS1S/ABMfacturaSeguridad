import Alert from 'react-bootstrap/Alert';

type AlertGeneratorProps = {
    message: string;
};

const AlertGenerator = ({ message }: AlertGeneratorProps) => {

    return (
        <Alert variant="success" className='mt-2 w-25'>
            <Alert.Heading>Mensaje Recibido:</Alert.Heading>
            <p>
                {message}
            </p>
        </Alert>
    )
}

export default AlertGenerator;
