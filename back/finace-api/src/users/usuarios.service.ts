import { Injectable } from '@nestjs/common';
import { CriarUsuarioDto } from '../users/dtos/criar-usuario.dto';
import { Usuario } from './interfaces/user.interface';

@Injectable()
export class UsuariosService {
    private usuarios: Usuario[] = [{
        "id": 0,
        "nome": "admin",
        "email": "admin@gmail.com",
        "senha": "admin123",
    }] ;

  listarUsuarios() {
    return this.usuarios;
  }

  criarUsuario(dados: CriarUsuarioDto) {
    const novoUsuario = {
      id: this.usuarios.length + 1,
      ...dados,
    };
    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }

  obterUsuarioPorId(id: number) {
    return this.usuarios.find((user) => user.id === id);
  }
  obterUsuarioPorEmail(email: string) {
    return this.usuarios.find((user) => user.email === email);
  }
}
