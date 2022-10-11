import { Frase } from './../shared/frase.model';
import { Component, OnInit } from '@angular/core';

import { FRASES } from './frase-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public instrucao: string = 'Traduza a frase: '
  public frases: Frase[] = FRASES
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase 

  public progresso: number = 0 

  constructor() { 
    this.rodadaFrase = this.frases[this.rodada]
    console.log(this.rodadaFrase)
  }

  ngOnInit(): void {
  }

  public atualizarResposta(resposta: Event): void {
    this.resposta =  (<HTMLInputElement>resposta.target).value
    //console.log(this.resposta);
    
  }

  public verificarResposta(): void {

    if(this.rodadaFrase.frasePtBr == this.resposta) {
      alert('tradução correta')
    
    //troca de rodada
    this.rodada++

    //progresso
    this.progresso = this.progresso + (100 / this.frases.length)
    console.log(this.progresso)
    

    //atualiza o objeto rodadaFrase
    this.rodadaFrase = this.frases[this.rodada]


    }else {
      alert('tradução errada')
    }
  }
}
