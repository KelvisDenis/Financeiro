import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './users/usuarios.module';
import { TransacaoModule } from './transacao/transacao.module';
import { ReceitaModule } from './receita/receita.module';
import { DespesasModule } from './despesas/despesas.module';

@Module({
  imports: [UsuariosModule, TransacaoModule, ReceitaModule, DespesasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
