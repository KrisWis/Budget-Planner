import React from "react"
import { Add_Expense, Expenses, Header } from "../../../widgets"


export const Main: React.FC = (): React.JSX.Element => {
    return (
        <>
            <Header />
            <Expenses />
            <Add_Expense />
        </>
    )
}
