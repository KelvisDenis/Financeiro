import { Controller, Get, Post, Body, Param, BadRequestException } from '@nestjs/common';
import { UsuariosService } from '../users/usuarios.service';
import { CriarUsuarioDto } from '../users/dtos/criar-usuario.dto';
import { LoginUsuarioDto } from './dtos/login-usuario.dto';
import { LoggedUsuarioDto } from './dtos/logged-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  listarUsuarios() {
    return this.usuariosService.listarUsuarios();
  }

  @Post()
  criarUsuario(@Body() dados: CriarUsuarioDto) {
    return this.usuariosService.criarUsuario(dados);
  }

  @Get(':id')
  obterUsuario(@Param('id') id: string) {
    return this.usuariosService.obterUsuarioPorId(Number(id));
  }
  @Get(':email')
  obterUsuarioporEmail(@Param('email') email: string) {
    return this.usuariosService.obterUsuarioPorEmail(String(email));
  }
  @Post("login")
  loginUsuario(@Body() dados: LoginUsuarioDto) {
    const usuario = this.usuariosService.obterUsuarioPorEmail(dados.email);
    if (!usuario || usuario.senha !== dados.senha) {
      throw new BadRequestException('E-mail ou senha inválidos'); // ✅ Lançando erro corretamente
    }

    const res: LoggedUsuarioDto = {
      name: usuario.nome,
      token: 'dsafdasfds$sfygbdvsano',
    };

    return res;
  
  }
}
