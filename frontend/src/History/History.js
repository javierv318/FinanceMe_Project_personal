import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext();
    const history = transactionHistory();

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const { _id, title, amount, type } = item;
                const amountValue = Math.abs(amount).toFixed(2); // Valor absoluto del monto con 2 decimales
                const sign = type === 'income' ? '+' : '-'; // Signo '-' para gastos (expense) y '+' para ingresos (income)
                const color = type === 'income' ? 'green' : 'red'; // Color rojo para gastos y verde para ingresos
                
                return (
                    <div key={_id} className="history-item">
                        <p style={{ color }}>{title}</p>
                        <p style={{ color }}>{`${sign}${amountValue}`}</p>
                    </div>
                );
            })}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History