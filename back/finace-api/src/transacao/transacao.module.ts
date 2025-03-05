import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { UsuariosService } from 'src/users/usuarios.service';

@Module({
  controllers: [TransacaoController],
  providers: [TransacaoService, UsuariosService]
})
export class TransacaoModule {}
