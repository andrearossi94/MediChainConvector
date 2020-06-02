

export default class CartellaClinica {


    constructor(id, pazienteID, dottoreID, patologia, stato, consenso){

        this.id = id;
        this.pazienteID = pazienteID;
        this.dottoreID = dottoreID;
        this.patologia = patologia; 
        this.stato = stato;
        this.consenso = consenso;
    }


}