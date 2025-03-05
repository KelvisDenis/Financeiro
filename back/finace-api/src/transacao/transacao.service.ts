import { Injectable } from '@nestjs/common';
import { Transacao } from './interfaces/transacao.interface';
import { TransacaoCreateDTO } from './dtos/transacao.create.dto';
import { UsuariosService } from 'src/users/usuarios.service';

@Injectable()
export class TransacaoService {
    private transacoes: Transacao[] = []
    constructor(private readonly serviceUsuario: UsuariosService){}
 

    criarTransacao(dados: TransacaoCreateDTO):boolean{
        const novaTransacao = {
            id: this.transacoes.length + 1,
            ...dados,
          };
          const usuario_Existe = this.serviceUsuario.obterUsuarioPorId(novaTransacao.idUsuario) ? true : false;
          if(!usuario_Existe) return false
          this.transacoes.push(novaTransacao);
          return true;
    }
    listarTodasTransacoes(){
        return this.transacoes
    }
    listarTodasTransacoesporIdUsuario(id:number){
        return this.transacoes.filter((x) => x.idUsuario == id )
    }
    listarTransacoesporIdUsuario(id:number){
        return this.transacoes.find((x) => x.idUsuario == id )
    }

    atualizarTransacao(id: number, dadosAtualizados: Partial<Transacao>): boolean {
        const index = this.transacoes.findIndex((t) => t.id === id);

        if (index === -1) return false;

        this.transacoes[index] = {
            ...this.transacoes[index],
            ...dadosAtualizados, 
        };

        return true;
    }

    // Deletar uma transação por ID
    deletarTransacaoPorID(id: number) {
        const index = this.transacoes.findIndex((t) => t.id === id);

        if (index === -1) return false; 

        this.transacoes.splice(index, 1); 
        return true;
    }


}
