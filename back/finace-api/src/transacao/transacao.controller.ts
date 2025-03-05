import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoCreateDTO } from './dtos/transacao.create.dto';

@Controller('transacoes')
export class TransacaoController {
    constructor(private readonly transacaoService: TransacaoService) {}

    @Post()
    criarTransacao(@Body() dados: TransacaoCreateDTO) {
        const sucesso = this.transacaoService.criarTransacao(dados);
        if (!sucesso) {
            throw new BadRequestException('Usuário não encontrado.');
        }
        return { mensagem: 'Transação criada com sucesso!' };
    }

    @Get()
    listarTodasTransacoes() {
        return this.transacaoService.listarTodasTransacoes();
    }

    @Get('usuario/:id')
    listarTransacoesPorUsuario(@Param('id') id: string) {
        return this.transacaoService.listarTodasTransacoesporIdUsuario(Number(id));
    }
    @Get('usuario/:id')
    listarTransacaoPorUsuario(@Param('id') id: string) {
        return this.transacaoService.listarTransacoesporIdUsuario(Number(id));
    }

    @Put(':id')
    atualizarTransacao(@Param('id') id: string, @Body() dadosAtualizados: Partial<TransacaoCreateDTO>) {
        const sucesso = this.transacaoService.atualizarTransacao(Number(id), dadosAtualizados);
        if (!sucesso) {
            throw new NotFoundException('Transação não encontrada.');
        }
        return { mensagem: 'Transação atualizada com sucesso!' };
    }

    @Delete(':id')
    deletarTransacao(@Param('id') id: string) {
        const sucesso = this.transacaoService.deletarTransacaoPorID(Number(id));
        if (!sucesso) {
            throw new NotFoundException('Transação não encontrada.');
        }
        return { mensagem: 'Transação deletada com sucesso!' };
    }
}
