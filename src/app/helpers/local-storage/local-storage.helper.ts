import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHelper {
  
  constructor() {
    // Auto executa a limpeza
    this.localStorageExpires();
  }
  
  localStorageExpires() {
    
    // Itens para serem removidos
    const toRemove = [];
    
    // Data atual em milissegundos
    const currentDate = new Date().getTime();
    
    for (let i = 0, j = localStorage.length; i < j; i++) {
      
      const key = <string>localStorage.key(i);
      const value = localStorage.getItem(key);
      
      // Verifica se o formato do item para evitar conflitar com outras aplicações
      if (value && value[0] === '{' && value.slice(-1) === '}') {
        
        // Decodifica de volta para JSON
        const current = JSON.parse(value);
        
        // Checa a chave expires do item especifico se for mais antigo que a data atual ele salva no array
        if (current.expires && current.expires <= currentDate) {
          toRemove.push(<never>key);
        }
      }
    }
    
    // Remove itens que já passaram do tempo
    // Se remover no primeiro loop isto poderia afetar a ordem,
    // pois quando se remove um item geralmente o objeto ou array são reordenados
    for (let i = toRemove.length - 1; i >= 0; i--) {
      localStorage.removeItem(toRemove[i]);
    }
  }
  
  /**
   * Função para adicionar itens no localStorage
   */
  setLocalStorage(chave, valor, minutos) {
    const expirarem = new Date().getTime() + (60000 * minutos);
    
    localStorage.setItem(chave, JSON.stringify({
      'value': valor,
      'expires': expirarem
    }));
  }
  
  /**
   * Função para obter itens do localStorage que ainda não expiraram
   */
  getLocalStorage(chave) {
    
    this.localStorageExpires(); // Limpa itens
    
    const value = localStorage.getItem(chave);
    
    if (value && value[0] === '{' && value.slice(-1) === '}') {
      
      // Decodifica de volta para JSON
      const current = JSON.parse(value);
      
      return current.value;
    }
  }
  
}
