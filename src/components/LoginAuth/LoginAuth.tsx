import React, { useState } from 'react';
import LoginRequest from '../../types/LoginRequest';
import { AuthService } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

const LoginAuth: React.FC = () => {

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginRequest>({
    username: '',
    password: ''
  });

  const handleLogin = async () => {
    try {
      // Llamar al servicio de autenticación
      const token = await AuthService.login(loginData);
      // Almacenar el token en localStorage
      localStorage.setItem('token', token);
      console.log('Inicio de sesión exitoso. Token:', token);
      // Puedes redirigir a otra página aquí si es necesario
      window.localStorage.setItem('isLoggedIn', 'true');
      navigate('/homepage');

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Puedes manejar el error y mostrar un mensaje al usuario si es necesario
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        wrapperClass='mb-4'
        label='Email address'
        id='form1'
        type='email'
        value={loginData.username}
        onChange={(e) =>
          setLoginData({ ...loginData, username: e.target.value })
        }
      />
      <MDBInput
        wrapperClass='mb-4'
        label='Password'
        id='form2'
        type='password'
        value={loginData.password}
        onChange={(e) =>
          setLoginData({ ...loginData, password: e.target.value })
        }
      />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="mb-4" onClick={handleLogin}>
        Sign in
      </MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <a href="#!">Register</a>
        </p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
};

export default LoginAuth;
