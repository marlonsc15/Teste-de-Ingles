import { Frase } from './../shared/frase.model';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';

import { FRASES } from './frase-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public instrucao: string = 'Traduza a frase: '
  public frases: Frase[] = FRASES
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase!: Frase; 

  public progresso: number = 0 

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()
  
  constructor() { 
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {   
  }

  public atualizarResposta(resposta: Event): void {
    this.resposta =  (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {
    
    if(this.rodadaFrase.frasePtBr == this.resposta) {
    
    //troca de rodada
    this.rodada++

    //progresso
    this.progresso = this.progresso + (100 / this.frases.length)

    if(this.rodada === 4) {
      this.encerrarJogo.emit('Vitoria')
    }

    //atualiza o objeto rodadaFrase
    this.atualizaRodada()

    }else {
      //diminuir a variavel tentativas
      this.tentativas--

      if(this.tentativas === -1) {
        this.encerrarJogo.emit('Derrota')
      }
    }
  }

  public atualizaRodada(): void {

    //define a frase da rodada com base em alguma lógica
    this.rodadaFrase = this.frases[this.rodada]

    //limpar resposta
    this.resposta = ''
  }
}
