
export function formatPriceMXN(num: number) {
    if (typeof num !== 'number') return 'Error: número inválido';
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(num);
}