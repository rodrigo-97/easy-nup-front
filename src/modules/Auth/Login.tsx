import { Button, FormGroup, Input, Label } from 'reactstrap';
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import bottom from '../../assets/bg.svg'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

export function LoginPage() {

  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <div className='d-flex justify-content-center align-items-center login-bg' style={{ height: "100vh" }}>
      {theme === "light" && <img src={bottom} className="position-absolute bottom-0" style={{ zIndex: 10, width: '100%' }} />}
      <div className='d-sm-block d-md-flex justify-content-between position-absolute top-0 w-100 px-3 px-sm-2 px-md-5 py-3'>
        EasyNup
        <div className='d-flex justify-content-between gap-3 align-items-center'>
          Não possui uma conta?
          <Button color='secondary' size="sm" className='shadow'>Criar conta</Button>
        </div>
      </div>
      <div className='login-container border-gray-400 shadow bg-white rounded p-4 mx-3'>
        <p className='h3 text-center mb-4'>Login</p>
        <FormGroup>
          <Label>
            Email
          </Label>
          <Input
            placeholder="Insira seu e-mail"
            type="email"
            bsSize='sm'
          />
        </FormGroup>
        <FormGroup>
          <Label>
            Senha
          </Label>
          <Input
            placeholder="Insira sua senha"
            type="password"
            bsSize='sm'
          />
          <p className='link text-end text-primary-700 mt-2'>Esqueci minha senha</p>
        </FormGroup>


        <div className='d-grid'>
          <Button color='primary-700' className='text-white' size='sm' onClick={() => navigate("/hp")}>
            Entrar
          </Button>
        </div>

        <hr className='mx-4' />

        <div className="d-flex justify-content-center gap-3 mt-3">
          <Button className='shadow border-white' outline>
            <FaFacebook color='#4267B2' />
          </Button>
          <Button className='shadow border-white' outline>
            <FcGoogle />
          </Button>
        </div>
      </div>
    </div>
  )
}