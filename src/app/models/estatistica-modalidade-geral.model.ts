import { EstatisticaModalidadeUnica } from "./estatistica-modalidade-unica.model";

export class EstatisticaModalidadeGeral {
    totalModalidadesEsportivasInscritas: number = 0;
    totalMetasEsportivasInscritas: number = 0;
    totalConquistasAlcancadas: number = 0;
    totalCampeonatosCriados: number = 0;
    totalCampeonatosParticipados: number = 0;
    listaEstatisticaPorModalidadeEsportivaDto: EstatisticaModalidadeUnica[] = [];
}
