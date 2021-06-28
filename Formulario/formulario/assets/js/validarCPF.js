class Validador {

    validarCpf(cpf) {
        if (!cpf) return false;
        
        const cpfLimpo = cpf.toString().replace(/\D+/g, '');
        if (cpfLimpo.length !== 11) return false;
        if (Validador.isSequence(cpfLimpo)) return false;

        const cpfOriginal = cpfLimpo;
        let novoCpf = cpfLimpo.slice(0, -2);

        novoCpf += Validador.digito(novoCpf, 1);
        novoCpf += Validador.digito(novoCpf, 2);
        
        return cpfOriginal === novoCpf;
    }

    static digito(cpf, dig) {
        if (dig !== 1 && dig !== 2) return;

        let sequencia = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        if (dig === 2) sequencia.unshift(11);

        const cpfLista = Array.from(cpf);

        const cpfMultiplicado = cpfLista.map((val, i) => val * sequencia[i]);
        const somaNumeros = cpfMultiplicado.reduce((ac, val) => ac += val, 0);

        let digito = 11 - (somaNumeros % 11);
        if (digito > 9) digito = 0;

        return digito;
    }

    static isSequence(cpf) {
        return cpf.charAt(0).repeat(11) === cpf;
    }
}
