import { create } from 'zustand';

const defaultFrom = "USD";
const defaultTo = "RWF";
const validResultType = ['Convert', 'Charts'];

function setResultType(state, newResultType) {
    if (validResultType.includes(newResultType)) {
        return { resultType: newResultType };
    }
    return { resultType: state.resultType };
}

function setAmount(state, val) {
    const amount = parseFloat(val);
    if (!Number.isNaN(amount) && Number.isFinite(amount) && amount > 0) {
        return { amount: val }
    }
    return { amount: state.amount };
}

export const useGlobalStore = create((set) => ({
    convertFrom: defaultFrom,
    convertTo: defaultTo,
    amount: 1,
    resultType: 'Convert',
    result: {},
    setAmount: val => set((state) => (setAmount(state, val))),
    setResultType: (newResultType) => set((state) => setResultType(state, newResultType)),
    setConvertFrom: (val) => set(() => ({ convertFrom: val })),
    setConvertTo: (val) => set(() => ({ convertTo: val })),
}));
