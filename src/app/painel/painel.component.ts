import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Frase } from '../shared/frase.model'
import { FrasesMock } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FrasesMock
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''
  public rodada: number = 0
  public rodadaFrase: Frase
  public progresso: number = 0
  public tentativas: number = 3
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event) {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta() {
    if (this.rodadaFrase.frasetPtBr == this.resposta) {

      // alert('Tradução está Correta!')

      this.rodada++

      if(this.rodada == 4){
        this.encerrarJogo.emit('vitoria')
        // alert('Parabéns, você ganhou!')
      }

      this.atualizaRodada()

      this.progresso += (100 / this.frases.length)

    } else {

      // alert('Tradução está Errada!')

      this.tentativas--

      if(this.tentativas == -1){
        this.encerrarJogo.emit('derrota')
        // alert ('Você perdeu todas as tentativas!')
      }
    }
  }

  public atualizaRodada(){
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }

}
