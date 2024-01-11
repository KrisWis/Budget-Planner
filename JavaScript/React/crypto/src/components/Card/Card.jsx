import { WithRuBalance } from "../../helpers/hoc/withRuBalance";
import "./styles.css";

const Card = ({ balance, setBalance }) => {
    return (
        <div className="card">
            <div className="card-block">
                <p>CRYPTO-FINANCE</p>
                <button
                    onMouseEnter={() => console.log("---enter")}
                    onClick={setBalance}
                >
                    Add money
                </button>
            </div>

            <div className="card-block">
                <p>RUSLAN</p>
                <p>{balance} $</p>
            </div>
        </div>
    );
};

export default WithRuBalance(Card);